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
