import type { YmGoal } from '@/shared/lib/analytics';

export type OrderFormState = {
  name: string;
  phone: string;
  telegram: string;
  task: string;
};

export interface OrderFormProps {
  /** JS-цель Метрики, которую засчитываем при успешной отправке. */
  goal: YmGoal;
}
