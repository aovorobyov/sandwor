'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { NAV_LINKS } from './config';
import styles from './MobileMenu.module.css';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const t = useTranslations();

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
            <Link key={href} href={href} className={styles.link} onClick={() => setOpen(false)}>
              {t(labelKey)}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
