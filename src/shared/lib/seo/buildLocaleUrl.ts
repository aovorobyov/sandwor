import { defaultLocale } from '@/i18n-routing';
import { SITE_URL } from '@/shared/config/site';

/**
 * Абсолютный URL страницы под локаль: дефолтная (ru) — без префикса, остальные — с `/{locale}`.
 *
 * Режим next-intl `localePrefix: 'as-needed'`: обращение к `/ru/...` middleware редиректит
 * на URL без префикса. Поэтому canonical, sitemap, JSON-LD и фид строят ссылки сразу
 * в конечном виде — иначе каждая ссылка стоит клиенту лишнего 307.
 */
export const buildLocaleUrl = (locale: string, path: string) => {
  const prefix = locale === defaultLocale ? '' : `/${locale}`;

  return `${SITE_URL}${prefix}${path}`;
};
