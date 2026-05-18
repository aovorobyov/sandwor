'use client';

import type { FC } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { locales, type Locale } from '@/i18n-routing';
import s from './LocaleSwitch.module.css';

export const LocaleSwitch: FC = () => {
    const currentLocale = useLocale() as Locale;
    const router = useRouter();

    const switchLocale = (locale: Locale) => {
        if (locale === currentLocale) return;
        document.cookie = `NEXT_LOCALE=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
        router.refresh();
    };

    const createLocaleHandler = (locale: Locale) => {
        return () => switchLocale(locale);
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
