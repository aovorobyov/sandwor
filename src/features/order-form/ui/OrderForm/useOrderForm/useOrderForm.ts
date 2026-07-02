import { useFormSubmit } from '@/shared/lib/useFormSubmit';
import { reachGoal } from '@/shared/lib/analytics';
import type { YmGoal } from '@/shared/lib/analytics';
import type { OrderFormState } from '../OrderForm.types';

const INITIAL_FORM: OrderFormState = { name: '', phone: '', telegram: '', task: '' };

/**
 * Состояние формы заявки на сайт и отправка её в Telegram-бота через /api/order.
 * @param goal — JS-цель Метрики, зависит от места формы (главная / страница услуги).
 */
export const useOrderForm = (goal: YmGoal) => {
  return useFormSubmit<OrderFormState>('/api/order', INITIAL_FORM, () => {
    reachGoal(goal);
  });
};
