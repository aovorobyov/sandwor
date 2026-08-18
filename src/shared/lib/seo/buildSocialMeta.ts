import type { Metadata } from 'next';
import type { SocialMetaOptions } from './buildSocialMeta.types';

/**
 * OG-блок страницы. Вынесен отдельно, потому что `publishedTime` в типах Next
 * разрешён только при `type: 'article'`.
 */
const buildOpenGraph = (options: SocialMetaOptions): Metadata['openGraph'] => {
  const { title, description, image, type, publishedTime } = options;

  switch (type) {
    case 'article':
      return { title, description, type: 'article', publishedTime, images: [image] };
    default:
      return { title, description, type: 'website', images: [image] };
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
