import type { FC } from 'react';
import { Link } from '@/shared/ui/Link';
import { cn } from '@/shared/lib/cn';
import type { AsAnchor, AsButton, ButtonProps } from './Button.types';
import s from './Button.module.css';

/** Внутренний маршрут приложения (локале-роутинг + view-transitions), а не якорь/файл/mailto/внешняя ссылка. */
const isInternalHref = (href: string) => {
  return href.startsWith('/') && !href.startsWith('//') && !href.includes('.');
};

export const Button: FC<ButtonProps> = (props) => {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props;
  const cls = cn(s.root, s[variant], s[size], className);

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as AsAnchor;

    if (isInternalHref(href)) {
      return (
        <Link href={href} className={cls} {...anchorRest}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} className={cls} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...(rest as AsButton)}>
      {children}
    </button>
  );
};
