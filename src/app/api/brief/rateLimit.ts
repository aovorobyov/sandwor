/**
 * Простой ограничитель частоты по IP в памяти процесса. Сайт работает одним
 * standalone-сервером, поэтому общего хранилища не нужно; после перезапуска счётчики
 * обнуляются — для защиты брифа от флуда этого достаточно.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const MAX_KEYS = 5000;

const hits = new Map<string, number[]>();

/** true — лимит исчерпан, запрос нужно отклонить. */
export const isRateLimited = (key: string, now = Date.now()): boolean => {
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_HITS) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  // Не даём карте расти бесконечно: при переполнении выбрасываем самые старые ключи.
  if (hits.size > MAX_KEYS) {
    const oldest = hits.keys().next().value;
    if (oldest !== undefined) hits.delete(oldest);
  }

  return false;
};

/** IP клиента за обратным прокси (nginx передаёт X-Real-IP / X-Forwarded-For). */
export const getClientIp = (headers: Headers): string => {
  const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return headers.get('x-real-ip') || forwarded || 'unknown';
};
