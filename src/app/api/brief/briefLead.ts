/**
 * Разбор и проверка брифа «Обсудим ваш проект» (BriefForm дизайн-системы) и
 * сборка заявки для amoCRM. Тексты заявки — по-русски: их читает менеджер в CRM.
 */

import { ACTIVE_SERVICE_IDS } from '@/entities/service';
import { LEGAL } from '@/shared/config/legal';

export const BRIEF_SERVICES = ['crm', 'sites', 'smm', 'ai'] as const;
const TEAM_SIZES = ['1-5', '6-20', '20+'] as const;
const BUDGETS = ['lt100', '100-300', 'gt300', 'unknown'] as const;

const MAX_NAME = 100;
const MAX_CONTACT = 100;
const MAX_COMPANY = 200;
const MAX_TASK = 2000;

/** Антиспам: минимальная пауза «открыл бриф → отправил» и потолок ссылок в задаче. */
const MIN_ELAPSED_MS = 3000;
const MAX_LINKS = 5;
const LINK_PATTERN = /https?:\/\//gi;

/** Телефон — не меньше 10 цифр; иначе это ник или ссылка в Telegram. */
const PHONE_DIGITS = 10;

const SERVICE_LABELS: Record<(typeof BRIEF_SERVICES)[number], string> = {
  crm: 'CRM',
  sites: 'Сайт',
  smm: 'SMM',
  ai: 'ИИ-автоматизации',
};

const BUDGET_LABELS: Record<(typeof BUDGETS)[number], string> = {
  lt100: 'до 100 тыс. ₽',
  '100-300': '100–300 тыс. ₽',
  gt300: '300 тыс. ₽ и больше',
  unknown: 'пока не знает',
};

export interface BriefPayload {
  services: string[];
  company: string;
  teamSize: string | null;
  task: string;
  budget: string | null;
  name: string;
  contact: string;
  telegram: boolean;
  /** Отметка чекбокса согласия на обработку ПД — без неё заявку не принимаем. */
  consent?: unknown;
  /** Время от открытия брифа до отправки, мс. */
  elapsedMs?: unknown;
  /** Идентификатор отправки из браузера — один на все повторы одной заявки. */
  requestId?: unknown;
  /** Источник визита: UTM, первая страница, домен реферера (без ПД). */
  attribution?: unknown;
}

export interface BriefLead {
  name: string;
  phone: string;
  telegram: string;
  task: string;
}

const isOneOf = <T extends string>(list: readonly T[], value: unknown): value is T => {
  return typeof value === 'string' && (list as readonly string[]).includes(value);
};

/** Тело запроса похоже на бриф: типы полей совпадают. Содержимое проверяет `isValidBrief`. */
export const isBriefPayload = (value: unknown): value is BriefPayload => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const v = value as Record<string, unknown>;
  const isNullableString = (field: unknown) => field === null || typeof field === 'string';

  return (
    Array.isArray(v.services) &&
    v.services.every((item) => typeof item === 'string') &&
    typeof v.company === 'string' &&
    isNullableString(v.teamSize) &&
    typeof v.task === 'string' &&
    isNullableString(v.budget) &&
    typeof v.name === 'string' &&
    typeof v.contact === 'string' &&
    typeof v.telegram === 'boolean'
  );
};

const countDigits = (value: string): number => {
  return value.replace(/\D/g, '').length;
};

/** Та же проверка, что в BriefForm: телефон от 10 цифр или ник (@nick, t.me/nick, nick). */
const isContact = (raw: string): boolean => {
  const value = raw.trim();

  if (/^(@|https?:\/\/t\.me\/|t\.me\/)/i.test(value)) {
    return /[A-Za-z0-9_]{4,}$/.test(value);
  }

  if (/^[+\d\s()-]+$/.test(value)) {
    return countDigits(value) >= PHONE_DIGITS;
  }

  return /^[A-Za-z][A-Za-z0-9_]{4,31}$/.test(value);
};

