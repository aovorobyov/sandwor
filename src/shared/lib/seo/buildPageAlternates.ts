import type { Metadata } from 'next';
import { SITE_URL } from '../jsonLd/config';
import { defaultLocale, locales } from '@/i18n-routing';

/** URL страницы для локали: дефолтная — без префикса, остальные — с /{locale}. */
const buildLocaleUrl = (locale: string, path: string) => {
  const prefix = locale === defaultLocale ? '' : `/${locale}`;

  return `${SITE_URL}${prefix}${path}`;
};

/**
 * Canonical + hreflang для `generateMetadata` страницы.
 *
 * Режим `localePrefix: 'as-needed'`: дефолтная локаль (ru) без префикса, остальные — на `/en/...`.
 * canonical ссылается сам на себя (URL текущей локали), languages перечисляет все локали
 * + x-default на дефолтную — так каждый языковой вариант индексируется как отдельный URL
 * (зеркало hreflang-альтернатив из sitemap.xml).
 */
export const buildPageAlternates = (locale: string, path: string): Metadata['alternates'] => {
  const languages = Object.fromEntries(locales.map((loc) => [loc, buildLocaleUrl(loc, path)]));

  return {
    canonical: buildLocaleUrl(locale, path),
    languages: {
      ...languages,
      'x-default': buildLocaleUrl(defaultLocale, path),
    },
  };
};
