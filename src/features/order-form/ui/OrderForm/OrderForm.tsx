'use client';

import type { ChangeEvent, FC, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/Textarea';
import { FormSuccess } from '@/shared/ui/FormSuccess';
import { useOrderForm } from './useOrderForm';
import s from './OrderForm.module.css';

export const OrderForm: FC = () => {
  const t = useTranslations();
  const { form, status, change, submit, reset } = useOrderForm();

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

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    change('phone', e.target.value);
  };

  const handleTelegramChange = (e: ChangeEvent<HTMLInputElement>) => {
    change('telegram', e.target.value);
  };

  const handleTaskChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    change('task', e.target.value);
  };

  if (status === 'success') {
    return (
      <FormSuccess text={t('order.success')} actionLabel={t('order.again')} onReset={handleReset} />
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
        label={t('order.name')}
        name="name"
        value={form.name}
        onChange={handleNameChange}
        autoComplete="name"
        required
      />

      <Input
        label={t('order.phone')}
        name="phone"
        type="tel"
        value={form.phone}
        onChange={handlePhoneChange}
        autoComplete="tel"
        required
      />

      <Input
        label={t('order.telegram')}
        name="telegram"
        value={form.telegram}
        onChange={handleTelegramChange}
        placeholder="@username"
      />

      <Textarea
        label={t('order.task')}
        name="task"
        rows={4}
        value={form.task}
        onChange={handleTaskChange}
        required
      />

      {status === 'error' && <p className={s.error}>{t('order.error')}</p>}

      <Button type="submit" className={s.submit} disabled={isPending}>
        {isPending ? t('order.sending') : t('order.submit')}
      </Button>
    </form>
  );
};
