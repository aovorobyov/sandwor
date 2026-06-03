import { useRef, useState } from 'react';
import type { ContactFormStatus, FormState } from '../ContactForm.types';

const INITIAL_FORM: FormState = { name: '', email: '', message: '' };

/** Состояние формы обратной связи и отправка сообщения в Telegram-бота. */
export const useContactForm = () => {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<ContactFormStatus>('idle');
  const mountedAt = useRef(Date.now());

  const change = (field: keyof FormState, value: string) => {
    setForm((prev) => {
      return { ...prev, [field]: value };
    });
  };

  const reset = () => {
    setForm(INITIAL_FORM);
    setStatus('idle');
    mountedAt.current = Date.now();
  };

  const submit = async (honeypot: string) => {
    setStatus('pending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          company: honeypot,
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });

      if (!res.ok) {
        throw new Error(`Contact request failed: ${res.status}`);
      }

      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return { form, status, change, submit, reset };
};
