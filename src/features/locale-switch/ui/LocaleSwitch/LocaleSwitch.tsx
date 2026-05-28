'use client';

import type { FC } from 'react';
import { locales, type Locale } from '@/i18n-routing';
import { useLocaleSwitch } from '../../lib/useLocaleSwitch';
import s from './LocaleSwitch.module.css';

export const LocaleSwitch: FC = () => {
    const { currentLocale, switchLocale } = useLocaleSwitch();

    const createLocaleHandler = (locale: Locale) => {
        return () => {
            switchLocale(locale);
        };
    };

    return (
        <nav className={s.root} aria-label="Language switcher">
            {locales.map((locale, idx) => (
                <span key={locale} className={s.item}>
                    {idx > 0 && <span className={s.separator}>|</span>}

                    <button
                        className={locale === currentLocale ? s.active : s.inactive}
                        onClick={createLocaleHandler(locale)}
                        aria-current={locale === currentLocale ? 'true' : undefined}
                    >
                        {locale.toUpperCase()}
                    </button>
                </span>
            ))}
        </nav>
    );
};
