import type { FC } from 'react';
import { cn } from '@/shared/lib/cn';
import type { MonoProps } from './Mono.types';
import s from './Mono.module.css';

/** Инлайн-глиф моноширинным шрифтом: стрелки (→ ← ↗ ↓), «+», «·» в кнопках и ссылках. */
export const Mono: FC<MonoProps> = (props) => {
  const { children, className } = props;

  return <span className={cn(s.root, className)}>{children}</span>;
};
