/** Экранирует спецсимволы — Telegram parse_mode='HTML' требует валидной разметки. */
export const escapeHtml = (value: string): string => {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

/**
 * Отправляет сообщение в контактный чат сайта через Bot API.
 * Server-only: требует TELEGRAM_BOT_TOKEN и TELEGRAM_CONTACT_CHAT_ID.
 * Возвращает false при отсутствии конфигурации или сбое доставки.
 */
export const sendTelegramMessage = async (text: string): Promise<boolean> => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CONTACT_CHAT_ID;

  if (!token || !chatId) {
    return false;
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });

  return res.ok;
};
