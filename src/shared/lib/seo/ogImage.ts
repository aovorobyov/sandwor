import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { defaultLocale } from '@/i18n-routing';
import { byPositioning } from '@/shared/config/positioning';
import { BRAND_NAME } from '@/shared/config/site';
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
 * Продающая обложка для главной: позиционирование, ценовой якорь и
 * сроки. Текст локализован по `locale` внутри роута.
 */
export const buildOfferOgImage = (locale: string): OgImage => {
  const titles = byPositioning({
    sites: { ru: 'Делаем сайты, которые приносят заявки', en: 'Websites that bring you leads' },
    studio: { ru: 'Наводим порядок в продажах', en: 'We bring order to your sales' },
  });
  const alt = `${locale === 'en' ? titles.en : titles.ru} — ${BRAND_NAME}`;

  return buildOgImage({ variant: 'offer', locale }, alt);
};

/** Обложка уровня рут-лейаута — фолбэк для страниц без своей (определена ниже). */

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

/**
 * Готовая картинка из public/og (её рисует scripts/blog-art/og.mjs на токенах ДС):
 * `<key>-<locale>.jpg`. Если файла нет — например, статью добавили, а скрипт не
 * перезапускали, — страница берёт динамическую обложку `fallback`.
 */
export const withStaticOg = (key: string, locale: string, fallback: OgImage): OgImage => {
  const file = `${key}-${locale}.jpg`;

  if (!existsSync(join(process.cwd(), 'public', 'og', file))) {
    return fallback;
  }

  return { url: `/og/${file}`, width: OG_WIDTH, height: OG_HEIGHT, alt: fallback.alt };
};

/** Обложка рут-лейаута: картинка главной (в статичных картинках домена нет — подходит обоим доменам). */
export const OG_DEFAULT_IMAGE: OgImage = withStaticOg(
  'home',
  defaultLocale,
  buildOfferOgImage(defaultLocale),
);
