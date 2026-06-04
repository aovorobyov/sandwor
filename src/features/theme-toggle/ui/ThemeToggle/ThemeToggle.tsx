'use client';

import type { FC } from 'react';
import { useTheme } from 'next-themes';
import { DotIcon } from '@/shared/ui';
import s from './ThemeToggle.module.css';

export const ThemeToggle: FC = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button className={s.root} onClick={handleThemeToggle} aria-label="Toggle theme">
      {/* Обе иконки в разметке: видимую выбирает CSS по [data-theme] — без скелетона и мигания после гидрации */}
      <DotIcon name="dark" className={s.iconDark} />

      <DotIcon name="light" className={s.iconLight} />
    </button>
  );
};
