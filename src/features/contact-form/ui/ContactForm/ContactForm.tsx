'use client';

import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import type { FormState } from './ContactForm.types';
import s from './ContactForm.module.css';

const sendMessage = async (data: FormState): Promise<void> => {
  console.warn('sendMessage (stub):', data);
};

export const ContactForm: FC = () => {
  const t = useTranslations();
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    await sendMessage(form);
    setIsSubmitted(true);
    setIsPending(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, email: e.target.value }));
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, message: e.target.value }));
  };

  if (isSubmitted) {
    return <p className={s.success}>{t('contact.success')}</p>;
  }

  return (
    <form className={s.form} onSubmit={handleSubmit} noValidate>
      <Input
        label={t('contact.name')}
        name="name"
        value={form.name}
        onChange={handleNameChange}
        required
      />

      <Input
        label={t('contact.email')}
        name="email"
        type="email"
        value={form.email}
        onChange={handleEmailChange}
        required
      />

      <div className={s.textareaWrapper}>
        <label htmlFor="message" className={s.label}>
          {t('contact.message')}
        </label>

        <textarea
          id="message"
          name="message"
          className={s.textarea}
          rows={5}
          value={form.message}
          onChange={handleMessageChange}
          required
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {t('contact.submit')}
      </Button>
    </form>
  );
};
