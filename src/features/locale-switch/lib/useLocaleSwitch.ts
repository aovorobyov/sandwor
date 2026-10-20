'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { defaultLocale, type Locale } from '@/i18n-routing';
import { delocalizePath } from '@/shared/ui/Link';

interface LocaleSwitchApi {
  currentLocale: Locale;
  switchLocale: (locale: Locale) => void;
}

/** Собирает путь для целевой локали: дефолтная — без префикса, остальные — с /{locale}. */
export const buildLocalePath = (pathname: string, from: Locale, to: Locale) => {
  const base = delocalizePath(pathname, from);

  if (to === defaultLocale) {
    return base;
  }

  return base === '/' ? `/${to}` : `/${to}${base}`;
};

export const useLocaleSwitch = (): LocaleSwitchApi => {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (locale: Locale) => {
    if (locale === currentLocale) {
      return;
    }

    // В режиме `as-needed` локаль задаётся URL'ом, поэтому переключение — это навигация:
    // на EN уводим на `/en/<путь>`, обратно на RU — снимаем префикс.
    router.push(buildLocalePath(pathname, currentLocale, locale));
  };

  return { currentLocale, switchLocale };
};
