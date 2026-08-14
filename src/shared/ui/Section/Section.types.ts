import type { ReactNode } from 'react';

export type SectionTone = 'default' | 'subtle';

export interface SectionProps {
  children: ReactNode;
  /** `subtle` — подложка `--bg2` с верхней границей: задаёт ритм секций. */
  tone?: SectionTone;
  /** Убрать вертикальные отступы (для секций, что сами управляют padding). */
  isFlush?: boolean;
  /** Класс на внутренний контейнер (1280px). */
  className?: string;
  id?: string;
}
