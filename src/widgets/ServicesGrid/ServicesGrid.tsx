import { getLocale, getTranslations } from 'next-intl/server';
import { ServiceCard } from '@sw/components/ServiceCard';
import { cx } from '@sw/utils';
import {
  MONTHLY_SERVICES,
  SERVICE_IDS,
  SERVICE_PRICES,
  getServiceHref,
  type ServiceId,
} from '@/entities/service';
import { formatPrice } from '@/shared/lib/format';
import { localizeHref } from '@/shared/ui/Link';
import s from './ServicesGrid.module.css';

interface ServicesGridProps {
  /** compact — 4 в ряд без состава (главная); default — 2 в ряд с составом. */
  variant?: 'compact' | 'default';
  /** Не показывать направление (на его собственной странице). */
  exclude?: ServiceId;
  headingLevel?: 2 | 3;
}

/** Сетка карточек направлений: ServiceCard дизайн-системы, вся карточка — ссылка. */
export const ServicesGrid = async (props: ServicesGridProps) => {
  const { variant = 'compact', exclude, headingLevel = 3 } = props;
  const locale = await getLocale();
  const t = await getTranslations();

  const ids = SERVICE_IDS.filter((id) => id !== exclude);

  return (
    <div className={cx(s.grid, s[variant], ids.length === 3 && s.three)}>
      {ids.map((id) => {
        const item = `services.items.${id}`;
        const includes = t.raw(`${item}.includes`) as string[];

        return (
          <ServiceCard
            key={id}
            service={id}
            label={t(`service-labels.${id}`)}
            variant={variant}
            title={t(`${item}.title`)}
            text={t(`${item}.text`)}
            includes={includes}
            price={formatPrice(SERVICE_PRICES[id], t('common.from'))}
            priceSuffix={MONTHLY_SERVICES.includes(id) ? t('common.per-month') : undefined}
            term={t.has(`${item}.term`) ? t(`${item}.term`) : undefined}
            termLabel={t('common.term')}
            moreLabel={t('common.more')}
            href={localizeHref(getServiceHref(id), locale)}
            headingLevel={headingLevel}
            className={s.card}
          />
        );
      })}
    </div>
  );
};
