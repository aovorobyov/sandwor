'use client';

import type { ChangeEvent, FC, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { useContactForm } from './useContactForm';
import s from './ContactForm.module.css';

export const ContactForm: FC = () => {
  const t = useTranslations();
  const { form, status, change, submit, reset } = useContactForm();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const honeypot = new FormData(e.currentTarget).get('company');
    void submit(typeof honeypot === 'string' ? honeypot : '');
  };

  const handleReset = () => {
    reset();
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    change('name', e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    change('email', e.target.value);
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    change('message', e.target.value);
  };

  if (status === 'success') {
    return (
      <div className={s.success}>
        <svg
          className={s.successIcon}
          width="56"
          height="56"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="m8.5 12.5 2.5 2.5 4.5-5" />
        </svg>

        <p className={s.successText}>{t('contact.success')}</p>

        <Button variant="secondary" onClick={handleReset}>
          {t('contact.again')}
        </Button>
      </div>
    );
  }

  const isPending = status === 'pending';

  return (
    <form className={s.form} onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="company"
        className={s.honeypot}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

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

      {status === 'error' && <p className={s.error}>{t('contact.error')}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? t('contact.sending') : t('contact.submit')}
      </Button>
    </form>
  );
};
