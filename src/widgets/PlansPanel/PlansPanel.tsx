import { getTranslations } from 'next-intl/server';
import { Icon } from '@sw/components/Icon';
import { FEATURED_SITE_PLAN, SITE_PLAN_PRICES } from '@/entities/service';
import { formatPrice } from '@/shared/lib/format';
import s from './PlansPanel.module.css';

interface PlanRow {
  id: string;
  name: string;
  subtitle: string;
  term: string;
  price?: string;
}

interface PlansPanelProps {
  /** Куда ведёт «Сравнить тарифы»: якорь на этой странице или страница сайтов. */
  href: string;
}

/**
 * Панель цен справа на первом экране страниц услуг: три тарифа сайтов
 * одним взглядом. Цены — из `entities/service`, названия и сроки — из переводов.
 */
export const PlansPanel = async ({ href }: PlansPanelProps) => {
  const t = await getTranslations();
  const plans = t.raw('services.items.sites.plans') as PlanRow[];

  return (
    <aside className={s.root} aria-labelledby="plans-panel-title">
      <p id="plans-panel-title" className={s.head}>
        {t('services.plans-panel')}
      </p>

      <ul className={s.list}>
        {plans.map((plan) => {
          const price = SITE_PLAN_PRICES[plan.id];

          return (
            <li
              key={plan.id}
              className={plan.id === FEATURED_SITE_PLAN ? `${s.row} ${s.featured}` : s.row}
            >
              <span className={s.info}>
                <span className={s.name}>{plan.name}</span>
                <span className={s.sub}>
                  {plan.subtitle} · {plan.term}
                </span>
              </span>

              <span className={s.price}>
                {price ? formatPrice(price, t('common.from')) : plan.price}
              </span>
            </li>
          );
        })}
      </ul>

      <a href={href} className={s.link}>
        {t('services.plans-compare')}
        <Icon name="arrow-right" size={16} />
      </a>
    </aside>
  );
};
