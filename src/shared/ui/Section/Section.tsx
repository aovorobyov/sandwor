import type { FC } from 'react';
import { cn } from '@/shared/lib/cn';
import type { SectionProps } from './Section.types';
import s from './Section.module.css';

/** Секция страницы: полноширинная подложка + центрированный контейнер 1280px. */
export const Section: FC<SectionProps> = (props) => {
  const { children, tone = 'default', isFlush = false, className, id } = props;

  return (
    <section id={id} className={cn(s.root, tone === 'subtle' && s.subtle)}>
      <div className={cn(isFlush ? s.flush : s.inner, className)}>{children}</div>
    </section>
  );
};
