import type { FC } from 'react';
import { Fragment } from 'react';
import { Link } from '@/shared/ui/Link';
import { cn } from '@/shared/lib/cn';
import type { BreadcrumbsProps } from './Breadcrumbs.types';
import s from './Breadcrumbs.module.css';

/** Хлебные крошки моношрифтом: «Главная / Раздел». Промежуточные с href — кликабельны. */
export const Breadcrumbs: FC<BreadcrumbsProps> = (props) => {
  const { items, className } = props;

  return (
    <nav className={cn(s.root, className)} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <Fragment key={`${item.label}-${index}`}>
            {index > 0 && (
              <span className={s.sep} aria-hidden>
                /
              </span>
            )}

            {item.href && !isLast ? (
              <Link href={item.href} className={s.link}>
                {item.label}
              </Link>
            ) : (
              <span className={s.current}>{item.label}</span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
};
