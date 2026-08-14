import type { FC } from 'react';
import { cn } from '@/shared/lib/cn';
import type { EyebrowProps } from './Eyebrow.types';
import s from './Eyebrow.module.css';

/** Служебная надпись-рубрика: моношрифт, верхний регистр, разрядка. */
export const Eyebrow: FC<EyebrowProps> = (props) => {
  const { children, tone = 'dim', as: Tag = 'div', className } = props;

  return <Tag className={cn(s.root, s[tone], className)}>{children}</Tag>;
};
