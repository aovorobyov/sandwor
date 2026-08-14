import { getTranslations } from 'next-intl/server';
import { Link } from '@/shared/ui/Link';
import { Button } from '@/shared/ui/Button';
import { LocaleSwitch } from '@/features/locale-switch';
import { NAV_LINKS } from './config';
import { MobileMenu } from './MobileMenu';
import { ReadingProgress } from './ReadingProgress';
import { LogoLink } from './LogoLink';
import s from './Header.module.css';

export const Header = async () => {
  const t = await getTranslations();

  return (
    <header className={s.root}>
      <div className={s.inner}>
        <LogoLink />

        <div className={s.desktop}>
          <nav className={s.nav} aria-label="Main navigation">
            {NAV_LINKS.map(({ href, labelKey }) => (
              <Link key={href} href={href} className={s.navLink}>
                {t(labelKey)}
              </Link>
            ))}
          </nav>

          <div className={s.actions}>
            <LocaleSwitch />

            <Button href="/contact" variant="primary" className={s.cta}>
              {t('header.cta')}
            </Button>
          </div>
        </div>

        <div className={s.mobile}>
          <LocaleSwitch />

          <MobileMenu />
        </div>
      </div>

      <ReadingProgress />
    </header>
  );
};
