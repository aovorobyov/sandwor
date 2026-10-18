import type { ServiceId } from '@sw/components/ServiceCard';

/**
 * Четыре направления студии. Id совпадают с `SERVICES` дизайн-системы — по ним
 * берутся иконка и бейдж; тексты живут в переводах (`services.items.<id>`).
 */
export const SERVICE_IDS = ['crm', 'sites', 'smm', 'ai'] as const satisfies readonly ServiceId[];

export type { ServiceId };

/**
 * Статус направления. `active` — работает: цена, страница, бриф, меню.
 * `soon` — готовим к запуску: карточка с плашкой «Скоро» без цены и ссылки,
 * вместо страницы — заглушка «Скоро» (noindex, вне sitemap), в брифе и
 * калькуляторе направления нет. Чтобы включить направление — поменять статус здесь;
 * тексты, цены и полная страница уже готовы.
 */
export type ServiceStatus = 'active' | 'soon';

export const SERVICE_STATUS: Record<ServiceId, ServiceStatus> = {
  crm: 'soon',
  sites: 'active',
  smm: 'soon',
  ai: 'soon',
};

export const isServiceActive = (id: ServiceId): boolean => {
  return SERVICE_STATUS[id] === 'active';
};

/** Работающие направления в порядке SERVICE_IDS. */
export const ACTIVE_SERVICE_IDS: readonly ServiceId[] = SERVICE_IDS.filter((id) => {
  return SERVICE_STATUS[id] === 'active';
});

/** Цены «от» — одни для карточек, калькулятора и мета-описаний. */
export const SERVICE_PRICES: Record<ServiceId, number> = {
  crm: 45000,
  sites: 50000,
  smm: 35000,
  ai: 30000,
};

/** Услуги с абонентской оплатой: к цене добавляется «в месяц». */
export const MONTHLY_SERVICES: readonly ServiceId[] = ['smm'];

/**
 * Цены калькулятора. Совпадают с ценами «от», плюс надбавки CRM: базовая
 * настройка включает 5 менеджеров, каждый следующий — +1 500 ₽.
 */
export const CALCULATOR_PRICES = {
  crmBase: SERVICE_PRICES.crm,
  crmPerManager: 1500,
  crmIncluded: 5,
  sites: SERVICE_PRICES.sites,
  smmMonth: SERVICE_PRICES.smm,
  ai: SERVICE_PRICES.ai,
};

/** Надбавки интеграций CRM в калькуляторе; подписи — `calculator.integration-labels`. */
export const CALCULATOR_INTEGRATIONS = [
  { value: 'forms', price: 8000 },
  { value: 'telephony', price: 12000 },
  { value: 'erp', price: 18000 },
] as const;

/** Сроки запуска для сравнения в калькуляторе (самый долгий выигрывает). */
export const CALCULATOR_TERM_DAYS: Record<ServiceId, number> = {
  crm: 10,
  sites: 14,
  smm: 7,
  ai: 5,
};

/** Цены тарифов сайтов по `services.items.sites.plans[].id`; без цены — «по запросу».
 *  Подтверждены: лендинг на Tilda от 50 000 ₽, магазин на Tilda от 100 000 ₽, кастом — по запросу. */
export const SITE_PLAN_PRICES: Record<string, number | undefined> = {
  landing: 50000,
  store: 100000,
};

/** Тариф, выделенный в ряду. */
export const FEATURED_SITE_PLAN = 'landing';

export const isServiceId = (value: string): value is ServiceId => {
  return (SERVICE_IDS as readonly string[]).includes(value);
};

/** Адрес страницы направления. */
export const getServiceHref = (id: ServiceId): string => {
  return `/services/${id}`;
};
