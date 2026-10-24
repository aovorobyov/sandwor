import type { Metadata } from 'next';
import { BRAND_NAME } from '@/shared/config/site';
import type { SocialMetaOptions } from './buildSocialMeta.types';
import { buildLocaleUrl } from './buildLocaleUrl';

/**
 * OG-блок страницы. Вынесен отдельно, потому что `publishedTime` в типах Next
 * разрешён только при `type: 'article'`.
 */
const buildOpenGraph = (options: SocialMetaOptions): Metadata['openGraph'] => {
  const { title, description, image, type, publishedTime, locale, path } = options;
  // Страница со своим OG целиком заменяет рутовый блок, поэтому общие поля — здесь.
  const common = {
    title,
    description,
    siteName: BRAND_NAME,
    images: [image],
    ...(locale ? { locale: locale === 'en' ? 'en_US' : 'ru_RU' } : {}),
    ...(locale && path !== undefined ? { url: buildLocaleUrl(locale, path) } : {}),
  };

  switch (type) {
    case 'article':
      return { ...common, type: 'article', publishedTime };
    default:
      return { ...common, type: 'website' };
  }
};

/**
 * Пара `openGraph` + `twitter` для `generateMetadata`.
 *
 * Next мержит метаданные поверхностно: если страница объявляет свой `twitter`,
 * то `card: 'summary_large_image'` из рут-лейаута теряется и X отдаёт мелкое
 * превью. Поэтому оба блока всегда собираем вместе, из одной картинки.
 */
export const buildSocialMeta = (options: SocialMetaOptions): Metadata => {
  const { title, description, image } = options;

  return {
    openGraph: buildOpenGraph(options),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
  };
};
