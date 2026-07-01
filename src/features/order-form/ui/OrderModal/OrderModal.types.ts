import type { ReactNode } from 'react';

export interface OrderModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export interface OrderModalContainerProps {
  children: ReactNode;
}

export interface OrderButtonProps {
  children: ReactNode;
  className?: string;
}
