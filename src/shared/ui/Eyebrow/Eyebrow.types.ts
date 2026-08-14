import type { ElementType, ReactNode } from 'react';

export type EyebrowTone = 'dim' | 'muted' | 'accent';

export interface EyebrowProps {
  children: ReactNode;
  /** Цвет надписи: служебный `dim` (по умолчанию), `muted` или акцентная рубрика. */
  tone?: EyebrowTone;
  as?: ElementType;
  className?: string;
}
