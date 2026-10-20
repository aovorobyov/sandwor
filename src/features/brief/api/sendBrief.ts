import type { BriefFormValues } from '@sw/components/BriefForm';
import { getAttribution } from '@/shared/lib/attribution';

/**
 * Отправляет бриф в `/api/brief`. Промис отклоняется при любой неудаче —
 * BriefForm покажет ошибку над кнопками и не потеряет введённое.
 */
export const sendBrief = async (
  values: BriefFormValues,
  elapsedMs: number,
  requestId: string,
): Promise<void> => {
  const response = await fetch('/api/brief', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...values, elapsedMs, requestId, attribution: getAttribution() }),
  });

  if (!response.ok) {
    throw new Error(`Brief request failed: ${response.status}`);
  }
};

const REQUEST_ID_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

/** Идентификатор одной заявки: тот же на повторных нажатиях «Отправить» после сбоя сети. */
export const createRequestId = (length = 16): string => {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (byte) => REQUEST_ID_ALPHABET[byte % REQUEST_ID_ALPHABET.length]).join(
    '',
  );
};
