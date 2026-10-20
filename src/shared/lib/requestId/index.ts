const REQUEST_ID_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

/** Идентификатор одной отправки формы: тот же на повторах после сбоя сети — amoCRM отсекает дубль. */
export const createRequestId = (length = 16): string => {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (byte) => REQUEST_ID_ALPHABET[byte % REQUEST_ID_ALPHABET.length]).join(
    '',
  );
};
