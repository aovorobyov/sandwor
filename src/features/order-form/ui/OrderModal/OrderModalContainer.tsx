'use client';

import { useState } from 'react';
import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Modal } from '@/shared/ui/Modal';
import { OrderForm } from '../OrderForm';
import { OrderModalProvider } from './OrderModal.context';
import type { OrderModalContainerProps } from './OrderModal.types';

/** Провайдер модалки заявки: держит состояние открытия и рендерит Modal один раз на всё поддерево. */
export const OrderModalContainer: FC<OrderModalContainerProps> = (props) => {
  const { children } = props;
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const handleClose = () => {
    close();
  };

  return (
    <OrderModalProvider value={{ isOpen, open, close }}>
      {children}

      <Modal isOpen={isOpen} title={t('order.title')} onClose={handleClose}>
        <OrderForm />
      </Modal>
    </OrderModalProvider>
  );
};
