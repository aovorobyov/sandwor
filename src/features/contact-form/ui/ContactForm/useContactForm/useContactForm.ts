import { useFormSubmit } from '@/shared/lib/useFormSubmit';
import type { FormState } from '../ContactForm.types';

const INITIAL_FORM: FormState = { name: '', email: '', message: '' };

/** Состояние формы обратной связи и отправка сообщения в Telegram-бота через /api/contact. */
export const useContactForm = () => {
  return useFormSubmit<FormState>('/api/contact', INITIAL_FORM);
};
