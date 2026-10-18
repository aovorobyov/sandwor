import type { ServiceId } from '@/entities/service';
import type { CaseLink } from './types';

/** Стабильные слаги кейсов — порядок совпадает с `cases.items` в переводах. */
export const CASE_SLUGS = [
  'model-agency',
  'kids-agency',
  'event-spaces',
  'tilda-translate',
] as const;

export type CaseSlug = (typeof CASE_SLUGS)[number];

/**
 * Кейсы, скрытые с сайта: тексты в переводах остаются, но ни в списке, ни по
 * прямой ссылке кейс не открывается. Чтобы вернуть — убрать слаг отсюда.
 *
 * `event-spaces` — проект ещё не завершён, показывать его рано.
 * `tilda-translate` — влит в кейс агентства: модуль работает на его сайте.
 */
const DRAFT_CASE_SLUGS: readonly CaseSlug[] = ['event-spaces', 'tilda-translate'];

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
  'model-agency': [
    { kind: 'site', href: 'https://openupmodels.ru' },
    { kind: 'repo', href: 'https://github.com/aovorobyov/translation_module' },
  ],
};

/** Направления кейса — бейджи на карточке и фильтр на странице кейсов. */
export const CASE_SERVICES: Record<CaseSlug, readonly ServiceId[]> = {
  'model-agency': ['sites'],
  'kids-agency': ['sites'],
  'event-spaces': ['sites'],
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
  'model-agency': { domain: 'openupmodels.ru', layout: 'catalog', chips: ['ru', 'en'] },
  'kids-agency': { layout: 'catalog' },
  'event-spaces': { layout: 'landing' },
  'tilda-translate': { layout: 'landing', chips: ['ru', 'en'] },
};
