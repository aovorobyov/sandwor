import { useFormSubmit } from '@/shared/lib/useFormSubmit';
import { reachGoal, YM_GOAL } from '@/shared/lib/analytics';
import type { FormState } from '../ContactForm.types';

const INITIAL_FORM: FormState = { name: '', email: '', message: '' };

/** Состояние формы обратной связи и отправка сообщения в Telegram-бота через /api/contact. */
export const useContactForm = () => {
  return useFormSubmit<FormState>('/api/contact', INITIAL_FORM, () => {
    reachGoal(YM_GOAL.contact);
  });
};
