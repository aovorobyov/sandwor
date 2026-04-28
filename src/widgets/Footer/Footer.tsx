import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import { NAV_LINKS } from '../Header/config';
import styles from './Footer.module.css';

const SOCIAL_LINKS = [
  { href: 'https://github.com', label: 'GitHub' },
  { href: 'https://t.me',       label: 'Telegram' },
] as const;

export async function Footer() {
  const t = await getTranslations();
  const locale = await getLocale();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.root}>
      <div className={styles.inner}>
        <nav className={styles.nav} aria-label="Footer navigation">
          {NAV_LINKS.map(({ href, labelKey }) => (
            <Link key={href} href={`/${locale}${href}`} className={styles.link}>
              {t(labelKey)}
            </Link>
          ))}
        </nav>

        <div className={styles.social}>
          {SOCIAL_LINKS.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {label}
            </a>
          ))}
        </div>

        <p className={styles.copy}>{t('footer.rights', { year })}</p>
      </div>
    </footer>
  );
}
