'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import s from './ThemeToggle.module.css';

export const ThemeToggle: FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  /** Предотвращает расхождение гидрации: скелетон до монтирования на клиенте */
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <span className={s.skeleton} aria-hidden />;
  }

  const isDark = resolvedTheme === 'dark';
  const iconUrl = isDark ? '/img/light.svg' : '/img/dark.svg';

  const handleThemeToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      className={s.root}
      onClick={handleThemeToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span
        className={s.icon}
        style={{
          maskImage: `url(${iconUrl})`,
          WebkitMaskImage: `url(${iconUrl})`,
        }}
      />
    </button>
  );
};
