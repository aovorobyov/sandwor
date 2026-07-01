import { useFormSubmit } from '@/shared/lib/useFormSubmit';
import type { OrderFormState } from '../OrderForm.types';

const INITIAL_FORM: OrderFormState = { name: '', phone: '', telegram: '', task: '' };

/** Состояние формы заявки на сайт и отправка её в Telegram-бота через /api/order. */
export const useOrderForm = () => {
  return useFormSubmit<OrderFormState>('/api/order', INITIAL_FORM);
};
