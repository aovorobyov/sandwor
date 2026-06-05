import type { Metadata } from 'next';
import { SITE_URL } from '../jsonLd/config';

/**
 * Canonical + hreflang для `generateMetadata` страницы.
 *
 * Сайт работает в режиме `localePrefix: 'never'` — обе локали отдаются на одном URL,
 * язык выбирается кукой. Поэтому canonical и все hreflang указывают на один адрес:
 * это закрепляет канонический URL и декларирует мультиязычность страницы для поисковиков
 * (зеркало hreflang-альтернатив из sitemap.xml).
 */
export const buildPageAlternates = (path: string): Metadata['alternates'] => {
  const url = `${SITE_URL}${path}`;

  return {
    canonical: url,
    languages: {
      ru: url,
      en: url,
      'x-default': url,
    },
  };
};
