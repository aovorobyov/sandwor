/**
 * Откуда открыли бриф. Значение уходит параметром `brief_placement` в цели Метрики
 * `brief_open` и `order_websites` и строкой «Кнопка: …» в заявку amoCRM — так видно,
 * какие кнопки приводят к заявкам. Подписи — по-русски: их читает менеджер в CRM.
 */
export const BRIEF_PLACEMENT_LABELS = {
  header: 'кнопка в шапке',
  menu: 'мобильное меню',
  home: 'главная',
  services: 'страница «Услуги»',
  service: 'страница услуги',
  plans: 'тарифы',
  calculator: 'калькулятор',
  case: 'кейс',
  article: 'статья',
  footer: 'подвал',
  contact: 'страница контактов',
} as const;

export type BriefPlacement = keyof typeof BRIEF_PLACEMENT_LABELS;

export const isBriefPlacement = (value: unknown): value is BriefPlacement =>
  typeof value === 'string' && Object.prototype.hasOwnProperty.call(BRIEF_PLACEMENT_LABELS, value);
