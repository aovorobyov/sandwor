import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { NAV_LINKS } from '../Header/config';
import s from './Footer.module.css';

const SOCIAL_LINKS = [
    { href: 'https://github.com/aovorobyov', label: 'GitHub' },
    { href: 'https://t.me/sandwor', label: 'Telegram' },
] as const;

export const Footer = async () => {
    const t = await getTranslations();
    const year = new Date().getFullYear();

    return (
        <footer className={s.root}>
            <div className={s.inner}>
                <nav className={s.nav} aria-label="Footer navigation">
                    {NAV_LINKS.map(({ href, labelKey }) => (
                        <Link key={href} href={href} className={s.link}>
                            {t(labelKey)}
                        </Link>
                    ))}
                </nav>

                <div className={s.social}>
                    {SOCIAL_LINKS.map(({ href, label }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={s.link}
                        >
                            {label}
                        </a>
                    ))}
                </div>

                <p className={s.copy}>{t('footer.rights', { year })}</p>
            </div>
        </footer>
    );
};
