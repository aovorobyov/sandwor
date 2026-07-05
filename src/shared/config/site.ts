/**
 * Единый источник правды для адреса продакшн-сайта.
 * Канонический домен — sandwor.online: доступен из России, тогда как .ru на Vercel
 * иногда недоступен. .ru остаётся живым для связки с телеграмом, но не индексируется как основной.
 * Переопределяется через NEXT_PUBLIC_SITE_URL (например, превью-окружения Vercel).
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sandwor.online';

/** Домен без протокола — для отображения (футер OG-картинки, alt). */
export const SITE_HOST = new URL(SITE_URL).host;
