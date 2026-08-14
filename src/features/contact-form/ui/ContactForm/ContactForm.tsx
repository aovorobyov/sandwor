'use client';

import { useState } from 'react';
import type { ChangeEvent, FC, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Link } from '@/shared/ui/Link';
import { FormSuccess } from '@/shared/ui/FormSuccess';
import { useContactForm } from './useContactForm';
import s from './ContactForm.module.css';

export const ContactForm: FC = () => {
  const t = useTranslations();
  const { form, status, change, submit, reset } = useContactForm();
  const [hasConsent, setHasConsent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const honeypot = new FormData(e.currentTarget).get('company');
    void submit(typeof honeypot === 'string' ? honeypot : '', { consent: hasConsent });
  };

  const handleReset = () => {
    reset();
    setHasConsent(false);
  };

  const handleConsentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasConsent(e.target.checked);
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
      <FormSuccess
        text={t('contact.success')}
        actionLabel={t('contact.again')}
        onReset={handleReset}
      />
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

      <Checkbox name="consent" checked={hasConsent} onChange={handleConsentChange} required>
        {t('form.consent-pre')}{' '}
        <Link href="/privacy" className={s.consentLink}>
          {t('form.consent-link')}
        </Link>
      </Checkbox>

      {status === 'error' && <p className={s.error}>{t('contact.error')}</p>}

      <Button type="submit" className={s.submit} disabled={isPending || !hasConsent}>
        {isPending ? t('contact.sending') : t('contact.submit')}
      </Button>
    </form>
  );
};
