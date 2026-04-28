'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales, type Locale } from '@/i18n';
import styles from './LocaleSwitch.module.css';

export function LocaleSwitch() {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(locale: Locale) {
    if (locale === currentLocale) return;
    // Replace the current locale segment; fall back to root if pathname is null
    const currentPath = pathname ?? `/${currentLocale}`;
    const newPath = currentPath.replace(`/${currentLocale}`, `/${locale}`);
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
