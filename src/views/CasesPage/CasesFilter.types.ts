import type { CaseItem } from '@/entities/case/model/types';

export interface CasesFilterProps {
  items: CaseItem[];
  allLabel: string;
  ctaLabel: string;
}
