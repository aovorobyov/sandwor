import type { ServiceId } from '@/entities/service';
import type { CaseLink } from './types';

/** Стабильные слаги кейсов — порядок совпадает с `cases.items` в переводах. */
export const CASE_SLUGS = [
  'skynia-hall',
  'model-agency',
  'kids-agency',
  'tilda-translate',
] as const;

export type CaseSlug = (typeof CASE_SLUGS)[number];

/**
 * Кейсы, скрытые с сайта: тексты в переводах остаются, но ни в списке, ни по
 * прямой ссылке кейс не открывается. Чтобы вернуть — убрать слаг отсюда.
 *
 * `kids-agency` — OPENUP Teens: пока только дизайн, вернуть после запуска сайта.
 * `tilda-translate` — влит в кейс агентства: модуль работает на его сайте.
 */
const DRAFT_CASE_SLUGS: readonly CaseSlug[] = ['kids-agency', 'tilda-translate'];

/** Слаги, которые реально живут на сайте: генерация страниц, список, «другие кейсы». */
export const PUBLISHED_CASE_SLUGS = CASE_SLUGS.filter((slug) => {
  return !DRAFT_CASE_SLUGS.includes(slug);
});

/** Опубликован ли кейс. Черновики отдаём как 404, а не как пустую страницу. */
export const isPublishedCase = (slug: string): boolean => {
  return PUBLISHED_CASE_SLUGS.some((published) => published === slug);
};

/** Внешние ссылки кейса: живой сайт и, если код открыт, репозиторий. */
export const CASE_LINKS: Partial<Record<CaseSlug, readonly CaseLink[]>> = {
  'model-agency': [{ kind: 'site', href: 'https://openupmodels.ru' }],
};

/** Направления кейса — бейджи на карточке и фильтр на странице кейсов. */
export const CASE_SERVICES: Record<CaseSlug, readonly ServiceId[]> = {
  'skynia-hall': ['sites'],
  'model-agency': ['sites'],
  'kids-agency': ['sites'],
  'tilda-translate': ['sites'],
};

/** Что нарисовать на схематичной обложке кейса (окно браузера на канве). */
export interface CaseCoverSpec {
  /** Домен в адресной строке; без него там выводится тип проекта. */
  domain?: string;
  /** Раскладка страницы: каталог карточек или лендинг с блоками. */
  layout: 'catalog' | 'landing';
  /** Моно-чипы в шапке окна: «ru / en». */
  chips?: readonly string[];
}

export const CASE_COVERS: Record<CaseSlug, CaseCoverSpec> = {
  'skynia-hall': { domain: 'skynia.space', layout: 'landing' },
  'model-agency': { domain: 'openupmodels.ru', layout: 'catalog', chips: ['ru', 'en'] },
  'kids-agency': { domain: 'openupteens.ru', layout: 'catalog' },
  'tilda-translate': { layout: 'landing', chips: ['ru', 'en'] },
};

/** Скриншот кейса: десктоп 1440×900 или телефон 390×844, снят с ретиной. */
export interface CaseShotSpec {
  device: 'desktop' | 'mobile';
}

export interface CaseShots {
  /** Домен в адресной строке рамки браузера. */
  domain: string;
  /** Кадр для обложки карточки и героя страницы кейса. */
  cover: string;
  shots: Record<string, CaseShotSpec>;
}

/** Ширины WebP в `public/cases/<slug>/<id>-<w>.webp` по типу устройства. */
export const CASE_SHOT_WIDTHS: Record<CaseShotSpec['device'], readonly [number, number]> = {
  desktop: [800, 1600],
  mobile: [390, 780],
};

/**
 * Настоящие скриншоты сайтов клиентов. Кейс без записи здесь показывает
 * схематичную обложку (SiteCover). Подписи — `cases.details.<slug>.gallery`.
 */
export const CASE_SHOTS: Partial<Record<CaseSlug, CaseShots>> = {
  'skynia-hall': {
    domain: 'skynia.space',
    cover: 'hero',
    shots: {
      hero: { device: 'desktop' },
      spaces: { device: 'desktop' },
      formats: { device: 'desktop' },
      svadba: { device: 'desktop' },
      booking: { device: 'desktop' },
      'mobile-hero': { device: 'mobile' },
      'mobile-spaces': { device: 'mobile' },
    },
  },
  'model-agency': {
    domain: 'openupmodels.ru',
    cover: 'catalog',
    shots: {
      hero: { device: 'desktop' },
      news: { device: 'desktop' },
      'news-en': { device: 'desktop' },
      post: { device: 'desktop' },
      menu: { device: 'desktop' },
      catalog: { device: 'desktop' },
      'mobile-menu-ru': { device: 'mobile' },
      'mobile-catalog': { device: 'mobile' },
    },
  },
};

/** srcSet и src скриншота. */
export const getShotSources = (slug: CaseSlug, id: string, device: CaseShotSpec['device']) => {
  const [small, large] = CASE_SHOT_WIDTHS[device];
  const base = `/cases/${slug}/${id}`;

  return {
    src: `${base}-${small}.webp`,
    srcSet: `${base}-${small}.webp ${small}w, ${base}-${large}.webp ${large}w`,
  };
};
