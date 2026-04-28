'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { defaultLocale, locales, type Locale } from '@/i18n-routing';
import styles from './LocaleSwitch.module.css';

export function LocaleSwitch() {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(locale: Locale) {
    if (locale === currentLocale) return;
    const currentPath = pathname ?? '/';
    const isDefaultTarget = locale === defaultLocale;

    if (currentPath === '/') {
      router.push(isDefaultTarget ? '/' : `/${locale}`);
      return;
    }

    const segments = currentPath.split('/').filter(Boolean);
    const firstSegment = segments[0] as Locale | undefined;
    const hasLocalePrefix = locales.includes(firstSegment as Locale);

    if (hasLocalePrefix) {
      const restSegments = segments.slice(1);
      const newPath = isDefaultTarget
        ? `/${restSegments.join('/')}`
        : `/${[locale, ...restSegments].join('/')}`;

      router.push(newPath === '/' ? '/' : newPath.replace(/\/$/, ''));
      return;
    }

    const newPath = isDefaultTarget ? currentPath : `/${[locale, ...segments].join('/')}`;

    router.push(newPath);
  }

  return (
    <nav className={styles.root} aria-label="Language switcher">
      {locales.map((locale, idx) => (
        <span key={locale} className={styles.item}>
          {idx > 0 && <span className={styles.separator}>|</span>}
          <button
            className={locale === currentLocale ? styles.active : styles.inactive}
            onClick={() => switchLocale(locale)}
            aria-current={locale === currentLocale ? 'true' : undefined}
          >
            {locale.toUpperCase()}
          </button>
        </span>
      ))}
    </nav>
  );
}
