'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import { PricingCard } from '@sw/components/PricingCard';
import { PricingTable } from '@sw/components/PricingTable';
import { formatRub } from '@sw/utils';
import { FEATURED_SITE_PLAN, SITE_PLAN_PRICES } from '@/entities/service';
import { useBrief } from '@/features/brief';
import s from './SitePlans.module.css';

interface SitePlan {
  id: string;
  name: string;
  /** Короткое имя для таблицы сравнения: на телефоне оно в переключателе тарифов. */
  short: string;
  subtitle: string;
  term: string;
  features: string[];
  /** Строка вместо цены: «по запросу». */
  price?: string;
}

interface CompareGroup {
  title: string;
  rows: { label: string; hint?: string; values: (boolean | string)[] }[];
}

/**
 * Тарифы сайтов: три PricingCard и под ними PricingTable со сравнением.
 * «Выбрать» открывает бриф с отмеченным направлением «Сайт».
 */
export const SitePlans: FC = () => {
  const t = useTranslations();
  const { openBrief } = useBrief();

  const plans = t.raw('services.items.sites.plans') as SitePlan[];
  const groups = t.raw('services.items.sites.compare') as CompareGroup[];
  const from = t('common.from');
  const choose = () => openBrief({ services: ['sites'] });

  const priceOf = (plan: SitePlan) => SITE_PLAN_PRICES[plan.id] ?? plan.price ?? '';

  return (
    <div className={s.root}>
      <div className={s.cards}>
        {plans.map((plan) => {
          const featured = plan.id === FEATURED_SITE_PLAN;
          const price = priceOf(plan);

          return (
            <PricingCard
              key={plan.id}
              name={plan.name}
              subtitle={plan.subtitle}
              price={price}
              pricePrefix={typeof price === 'number' ? from : ''}
              term={plan.term}
              termLabel={t('common.term')}
              features={plan.features}
              featured={featured}
              badge={featured ? t('services.plans-featured') : false}
              cta={{ label: t('services.plans-cta'), onClick: choose }}
              className={s.card}
            />
          );
        })}
      </div>

      <PricingTable
        className={s.table}
        plans={plans.map((plan) => {
          const price = priceOf(plan);

          return {
            id: plan.id,
            name: plan.short,
            price: typeof price === 'number' ? `${from} ${formatRub(price)}` : price,
            term: plan.term,
            featured: plan.id === FEATURED_SITE_PLAN,
            cta: { label: t('services.plans-cta'), onClick: choose },
          };
        })}
        groups={groups.map((group, index) => ({
          id: `group-${index}`,
          title: group.title,
          rows: group.rows.map((row) => ({ label: row.label, hint: row.hint, values: row.values })),
        }))}
        labels={{
          caption: t('services.compare-title'),
          yes: t('services.compare-yes'),
          no: t('services.compare-no'),
          pick: t('services.compare-pick'),
          cta: t('services.plans-cta'),
          hint: (label) => t('services.compare-hint', { label }),
        }}
      />
    </div>
  );
};
