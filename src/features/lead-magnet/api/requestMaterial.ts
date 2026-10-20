import type { MaterialId, MaterialPlacement } from '@/entities/material';
import { getAttribution } from '@/shared/lib/attribution';

interface MaterialRequestInput {
  materialId: MaterialId;
  placement: MaterialPlacement;
  locale: string;
  name: string;
  email: string;
  elapsedMs: number;
  requestId: string;
}

/** Отправляет запрос материала; возвращает ссылку на PDF или бросает ошибку. */
export const requestMaterial = async (input: MaterialRequestInput): Promise<string> => {
  const response = await fetch('/api/materials', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...input, consent: true, attribution: getAttribution() }),
  });

  if (!response.ok) {
    throw new Error(`Material request failed: ${response.status}`);
  }

  const { url } = (await response.json()) as { url: string };
  return url;
};
