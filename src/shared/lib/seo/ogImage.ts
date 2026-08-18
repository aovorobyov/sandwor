import { defaultLocale } from '@/i18n-routing';
import type { ContentOgImageOptions, OgImage, PageOgImageOptions } from './ogImage.types';

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

/** Сборка ссылки на динамическую обложку: query собираем через URLSearchParams. */
const buildOgImage = (params: Record<string, string>, alt: string): OgImage => {
  const search = new URLSearchParams(params).toString();

  return {
    url: `/api/og?${search}`,
    width: OG_WIDTH,
    height: OG_HEIGHT,
    alt,
  };
};

/**
 * Продающая обложка для главной и /websites: позиционирование, ценовой якорь и
 * сроки. Текст локализован по `locale` внутри роута.
 */
export const buildOfferOgImage = (locale: string): OgImage => {
  const alt =
    locale === 'en'
      ? 'Websites that bring you leads — sandwor'
      : 'Сайты, которые приносят заявки — sandwor';

  return buildOgImage({ variant: 'offer', locale }, alt);
};

/**
 * Обложка уровня рут-лейаута — фолбэк для страниц без своей.
 *
 * Рисуется тем же роутом, а не статичным файлом: в картинку впечатан домен, а
 * он зависит от окружения (sandwor.online / sandwor.ru), — статика на одном из
 * доменов врала бы.
 */
export const OG_DEFAULT_IMAGE: OgImage = buildOfferOgImage(defaultLocale);

/** Обложка статьи или кейса: тег/тип, заголовок и мета-строка в подвале. */
export const buildContentOgImage = (options: ContentOgImageOptions): OgImage => {
  const { title, tag = '', meta = '', locale } = options;

  return buildOgImage({ variant: 'content', locale, title, tag, meta }, title);
};

/** Обложка раздела: заголовок и подводка страницы. */
export const buildPageOgImage = (options: PageOgImageOptions): OgImage => {
  const { title, tag = '', lead = '', locale } = options;

  return buildOgImage({ variant: 'page', locale, title, tag, lead }, title);
};
