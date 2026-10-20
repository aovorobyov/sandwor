/**
 * Материалы, которые сайт отдаёт в обмен на контакт (PDF-чек-листы).
 * Файлы собирает scripts/materials/build.mjs: public/materials/<id>-<locale>.pdf и обложка .webp.
 * Тексты блока на сайте — messages/*.json → materials.items.<id>.
 */

export const MATERIAL_IDS = ['site-law', 'site-prep', 'lead-leaks'] as const;
export type MaterialId = (typeof MATERIAL_IDS)[number];

/**
 * Итог сравнения: когда станет ясно, какой материал работает лучше, впишите его
 * сюда — и все посетители будут видеть только его. null — идёт тест, вариант случайный.
 */
export const MATERIAL_WINNER: MaterialId | null = null;

/** Где на сайте предложили материал — для сравнения мест в аналитике и в amoCRM. */
export const MATERIAL_PLACEMENTS = ['article', 'blog', 'services'] as const;
export type MaterialPlacement = (typeof MATERIAL_PLACEMENTS)[number];

/** Названия для заявки в amoCRM — по-русски, их читает менеджер. */
export const MATERIAL_TITLES: Record<MaterialId, string> = {
  'site-law': 'Сайт и закон: что проверить перед запуском',
  'site-prep': 'Что подготовить к сайту',
  'lead-leaks': '20 мест, где сайт теряет заявки',
};

export const PLACEMENT_TITLES: Record<MaterialPlacement, string> = {
  article: 'в конце статьи',
  blog: 'на странице блога',
  services: 'на странице услуги',
};

export const isMaterialId = (value: unknown): value is MaterialId => {
  return typeof value === 'string' && (MATERIAL_IDS as readonly string[]).includes(value);
};

export const isMaterialPlacement = (value: unknown): value is MaterialPlacement => {
  return typeof value === 'string' && (MATERIAL_PLACEMENTS as readonly string[]).includes(value);
};

const fileLocale = (locale: string) => (locale === 'en' ? 'en' : 'ru');

export const getMaterialFile = (id: MaterialId, locale: string): string => {
  return `/materials/${id}-${fileLocale(locale)}.pdf`;
};

export const getMaterialCover = (id: MaterialId, locale: string): string => {
  return `/materials/${id}-${fileLocale(locale)}.webp`;
};

/** Идентификатор цели Метрики: magnet_view_site_law и т. п. (дефисы Метрика не любит). */
export const getMaterialGoal = (stage: 'view' | 'open' | 'get', id: MaterialId): string => {
  return `magnet_${stage}_${id.replace(/-/g, '_')}`;
};
