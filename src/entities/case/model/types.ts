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
  p1: string;
  p2: string;
}

export interface CaseDetail {
  lead: string;
  facts: CaseFact[];
  blocks: CaseBlock[];
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
