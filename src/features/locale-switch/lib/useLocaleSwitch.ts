'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/i18n-routing';

const LOCALE_COOKIE_MAX_AGE = 31536000;

interface LocaleSwitchApi {
    currentLocale: Locale;
    switchLocale: (locale: Locale) => void;
}

export const useLocaleSwitch = (): LocaleSwitchApi => {
    const currentLocale = useLocale() as Locale;
    const router = useRouter();

    const switchLocale = (locale: Locale) => {
        if (locale === currentLocale) { return; }

        document.cookie = `NEXT_LOCALE=${locale}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`;
        router.refresh();
    };

    return { currentLocale, switchLocale };
};
