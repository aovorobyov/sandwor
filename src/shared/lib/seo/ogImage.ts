import { SITE_HOST } from '@/shared/config/site';

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

/**
 * Дефолтная OG-картинка сайта — для страниц без собственной обложки.
 * Статьи блога не используют её: у них динамическая обложка через /api/og.
 */
export const OG_DEFAULT_IMAGE = {
  url: '/img/og-sandwor.jpg',
  width: OG_WIDTH,
  height: OG_HEIGHT,
  alt: SITE_HOST,
};

/**
 * Продающая OG-обложка для главной и /websites: оффер, ценовой якорь и выгоды.
 * Генерируется динамически через /api/og?variant=offer — текст локализован по `locale`.
 */
export const buildOfferOgImage = (locale: string) => {
  const alt =
    locale === 'en' ? 'Websites for business — sandwor' : 'Сайты для бизнеса под ключ — sandwor';

  return {
    url: `/api/og?variant=offer&locale=${locale}`,
    width: OG_WIDTH,
    height: OG_HEIGHT,
    alt,
  };
};
