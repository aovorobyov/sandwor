import { NextRequest, NextResponse } from 'next/server';
import { escapeHtml, sendTelegramMessage } from '@/shared/api/telegram';

/** Ограничения длины полей — отсекаем мусор и слишком большие запросы. */
const MAX_NAME = 100;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 4000;

/** Антиспам: минимальная пауза «загрузка → отправка» и потолок ссылок в сообщении. */
const MIN_ELAPSED_MS = 2000;
const MAX_LINKS = 5;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LINK_PATTERN = /https?:\/\//gi;

interface ContactPayload {
  name: string;
  email: string;
  message: string;
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

const isValid = ({ name, email, message }: ContactPayload): boolean => {
  return (
    !!name.trim() &&
    !!message.trim() &&
    name.length <= MAX_NAME &&
    email.length <= MAX_EMAIL &&
    message.length <= MAX_MESSAGE &&
    EMAIL_PATTERN.test(email)
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

  const text = [
    '📨 <b>Новое сообщение с сайта</b>',
    '',
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
    '',
    escapeHtml(message),
  ].join('\n');

  const isDelivered = await sendTelegramMessage(text);

  if (!isDelivered) {
    return NextResponse.json({ error: 'Failed to deliver message' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
};
