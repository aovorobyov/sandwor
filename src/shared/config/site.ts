/**
 * Единый источник правды для адреса продакшн-сайта: канонические адреса, sitemap, OG.
 * Домен один — sandwor.ru. Переопределяется через NEXT_PUBLIC_SITE_URL (превью-окружения).
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sandwor.ru';

/** Домен без протокола — для отображения (футер OG-картинки, alt). */
export const SITE_HOST = new URL(SITE_URL).host;
