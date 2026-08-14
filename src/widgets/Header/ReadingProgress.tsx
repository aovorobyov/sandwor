'use client';

import type { FC } from 'react';
import { usePathname } from 'next/navigation';
import s from './ReadingProgress.module.css';

/** Путь статьи — `/blog/<slug>` (с возможным префиксом локали), но не список `/blog`. */
const isArticlePath = (pathname: string) => {
  const withoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/)/, '');

  return /^\/blog\/[^/]+/.test(withoutLocale);
};

/** Прогресс чтения статьи: заполнение считается через scroll-driven анимацию, без JS. */
export const ReadingProgress: FC = () => {
  const pathname = usePathname();

  if (!isArticlePath(pathname)) {
    return null;
  }

  return (
    <div className={s.track} aria-hidden>
      <div className={s.fill} />
    </div>
  );
};
