'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { Link } from '@/shared/ui/Link';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/cn';
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
        className={cn(s.toggle, isOpen && s.toggleOpen)}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
      >
        <span className={cn(s.bar, s.barTop, isOpen && s.barTopOpen)} />

        <span className={cn(s.bar, s.barMiddle, isOpen && s.barMiddleOpen)} />

        <span className={cn(s.bar, s.barBottom, isOpen && s.barBottomOpen)} />
      </button>

      {isOpen && (
        <nav className={s.menu} aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, labelKey, isDisabled }) => {
            if (isDisabled) {
              return (
                <span key={href} className={cn(s.link, s.linkDisabled)} aria-disabled="true">
                  {t(labelKey)}
                </span>
              );
            }

            return (
              <Link key={href} href={href} className={s.link} onClick={handleClose}>
                {t(labelKey)}
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
};
