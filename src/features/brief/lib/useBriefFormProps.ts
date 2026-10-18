'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import type { BriefFormProps } from '@sw/components/BriefForm';
import { SERVICE_IDS } from '@/entities/service';
import { reachGoal, YM_GOAL } from '@/shared/lib/analytics';
import { sendBrief } from '../api/sendBrief';

const TEAM_SIZES = ['1-5', '6-20', '20+'] as const;
const BUDGETS = ['lt100', '100-300', 'gt300', 'unknown'] as const;
const PHONE_DIGITS = 10;

type BriefFormBaseProps = Pick<
  BriefFormProps,
  'copy' | 'services' | 'teamOptions' | 'budgetOptions' | 'onSubmit'
>;

/**
 * Тексты, варианты и отправка брифа — общие для модального окна и страницы контактов.
 * Время заполнения считается от первого рендера формы: по нему сервер отсекает ботов.
 */
export const useBriefFormProps = (): BriefFormBaseProps => {
  const t = useTranslations('brief');
  const startedAt = useRef(Date.now());

  const onSubmit: BriefFormProps['onSubmit'] = async (values) => {
    await sendBrief(values, Date.now() - startedAt.current);
    reachGoal(YM_GOAL.orderWebsites);
  };

  return {
    onSubmit,
    services: SERVICE_IDS.map((id) => ({ value: id, service: id, label: t(`options.${id}`) })),
    teamOptions: TEAM_SIZES.map((value) => ({ value, label: t(`options.team.${value}`) })),
    budgetOptions: BUDGETS.map((value) => ({ value, label: t(`options.budget.${value}`) })),
    copy: {
      steps: [t('steps.0'), t('steps.1'), t('steps.2'), t('steps.3')],
      stepOf: (n, total) => t('step-of', { n, total }),
      stepsLabel: t('steps-label'),
      stepDone: t('step-done'),
      servicesHint: t('services-hint'),
      company: t('company'),
      companyPlaceholder: t('company-placeholder'),
      teamSize: t('team-size'),
      task: t('task'),
      taskPlaceholder: t('task-placeholder'),
      budget: t('budget'),
      name: t('name'),
      namePlaceholder: t('name-placeholder'),
      contact: t('contact'),
      contactPlaceholder: t('contact-placeholder'),
      telegram: t('telegram'),
      back: t('back'),
      next: t('next'),
      submit: t('submit'),
      sending: t('sending'),
      fine: t('fine'),
      errServices: t('err-services'),
      errName: t('err-name'),
      errContact: t('err-contact'),
      errSubmit: t('err-submit'),
      successTitle: t('success-title'),
      successText: (values) => {
        const name = values.name.trim();
        // Ник вместо телефона — тоже Telegram, даже без отметки «Удобнее в Telegram».
        const isPhone = values.contact.replace(/\D/g, '').length >= PHONE_DIGITS;

        return values.telegram || !isPhone
          ? t('success-telegram', { name })
          : t('success-phone', { name });
      },
      successAction: t('success-action'),
    },
  };
};
