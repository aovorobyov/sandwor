'use client';

import type { FC } from 'react';
import { cn } from '@/shared/lib/cn';
import { locales, type Locale } from '@/i18n-routing';
import { useLocaleSwitch } from '../../lib/useLocaleSwitch';
import s from './LocaleSwitch.module.css';

/** Сегментированный переключатель локали RU / EN. */
export const LocaleSwitch: FC = () => {
  const { currentLocale, switchLocale } = useLocaleSwitch();

  const createLocaleHandler = (locale: Locale) => {
    return () => {
      switchLocale(locale);
    };
  };

  return (
    <div className={s.root} role="group" aria-label="Language switcher">
      {locales.map((locale) => {
        const isActive = locale === currentLocale;

        return (
          <button
            key={locale}
            className={cn(s.tab, isActive && s.tabActive)}
            onClick={createLocaleHandler(locale)}
            aria-current={isActive ? 'true' : undefined}
          >
            {locale.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
};
