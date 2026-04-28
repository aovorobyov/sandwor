'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { defaultLocale } from '@/i18n-routing';
import { NAV_LINKS } from './config';
import styles from './MobileMenu.module.css';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;

  return (
    <>
      <button
        className={styles.toggle}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Toggle navigation"
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      {open && (
        <nav className={styles.menu} aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, labelKey }: (typeof NAV_LINKS)[number]) => (
            <Link
              key={href}
              href={`${localePrefix}${href}` || '/'}
              className={styles.link}
              onClick={() => setOpen(false)}
            >
              {t(labelKey)}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
