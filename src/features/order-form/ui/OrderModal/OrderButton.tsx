'use client';

import type { FC } from 'react';
import { Button } from '@/shared/ui/Button';
import { useOrderModal } from './OrderModal.context';
import type { OrderButtonProps } from './OrderModal.types';

/** Акцентная кнопка «Заказать»: открывает модалку заявки из контекста OrderModalContainer. */
export const OrderButton: FC<OrderButtonProps> = (props) => {
  const { children, className } = props;
  const { open } = useOrderModal();

  const handleClick = () => {
    open();
  };

  return (
    <Button variant="primary" className={className} onClick={handleClick}>
      {children}
    </Button>
  );
};
