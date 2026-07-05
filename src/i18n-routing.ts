import { defineRouting } from 'next-intl/routing';

export const locales = ['ru', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ru';

/**
 * Единый источник правды для маршрутизации next-intl.
 * `localePrefix: 'as-needed'` — дефолтная локаль (ru) живёт без префикса,
 * остальные (en) получают собственные индексируемые URL вида `/en/...`.
 * `localeDetection: false` — язык определяется URL'ом, а не cookie/Accept-Language:
 * URL остаётся авторитетным источником, переключение — явное через UI.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false,
});
