import type { Metadata } from 'next';
import { defaultLocale, locales } from '@/i18n-routing';
import { buildLocaleUrl } from './buildLocaleUrl';

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
