import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import { ThemeToggle } from '@/features/theme-toggle';
import { LocaleSwitch } from '@/features/locale-switch';
import { NAV_LINKS } from './config';
import { MobileMenu } from './MobileMenu';
import styles from './Header.module.css';

export async function Header() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <Link href={`/${locale}`} className={styles.logo}>
          sandwor.space
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map(({ href, labelKey }) => (
            <Link key={href} href={`/${locale}${href}`} className={styles.navLink}>
              {t(labelKey)}
            </Link>
          ))}
        </nav>

        <div className={styles.controls}>
          <ThemeToggle />
          <LocaleSwitch />
        </div>

        {/* Mobile-only burger, hidden on desktop via CSS */}
        <div className={styles.mobileControls}>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
