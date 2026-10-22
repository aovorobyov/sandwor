'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Calculator } from '@sw/components/Calculator';
import type { CalculatorService } from '@sw/components/Calculator';
import { formatNumber } from '@sw/utils';
import {
  CALCULATOR_INTEGRATIONS,
  CALCULATOR_PRICES,
  CALCULATOR_TERM_DAYS,
  SERVICE_IDS,
} from '@/entities/service';
import { useBrief } from '@/features/brief';

interface PriceCalculatorProps {
  /** Услуги, отмеченные при первом рендере; по умолчанию — CRM. */
  services?: CalculatorService[];
}

/**
 * Калькулятор дизайн-системы с ценами студии. «Обсудить расчёт» открывает бриф
 * с уже отмеченными услугами — клиенту не нужно выбирать их второй раз.
 */
export const PriceCalculator: FC<PriceCalculatorProps> = ({ services }) => {
  const t = useTranslations('calculator');
  const { openBrief } = useBrief();

  return (
    <Calculator
      defaultValue={services ? { services } : undefined}
      prices={CALCULATOR_PRICES}
      integrations={CALCULATOR_INTEGRATIONS.map((item) => ({
        ...item,
        label: t(`integration-labels.${item.value}`),
      }))}
      terms={Object.fromEntries(
        SERVICE_IDS.map((id) => [id, { text: t(`terms.${id}`), days: CALCULATOR_TERM_DAYS[id] }]),
      )}
      onCta={(_estimate, value) => openBrief({ placement: 'calculator', services: value.services })}
      copy={{
        services: t('services'),
        servicesHint: t('services-hint'),
        managers: t('managers'),
        integrations: t('integrations'),
        months: t('months'),
        caption: t('caption'),
        from: t('from'),
        term: t('term'),
        cta: t('cta'),
        note: t('note'),
        empty: t('empty'),
        emptyTotal: t('empty-total'),
        lines: {
          crm: t('lines.crm'),
          sites: t('lines.sites'),
          smm: t('lines.smm'),
          ai: t('lines.ai'),
        },
        serviceLabels: { sites: t('chips.sites'), ai: t('chips.ai') },
        managersText: (count) => t('managers-count', { count }),
        monthsText: (count) => t('months-count', { count: Number(count) }),
        managersHint: (included, perManager) =>
          t('managers-hint', { included, price: formatNumber(perManager) }),
        perMonth: (price) => t('per-month', { price: formatNumber(price) }),
      }}
    />
  );
};
