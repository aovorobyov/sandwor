'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/shared/ui/Link';
import { Button } from '@/shared/ui/Button';
import { Mono } from '@/shared/ui/Mono';
import { cn } from '@/shared/lib/cn';
import { NAV_LINKS, SECONDARY_LINKS } from './config';
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
        className={cn(s.burger, isOpen && s.burgerOpen)}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-label={t('header.menu')}
      >
        <span className={cn(s.bar, s.barTop)} />

        <span className={cn(s.bar, s.barBottom)} />
      </button>

      {isOpen && (
        <div className={s.panel}>
          <nav className={s.nav} aria-label="Mobile navigation">
            {NAV_LINKS.map(({ href, labelKey }) => (
              <Link key={href} href={href} className={s.navLink} onClick={handleClose}>
                {t(labelKey)}
              </Link>
            ))}
          </nav>

          <div className={s.chips}>
            {SECONDARY_LINKS.map(({ href, labelKey, isExternal }) =>
              isExternal ? (
                <a key={href} href={href} className={s.chip} onClick={handleClose}>
                  {t(labelKey)}
                </a>
              ) : (
                <Link key={href} href={href} className={s.chip} onClick={handleClose}>
                  {t(labelKey)}
                </Link>
              ),
            )}
          </div>

          <Button href="/contact" variant="primary" className={s.cta} onClick={handleClose}>
            {t('header.cta')}
            <Mono>→</Mono>
          </Button>
        </div>
      )}
    </>
  );
};
