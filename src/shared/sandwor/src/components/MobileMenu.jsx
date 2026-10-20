'use client';
import React, { useEffect, useId, useRef } from 'react';
import { Button } from './Button.jsx';
import { Icon } from './Icon.jsx';
import { Logo } from './Logo.jsx';
import { cx, SERVICES } from '../utils.js';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function toService(s) {
  const item = typeof s === 'string' ? { id: s } : s;
  const base = SERVICES[item.id] || {};
  return { ...item, label: item.label || base.label || item.id, icon: item.icon || base.icon };
}

/**
 * Full-screen site navigation for phones (a top sheet over the scrim on tablets).
 * Controlled: render with `open`, close with `onClose`. Traps focus, closes on Esc
 * and on a scrim tap, returns focus to where it was, locks body scroll unless `contained`.
 */
export function MobileMenu({
  open = false,
  onClose,
  nav = [],
  services,
  servicesTitle = 'Услуги',
  cta,
  contacts,
  logoHref = '/',
  contained = false,
  underHeader = false,
  closeOnNavigate = true,
  onNavigate,
  closeLabel = 'Закрыть меню',
  navLabel = 'Разделы сайта',
  'aria-label': ariaLabel = 'Меню',
  className,
  ...rest
}) {
  const panelRef = useRef(null);
  const mounted = useRef(false);
  const captionId = `sw-mmenu-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  // Move focus into the dialog and give it back on close. A contained menu that is
  // open from the first render (a static preview) does not steal focus on load.
  useEffect(() => {
    const first = !mounted.current;
    mounted.current = true;
    if (!open || (contained && first)) return undefined;
    const prev = document.activeElement;
    if (panelRef.current) panelRef.current.focus({ preventScroll: true });
    return () => {
      if (prev && prev !== document.body && typeof prev.focus === 'function' && document.contains(prev)) {
        prev.focus({ preventScroll: true });
      }
    };
  }, [open, contained]);

  useEffect(() => {
    if (!open || contained) return undefined;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    body.style.overflow = 'hidden';
    return () => {
      body.style.overflow = prevOverflow;
    };
  }, [open, contained]);

  if (!open) return null;

  const close = () => {
    if (onClose) onClose();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      close();
      return;
    }
    if (e.key !== 'Tab' || !panelRef.current) return;
    const items = Array.from(panelRef.current.querySelectorAll(FOCUSABLE)).filter((el) => el.getClientRects().length > 0);
    if (!items.length) {
      e.preventDefault();
      return;
    }
    const firstEl = items[0];
    const lastEl = items[items.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === firstEl || active === panelRef.current)) {
      e.preventDefault();
      lastEl.focus();
    } else if (!e.shiftKey && (active === lastEl || !panelRef.current.contains(active))) {
      e.preventDefault();
      firstEl.focus();
    }
  };

  const follow = (item) => (e) => {
    if (item.onClick) item.onClick(e);
    if (onNavigate) onNavigate(item, e);
    if (closeOnNavigate && !e.defaultPrevented) close();
  };

  const rows = services && services.length ? services.map(toService) : null;

  return (
    <div className={cx('sw-mmenu', contained && 'sw-mmenu--contained', underHeader && 'sw-mmenu--under-header', className)} {...rest}>
      <div className="sw-mmenu__scrim" aria-hidden="true" onClick={close} />
      <div
        ref={panelRef}
        className="sw-mmenu__panel"
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        onKeyDown={onKeyDown}
      >
        <div className="sw-mmenu__bar">
          <Logo size={18} href={logoHref} />
          <Button variant="quiet" iconOnly icon="x" aria-label={closeLabel} onClick={close} className="sw-mmenu__close" />
        </div>

        <div className="sw-mmenu__body">
          {nav.length > 0 && (
            <nav aria-label={navLabel}>
              <ul className="sw-mmenu__nav">
                {nav.map((item) => (
                  <li key={item.href || item.label} className="sw-mmenu__item">
                    <a
                      href={item.href}
                      className={cx('sw-mmenu__link', item.active && 'is-active', item.className)}
                      aria-current={item.active ? 'page' : undefined}
                      onClick={follow(item)}
                    >
                      <span>{item.label}</span>
                      <Icon name="chevron-right" size={20} className="sw-mmenu__chevron" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {rows && (
            <section className="sw-mmenu__group" aria-labelledby={captionId}>
              <p id={captionId} className="sw-mmenu__caption">{servicesTitle}</p>
              <ul className="sw-mmenu__services">
                {rows.map((s) => {
                  const inner = (
                    <>
                      <span className="sw-mmenu__tile" aria-hidden="true">
                        {s.icon && <Icon name={s.icon} size={16} />}
                      </span>
                      <span className="sw-mmenu__service-label">{s.label}</span>
                      {s.badge && <span className="sw-mmenu__badge">{s.badge}</span>}
                    </>
                  );
                  return (
                    <li key={s.id}>
                      {s.href ? (
                        <a href={s.href} className={cx('sw-mmenu__service', s.className)} onClick={follow(s)}>
                          {inner}
                        </a>
                      ) : (
                        <span className={cx('sw-mmenu__service', s.className)}>{inner}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>

        {(cta || (contacts && contacts.length > 0)) && (
          <div className="sw-mmenu__foot">
            {cta && (
              <Button size="l" block href={cta.href} onClick={cta.onClick} icon={cta.icon} iconEnd={cta.iconEnd}>
                {cta.label}
              </Button>
            )}
            {contacts && contacts.length > 0 && (
              <dl className="sw-mmenu__contacts">
                {contacts.map((c) => (
                  <div key={c.label} className="sw-mmenu__contact">
                    <dt className="sw-mmenu__contact-label">{c.label}</dt>
                    <dd className="sw-mmenu__contact-value">
                      {c.href ? (
                        <a href={c.href} className="sw-mmenu__contact-link">
                          {c.value}
                        </a>
                      ) : (
                        c.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
