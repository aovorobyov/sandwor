import { cn } from '@/shared/lib/cn';
import styles from './Badge.module.css';

export type BadgeVariant = 'neutral' | 'accent';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  return (
    <span className={cn(styles.root, styles[variant], className)}>
      {children}
    </span>
  );
}
