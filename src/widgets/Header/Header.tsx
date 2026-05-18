import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ThemeToggle } from '@/features/theme-toggle';
import { LocaleSwitch } from '@/features/locale-switch';
import { NAV_LINKS } from './config';
import { MobileMenu } from './MobileMenu';
import { LogoLink } from './LogoLink';
import s from './Header.module.css';

export const Header = async () => {
    const t = await getTranslations();

    return (
        <header className={s.root}>
            <div className={s.inner}>
                <LogoLink />

                <nav className={s.nav} aria-label="Main navigation">
                    {NAV_LINKS.map(({ href, labelKey }) => (
                        <Link key={href} href={href} className={s.navLink}>
                            {t(labelKey)}
                        </Link>
                    ))}
                </nav>

                <div className={s.controls}>
                    <span className={s.controlGap}><ThemeToggle /></span>
                    <LocaleSwitch />
                </div>

                {/* Бургер только для мобильных, скрыт на десктопе через CSS */}
                <div className={s.mobileControls}>
                    <span className={s.controlGap}><ThemeToggle /></span>
                    <span className={s.controlGap}><LocaleSwitch /></span>
                    <MobileMenu />
                </div>
            </div>
        </header>
    );
};
