'use client';

import { createContext, useContext } from 'react';
import type { OrderModalContextValue } from './OrderModal.types';

/** Контекст модалки заявки: null вне провайдера — хук падает с понятной ошибкой. */
const OrderModalContext = createContext<OrderModalContextValue | null>(null);

export const OrderModalProvider = OrderModalContext.Provider;

export const useOrderModal = (): OrderModalContextValue => {
  const value = useContext(OrderModalContext);

  if (!value) {
    throw new Error('useOrderModal must be used within OrderModalContainer');
  }

  return value;
};
