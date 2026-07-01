import { useRef, useState } from 'react';
import type { FormSubmitStatus } from './useFormSubmit.types';

/**
 * Универсальная логика формы: состояние полей, антиспам (honeypot + время на странице)
 * и отправка на указанный endpoint. Возвращает методы, а не хендлеры (react.md #3).
 */
export const useFormSubmit = <T extends Record<string, string>>(
  endpoint: string,
  initialForm: T,
) => {
  const [form, setForm] = useState<T>(initialForm);
  const [status, setStatus] = useState<FormSubmitStatus>('idle');
  const mountedAt = useRef(Date.now());

  const change = (field: keyof T, value: string) => {
    setForm((prev) => {
      return { ...prev, [field]: value };
    });
  };

  const reset = () => {
    setForm(initialForm);
    setStatus('idle');
    mountedAt.current = Date.now();
  };

  const submit = async (honeypot: string) => {
    setStatus('pending');

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          company: honeypot,
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });

      if (!res.ok) {
        throw new Error(`Form request failed: ${res.status}`);
      }

      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return { form, status, change, submit, reset };
};
