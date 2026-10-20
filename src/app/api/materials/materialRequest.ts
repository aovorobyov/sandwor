/**
 * Запрос материала (чек-листа) в обмен на имя и почту: проверка и текст заявки для amoCRM.
 */

import {
  MATERIAL_TITLES,
  PLACEMENT_TITLES,
  isMaterialId,
  isMaterialPlacement,
  type MaterialId,
  type MaterialPlacement,
} from '@/entities/material';
import { LEGAL } from '@/shared/config/legal';
import { formatAttribution } from '../brief/briefLead';

const MAX_NAME = 100;
const MAX_EMAIL = 120;
const MIN_ELAPSED_MS = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface MaterialRequest {
  materialId: MaterialId;
  placement: MaterialPlacement;
  name: string;
  email: string;
  consent: true;
  elapsedMs: number;
  requestId?: unknown;
  attribution?: unknown;
}

/** Тело похоже на запрос материала и прошло проверку; иначе null. */
export const parseMaterialRequest = (value: unknown): MaterialRequest | null => {
  if (!value || typeof value !== 'object') return null;
  const v = value as Record<string, unknown>;
  const name = typeof v.name === 'string' ? v.name.trim() : '';
  const email = typeof v.email === 'string' ? v.email.trim() : '';

  const isValid =
    isMaterialId(v.materialId) &&
    isMaterialPlacement(v.placement) &&
    v.consent === true &&
    !!name &&
    name.length <= MAX_NAME &&
    email.length <= MAX_EMAIL &&
    EMAIL_PATTERN.test(email) &&
    typeof v.elapsedMs === 'number';

  if (!isValid) return null;

  return {
    materialId: v.materialId as MaterialId,
    placement: v.placement as MaterialPlacement,
    name,
    email,
    consent: true,
    elapsedMs: v.elapsedMs as number,
    requestId: v.requestId,
    attribution: v.attribution,
  };
};

/** Бот: отправил быстрее, чем человек успел бы ввести имя и почту. */
export const isSpamMaterialRequest = (request: MaterialRequest): boolean => {
  return request.elapsedMs < MIN_ELAPSED_MS;
};

/** Примечание к заявке: что скачали, где предложили, согласие и источник визита. */
export const buildMaterialNote = (request: MaterialRequest): string => {
  return [
    `Запросил материал: «${MATERIAL_TITLES[request.materialId]}»`,
    `Где предложен: ${PLACEMENT_TITLES[request.placement]}`,
    `Согласие на обработку ПД (получение материалов): дано, редакция ${LEGAL.consentVersion} от ${LEGAL.edition.ru}`,
    formatAttribution(request.attribution),
  ]
    .filter(Boolean)
    .join('\n');
};
