'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from './Button.jsx';
import { Logo } from './Logo.jsx';
import { Tooltip } from './Tooltip.jsx';
import { MobileMenu } from './MobileMenu.jsx';
import { cx } from '../utils.js';

/**
 * The site's top bar: logo, section links, one primary action. Transparent over the
 * first screen; `scrolled` gives it a solid `bg`, a 12px backdrop blur and a hairline.
 * Leave `scrolled` undefined to track window scroll. Below 880px of its own width the
 * links fold into a burger that opens MobileMenu.
 */
export function SiteHeader({
  nav = [],
  cta,
  secondary,
  sticky = true,
  scrolled: scrolledProp,
  contained = false,
  logoHref = '/',
  menu,
  menuOpen: menuOpenProp,
  defaultMenuOpen = false,
  onMenuOpen,
  onMenuOpenChange,
  navLabel = 'Основная навигация',
  menuLabel = 'Открыть меню',
  className,
  ...rest
}) {
  const rootRef = useRef(null);
  const controlled = menuOpenProp !== undefined;
  const [innerOpen, setInnerOpen] = useState(defaultMenuOpen);
  const open = Boolean(controlled ? menuOpenProp : innerOpen);

  const auto = scrolledProp === undefined;
  const [autoScrolled, setAutoScrolled] = useState(false);
  useEffect(() => {
    if (!auto || contained || !sticky) return undefined;
    const onScroll = () => setAutoScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [auto, contained, sticky]);
  const scrolled = auto ? autoScrolled : Boolean(scrolledProp);

  const setOpen = (next) => {
    if (!controlled) setInnerOpen(next);
    if (onMenuOpenChange) onMenuOpenChange(next);
    if (next && onMenuOpen) onMenuOpen();
  };
  const closeMenu = () => {
    setOpen(false);
    // If the menu had nothing to hand focus back to, land on the burger.
    requestAnimationFrame(() => {
      const a = document.activeElement;
      const burger = rootRef.current && rootRef.current.querySelector('.sw-header__burger');
      if ((!a || a === document.body) && burger) burger.focus({ preventScroll: true });
    });
  };

  const hasNav = nav.length > 0;
  const menuProps = menu || {};

  return (
    <>
      <header
        ref={rootRef}
        className={cx('sw-header', sticky && 'sw-header--sticky', scrolled && 'is-scrolled', className)}
        {...rest}
      >
        <div className="sw-header__inner">
          <Logo size={18} href={logoHref} className="sw-header__logo" />

          {hasNav && (
            <nav className="sw-header__nav" aria-label={navLabel}>
              <ul className="sw-header__list">
                {nav.map((item) => (
                  <li key={item.href || item.label}>
                    <a
                      href={item.href}
                      onClick={item.onClick}
                      className={cx('sw-header__link', item.active && 'is-active', item.className)}
                      aria-current={item.active ? 'page' : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="sw-header__actions">
            {secondary && (
              <Tooltip content={secondary.label} type="label" placement="bottom" className="sw-header__secondary">
                <Button
                  variant="quiet"
                  size="s"
                  iconOnly
                  icon={secondary.icon}
                  href={secondary.href}
                  target={secondary.target}
                  rel={secondary.rel}
                  onClick={secondary.onClick}
                />
              </Tooltip>
            )}
            {cta && (
              <Button size="s" href={cta.href} onClick={cta.onClick} className="sw-header__cta">
                {cta.label}
              </Button>
            )}
            {hasNav && (
              <Button
                variant="quiet"
                iconOnly
                icon="menu-2"
                aria-label={menuLabel}
                aria-haspopup="dialog"
                aria-expanded={open}
                onClick={() => setOpen(true)}
                className="sw-header__burger"
              />
            )}
          </div>
        </div>
      </header>
      {hasNav && (
        <MobileMenu
          open={open}
          onClose={closeMenu}
          nav={nav}
          cta={menuProps.cta !== undefined ? menuProps.cta : cta}
          services={menuProps.services}
          servicesTitle={menuProps.servicesTitle}
          contacts={menuProps.contacts}
          logoHref={logoHref}
          contained={contained}
          closeLabel={menuProps.closeLabel}
          navLabel={menuProps.navLabel}
          aria-label={menuProps.label}
        />
      )}
    </>
  );
}
