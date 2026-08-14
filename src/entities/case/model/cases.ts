/** Стабильные слаги кейсов — порядок совпадает с `cases.items` в переводах. */
export const CASE_SLUGS = [
  'model-agency',
  'kids-agency',
  'event-spaces',
  'tilda-translate',
] as const;

export type CaseSlug = (typeof CASE_SLUGS)[number];

/** Внешние ссылки, относящиеся к конкретным кейсам. */
export const CASE_LINKS: Partial<Record<CaseSlug, string>> = {
  'tilda-translate': 'https://github.com/aovorobyov/translation_module',
};
