import type { ReactNode } from 'react';
import type { YmGoal } from '@/shared/lib/analytics';

export interface OrderModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export interface OrderModalContainerProps {
  children: ReactNode;
  /** JS-цель Метрики для формы внутри модалки. */
  goal: YmGoal;
}

export interface OrderButtonProps {
  children: ReactNode;
  className?: string;
}
