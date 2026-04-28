'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import styles from './ContactForm.module.css';

interface FormState {
  name: string;
  email: string;
  message: string;
}

// Isolated API call — replace with real implementation
async function sendMessage(data: FormState): Promise<void> {
  // TODO: connect to real API endpoint
  console.warn('sendMessage (stub):', data);
}

export function ContactForm() {
  const t = useTranslations();
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    await sendMessage(form);
    setSubmitted(true);
    setPending(false);
  }

  if (submitted) {
    return <p className={styles.success}>{t('contact.success')}</p>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Input
        label={t('contact.name')}
        name="name"
        value={form.name}
        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        required
      />
      <Input
        label={t('contact.email')}
        name="email"
        type="email"
        value={form.email}
        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
        required
      />
      <div className={styles.textareaWrapper}>
        <label htmlFor="message" className={styles.label}>
          {t('contact.message')}
        </label>
        <textarea
          id="message"
          name="message"
          className={styles.textarea}
          rows={5}
          value={form.message}
          onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
          required
        />
      </div>
      <Button type="submit" disabled={pending}>
        {t('contact.submit')}
      </Button>
    </form>
  );
}
