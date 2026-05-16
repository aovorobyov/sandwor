import { cn } from '@/shared/lib/cn';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md';

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: React.ReactNode;
};

type AsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type AsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = AsButton | AsAnchor;

export function Button({ variant = 'primary', size = 'md', className, children, ...rest }: ButtonProps) {
  const cls = cn(styles.root, styles[variant], styles[size], className);

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as AsAnchor;
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
}
