/**
 * Единый источник правды для адреса продакшн-сайта.
 * Единственный домен — sandwor.ru: на него ведут канонические адреса, sitemap, OG и материалы.
 * Переопределяется через NEXT_PUBLIC_SITE_URL (например, для тестового окружения).
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sandwor.ru';

/** Домен без протокола — для отображения (футер OG-картинки, alt). */
export const SITE_HOST = new URL(SITE_URL).host;

/** Название бренда: заголовки страниц, siteName, разметка Organization, подписи OG. */
export const BRAND_NAME = 'sandwor studio';
