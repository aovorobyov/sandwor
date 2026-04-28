import Link from 'next/link';
import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { defaultLocale } from '@/i18n-routing';
import { ThemeToggle } from '@/features/theme-toggle';
import { LocaleSwitch } from '@/features/locale-switch';
import { NAV_LINKS } from './config';
import { MobileMenu } from './MobileMenu';
import styles from './Header.module.css';

export async function Header() {
  const t = await getTranslations();
  const locale = await getLocale();
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <Link href={localePrefix || '/'} className={styles.logo}>
          <Image src="/img/logo.svg" alt="sandwor" width={112} height={24} className={styles.logoImage} />
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map(({ href, labelKey }) => (
            <Link key={href} href={`${localePrefix}${href}` || '/'} className={styles.navLink}>
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
