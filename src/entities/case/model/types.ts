export interface CaseItem {
  slug: string;
  type: string;
  title: string;
  summary: string;
  scope: string[];
}

export interface CaseFact {
  k: string;
  v: string;
}

export interface CaseBlock {
  title: string;
  paragraphs: string[];
}

/** Подпись к скриншоту; `id` совпадает с ключом в CASE_SHOTS. Порядок — порядок показа. */
export interface CaseGalleryItem {
  id: string;
  caption: string;
}

export interface CaseDetail {
  lead: string;
  facts: CaseFact[];
  blocks: CaseBlock[];
  /** Цифры о нашей работе (не о бизнесе клиента): «12 страниц», «800+ пар в словаре». */
  metrics?: CaseMetric[];
  gallery?: CaseGalleryItem[];
}

export interface CaseMetric {
  value: string;
  label: string;
}

/** Что за ссылка: живой сайт клиента или открытый репозиторий. */
export type CaseLinkKind = 'site' | 'repo';

export interface CaseLink {
  kind: CaseLinkKind;
  href: string;
}
