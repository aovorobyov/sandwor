import type { BriefFormValues } from '@sw/components/BriefForm';
import { getAttribution } from '@/shared/lib/attribution';
import type { BriefPlacement } from '../model/placement';

/**
 * Отправляет бриф в `/api/brief`. Промис отклоняется при любой неудаче —
 * BriefForm покажет ошибку над кнопками и не потеряет введённое.
 */
export const sendBrief = async (
  values: BriefFormValues,
  elapsedMs: number,
  requestId: string,
  placement: BriefPlacement,
): Promise<void> => {
  const response = await fetch('/api/brief', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...values,
      elapsedMs,
      requestId,
      placement,
      attribution: getAttribution(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Brief request failed: ${response.status}`);
  }
};

export { createRequestId } from '@/shared/lib/requestId';
