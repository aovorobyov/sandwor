'use client';

import type { FC } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { NAV_LINKS } from './config';
import s from './MobileMenu.module.css';

export const MobileMenu: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations();

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button
                className={s.toggle}
                onClick={handleToggle}
                aria-expanded={isOpen}
                aria-label="Toggle navigation"
            >
                <span className={s.bar} />
                <span className={s.bar} />
                <span className={s.bar} />
            </button>

            {isOpen && (
                <nav className={s.menu} aria-label="Mobile navigation">
                    {NAV_LINKS.map(({ href, labelKey }: (typeof NAV_LINKS)[number]) => (
                        <Link key={href} href={href} className={s.link} onClick={handleClose}>
                            {t(labelKey)}
                        </Link>
                    ))}
                </nav>
            )}
        </>
    );
};
