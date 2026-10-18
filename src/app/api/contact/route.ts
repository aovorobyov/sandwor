import { NextRequest, NextResponse } from 'next/server';
import { sendAmoContactLead } from '@/shared/api/amoForm';
import { SITE_URL } from '@/shared/config/site';

/** Ограничения длины полей — отсекаем мусор и слишком большие запросы. */
const MAX_NAME = 100;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 4000;

/** Антиспам: минимальная пауза «загрузка → отправка» и потолок ссылок в сообщении. */
const MIN_ELAPSED_MS = 2000;
const MAX_LINKS = 5;

/** Фолбэк для метки происхождения в amoCRM, если браузер не прислал Referer. */
const CONTACT_PAGE_URL = `${SITE_URL}/contact`;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LINK_PATTERN = /https?:\/\//gi;

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  /** Согласие на обработку ПДн — обязательно, форма без него не отправляется. */
  consent?: unknown;
  /** Honeypot — у людей всегда пуст. */
  company?: unknown;
  /** Время от загрузки формы до отправки, мс. */
  elapsedMs?: unknown;
}

/** Тело запроса — три строковых поля. Длину и формат проверяем отдельно. */
const isContactPayload = (value: unknown): value is ContactPayload => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const { name, email, message } = value as Record<string, unknown>;

  return typeof name === 'string' && typeof email === 'string' && typeof message === 'string';
};

/** Похоже на бота: заполненный honeypot, мгновенная отправка или ссылочный флуд. */
const isSpam = ({ company, elapsedMs, message }: ContactPayload): boolean => {
  if (typeof company === 'string' && company.trim()) {
    return true;
  }

  if (typeof elapsedMs === 'number' && elapsedMs < MIN_ELAPSED_MS) {
    return true;
  }

  return (message.match(LINK_PATTERN) ?? []).length > MAX_LINKS;
};

const isValid = ({ name, email, message, consent }: ContactPayload): boolean => {
  return (
    consent === true &&
    !!name.trim() &&
    !!message.trim() &&
    name.length <= MAX_NAME &&
    email.length <= MAX_EMAIL &&
    message.length <= MAX_MESSAGE &&
    EMAIL_PATTERN.test(email)
  );
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  let payload: unknown;

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  if (!isContactPayload(payload)) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  if (isSpam(payload)) {
    // Тихий «успех» — бот не должен понять, что его отфильтровали.
    return NextResponse.json({ ok: true });
  }

  if (!isValid(payload)) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 422 });
  }

  const { name, email, message } = payload;
  const referer = req.headers.get('referer') || CONTACT_PAGE_URL;

  const isLeadCreated = await sendAmoContactLead({ name, email, message, referer });

  // amoCRM — единственный приёмник заявок, поэтому её отказ отдаём формой как ошибку:
  // посетитель увидит подсказку и напишет напрямую, а не решит, что заявка ушла.
  if (!isLeadCreated) {
    return NextResponse.json({ error: 'Failed to deliver message' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
};
