import type { BriefFormValues } from '@sw/components/BriefForm';

/**
 * Отправляет бриф в `/api/brief`. Промис отклоняется при любой неудаче —
 * BriefForm покажет ошибку над кнопками и не потеряет введённое.
 */
export const sendBrief = async (values: BriefFormValues, elapsedMs: number): Promise<void> => {
  const response = await fetch('/api/brief', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...values, elapsedMs }),
  });

  if (!response.ok) {
    throw new Error(`Brief request failed: ${response.status}`);
  }
};