export const isValidBrief = (brief: BriefPayload): boolean => {
  const contact = brief.contact.trim();

  return (
    brief.consent === true &&
    brief.services.length > 0 &&
    brief.services.length <= BRIEF_SERVICES.length &&
    new Set(brief.services).size === brief.services.length &&
    // В брифе только работающие направления: «Скоро» не принимаем и с подделанным запросом.
    brief.services.every((service) => isOneOf(ACTIVE_SERVICE_IDS, service)) &&
    (brief.teamSize === null || isOneOf(TEAM_SIZES, brief.teamSize)) &&
    (brief.budget === null || isOneOf(BUDGETS, brief.budget)) &&
    !!brief.name.trim() &&
    brief.name.length <= MAX_NAME &&
    brief.company.length <= MAX_COMPANY &&
    brief.task.length <= MAX_TASK &&
    contact.length <= MAX_CONTACT &&
    isContact(contact)
  );
};

/** Похоже на бота: нет отметки времени (форма её всегда присылает), мгновенная отправка или ссылочный флуд. */
export const isSpamBrief = ({ elapsedMs, task }: BriefPayload): boolean => {
  if (typeof elapsedMs !== 'number' || !Number.isFinite(elapsedMs) || elapsedMs < MIN_ELAPSED_MS) {
    return true;
  }

  return (task.match(LINK_PATTERN) ?? []).length > MAX_LINKS;
};

/**
 * Поля заявки amoCRM. В форме заявки два поля связи — телефон и Telegram:
 * контакт всегда уходит в «телефон» (поле обязательное), а в Telegram — если это
 * ник или клиент отметил «Удобнее в Telegram». Остальное собирается в примечание.
 */
const ATTRIBUTION_LABELS: Record<string, string> = {
  utm_source: 'источник',
  utm_medium: 'канал',
  utm_campaign: 'кампания',
  utm_content: 'объявление',
  utm_term: 'ключ',
  landing: 'первая страница',
  referrer: 'пришёл с',
};

/** «Откуда: источник yandex, канал cpc, первая страница /services/sites» — только известные поля. */
export const formatAttribution = (raw: unknown): string => {
  if (!raw || typeof raw !== 'object') return '';

  const parts = Object.entries(ATTRIBUTION_LABELS)
    .map(([key, label]) => {
      const value = (raw as Record<string, unknown>)[key];
      return typeof value === 'string' && value.trim()
        ? `${label} ${value
            .trim()
            .slice(0, 120)
            .replace(/[\r\n]+/g, ' ')}`
        : '';
    })
    .filter(Boolean);

  return parts.length ? `Откуда: ${parts.join(', ')}` : '';
};

export const buildBriefLead = (brief: BriefPayload): BriefLead => {
  const contact = brief.contact.trim();
  const prefersTelegram = brief.telegram || countDigits(contact) < PHONE_DIGITS;

  const lines = [
    `Направления: ${brief.services
      .filter((service) => isOneOf(BRIEF_SERVICES, service))
      .map((service) => SERVICE_LABELS[service as (typeof BRIEF_SERVICES)[number]])
      .join(', ')}`,
    brief.company.trim() && `Компания: ${brief.company.trim()}`,
    brief.teamSize && `Человек в продажах: ${brief.teamSize}`,
    isOneOf(BUDGETS, brief.budget) && `Бюджет: ${BUDGET_LABELS[brief.budget]}`,
    brief.task.trim() && `Задача: ${brief.task.trim()}`,
    `Удобный канал: ${prefersTelegram ? 'Telegram' : 'звонок'}`,
    formatAttribution(brief.attribution),
    // Доказательство согласия: какую редакцию текста человек принял (152-ФЗ ст. 9 ч. 3).
    `Согласие на обработку ПД: дано, редакция ${LEGAL.consentVersion} от ${LEGAL.edition.ru}`,
  ];

  return {
    name: brief.name.trim(),
    phone: contact,
    telegram: prefersTelegram ? contact : '',
    task: lines.filter(Boolean).join('\n'),
  };
};

/** Идентификатор отправки из браузера, если он корректный. */
export const getRequestId = ({ requestId }: BriefPayload): string | undefined => {
  return typeof requestId === 'string' && /^[A-Za-z0-9_-]{8,40}$/.test(requestId)
    ? requestId
    : undefined;
};
