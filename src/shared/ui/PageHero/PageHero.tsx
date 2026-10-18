import type { FC } from 'react';
import { Breadcrumbs } from '@sw/components/Breadcrumbs';
import { cx } from '@sw/utils';
import type { PageHeroProps } from './PageHero.types';
import s from './PageHero.module.css';

/**
 * Первый экран страницы: крошки, моно-мета, H1, лид и действия. `aside` —
 * иллюстрация или панель справа (схема, факты); на узком экране уходит вниз.
 * `size="l"` — крупный display-1 для главной, по умолчанию display-2.
 */
export const PageHero: FC<PageHeroProps> = (props) => {
  const {
    breadcrumbs,
    breadcrumbsLabel,
    meta,
    title,
    lead,
    actions,
    aside,
    size = 'm',
    className,
    children,
  } = props;

  return (
    <section className={cx(s.root, s[size], aside && s.withAside, className)}>
      <div className="sw-container">
        {breadcrumbs && (
          <Breadcrumbs items={breadcrumbs} label={breadcrumbsLabel} className={s.crumbs} />
        )}

        <div className={s.grid}>
          <div className={s.main}>
            {meta && <div className={s.meta}>{meta}</div>}

            <h1 className={s.title}>{title}</h1>

            {lead && <p className={s.lead}>{lead}</p>}

            {actions && <div className={s.actions}>{actions}</div>}

            {children}
          </div>

          {aside && <div className={s.aside}>{aside}</div>}
        </div>
      </div>
    </section>
  );
};
