import Link from 'next/link';
import { cn } from '@/shared/lib/cn';
import styles from './Card.module.css';

export interface CardProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export function Card({ children, href, className }: CardProps) {
  const cls = cn(styles.root, href && styles.clickable, className);

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return <div className={cls}>{children}</div>;
}
