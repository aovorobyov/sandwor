import type { FC } from 'react';
import { Link } from '@/shared/ui/Link';
import { cn } from '@/shared/lib/cn';
import type { CardProps } from './Card.types';
import s from './Card.module.css';

export const Card: FC<CardProps> = (props) => {
  const { children, href, className } = props;
  const cls = cn(s.root, href && s.clickable, className);

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return <div className={cls}>{children}</div>;
};
