'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { locales, type Locale } from '@/i18n-routing';
import styles from './LocaleSwitch.module.css';

export function LocaleSwitch() {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();

  function switchLocale(locale: Locale) {
    if (locale === currentLocale) return;
    document.cookie = `NEXT_LOCALE=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    router.refresh();
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
