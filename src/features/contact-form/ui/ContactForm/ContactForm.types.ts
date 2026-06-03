export interface FormState {
  name: string;
  email: string;
  message: string;
}

/** Состояние отправки формы: ожидание → отправка → успех/ошибка. */
export type ContactFormStatus = 'idle' | 'pending' | 'success' | 'error';
