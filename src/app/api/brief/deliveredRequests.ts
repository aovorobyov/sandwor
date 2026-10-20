/**
 * Недавно доставленные в amoCRM заявки по идентификатору отправки из браузера.
 * Если ответ сервера потерялся и посетитель нажал «Отправить» снова, вторая заявка
 * не создаётся. Память процесса — сайт работает одним сервером; окна в 30 минут хватает.
 */

const TTL_MS = 30 * 60 * 1000;
const MAX_ITEMS = 2000;

const delivered = new Map<string, number>();

export const isDelivered = (requestId: string, now = Date.now()): boolean => {
  const at = delivered.get(requestId);
  return at !== undefined && now - at < TTL_MS;
};

export const markDelivered = (requestId: string, now = Date.now()): void => {
  delivered.set(requestId, now);

  if (delivered.size > MAX_ITEMS) {
    const oldest = delivered.keys().next().value;
    if (oldest !== undefined) delivered.delete(oldest);
  }
};
