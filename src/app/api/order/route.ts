import { NextRequest, NextResponse } from 'next/server';
import { escapeHtml, sendTelegramMessage } from '@/shared/api/telegram';

/** Ограничения длины полей — отсекаем мусор и слишком большие запросы. */
const MAX_NAME = 100;
const MAX_PHONE = 40;
const MAX_TELEGRAM = 100;
const MAX_TASK = 2000;

/** Антиспам: минимальная пауза «загрузка → отправка» и потолок ссылок в описании. */
const MIN_ELAPSED_MS = 2000;
const MAX_LINKS = 5;

const LINK_PATTERN = /https?:\/\//gi;

interface OrderPayload {
  name: string;
  phone: string;
  telegram: string;
  task: string;
  /** Согласие на обработку ПДн — обязательно, форма без него не отправляется. */
  consent?: unknown;
  /** Honeypot — у людей всегда пуст. */
  company?: unknown;
  /** Время от загрузки формы до отправки, мс. */
  elapsedMs?: unknown;
}

/** Тело запроса — четыре строковых поля. Длину и формат проверяем отдельно. */
const isOrderPayload = (value: unknown): value is OrderPayload => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const { name, phone, telegram, task } = value as Record<string, unknown>;

  return (
    typeof name === 'string' &&
    typeof phone === 'string' &&
    typeof telegram === 'string' &&
    typeof task === 'string'
  );
};

/** Похоже на бота: заполненный honeypot, мгновенная отправка или ссылочный флуд. */
const isSpam = ({ company, elapsedMs, task }: OrderPayload): boolean => {
  if (typeof company === 'string' && company.trim()) {
    return true;
  }

  if (typeof elapsedMs === 'number' && elapsedMs < MIN_ELAPSED_MS) {
    return true;
  }

  return (task.match(LINK_PATTERN) ?? []).length > MAX_LINKS;
};

const isValid = ({ name, phone, telegram, task, consent }: OrderPayload): boolean => {
  return (
    consent === true &&
    !!name.trim() &&
    !!phone.trim() &&
    !!task.trim() &&
    name.length <= MAX_NAME &&
    phone.length <= MAX_PHONE &&
    telegram.length <= MAX_TELEGRAM &&
    task.length <= MAX_TASK
  );
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CONTACT_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json({ error: 'Contact channel is not configured' }, { status: 500 });
  }

  let payload: unknown;

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  if (!isOrderPayload(payload)) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  if (isSpam(payload)) {
    // Тихий «успех» — бот не должен понять, что его отфильтровали.
    return NextResponse.json({ ok: true });
  }

  if (!isValid(payload)) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 422 });
  }

  const { name, phone, telegram, task } = payload;

  const lines = [
    '🌐 <b>Новая заявка на сайт</b>',
    '',
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
  ];

  if (telegram.trim()) {
    lines.push(`<b>Telegram:</b> ${escapeHtml(telegram)}`);
  }

  lines.push('', `<b>Задача:</b> ${escapeHtml(task)}`);
  lines.push('', '✅ Согласие на обработку ПДн получено');

  const isDelivered = await sendTelegramMessage(lines.join('\n'));

  if (!isDelivered) {
    return NextResponse.json({ error: 'Failed to deliver message' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
};
