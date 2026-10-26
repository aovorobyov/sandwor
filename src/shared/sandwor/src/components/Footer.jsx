import React, { isValidElement, useId } from 'react';
import { Button } from './Button.jsx';
import { Canvas } from './Canvas.jsx';
import { Logo } from './Logo.jsx';
import { Tooltip } from './Tooltip.jsx';
import { cx } from '../utils.js';

/**
 * Site footer: optional calm CTA band (a panel on the dot-grid canvas), brand block
 * with tagline and socials, up to three link columns (the last one can be contacts),
 * and a legal row under a hairline.
 */
export function Footer({
  columns = [],
  contacts,
  contactsTitle = 'Связаться',
  socials,
  tagline,
  legal,
  legalLinks,
  cta,
  logoHref = '/',
  className,
  ...rest
}) {
  const uid = `sw-footer-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const year = 2026;
  const action = cta && cta.action;
  return (
    <footer className={cx('sw-footer', className)} {...rest}>
      <div className="sw-footer__inner">
        {cta && (
          <Canvas className="sw-footer__band">
            <div className="sw-footer__panel">
              <div className="sw-footer__panel-copy">
                <h2 className="sw-footer__panel-title">{cta.title}</h2>
                {cta.text && <p className="sw-footer__panel-text">{cta.text}</p>}
              </div>
              {action && (
                <div className="sw-footer__panel-action">
                  {isValidElement(action) ? (
                    action
                  ) : (
                    <Button size="l" href={action.href} onClick={action.onClick} iconEnd={action.iconEnd}>
                      {action.label}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Canvas>
        )}

        <div className="sw-footer__main">
          <div className="sw-footer__brand">
            <Logo size={24} href={logoHref} studio />
            {tagline && <p className="sw-footer__tagline">{tagline}</p>}
            {socials && socials.length > 0 && (
              <ul className="sw-footer__socials">
                {socials.map((s) => (
                  <li key={s.label}>
                    <Tooltip content={s.label} type="label" className="sw-footer__social">
                      <Button
                        variant="secondary"
                        size="s"
                        iconOnly
                        icon={s.icon}
                        href={s.href}
                        target={s.target}
                        rel={s.rel}
                        className={s.className}
                      />
                    </Tooltip>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="sw-footer__cols">
            {columns.map((col, i) => {
              const id = `${uid}-col-${i}`;
              return (
                <nav key={col.title} className="sw-footer__col" aria-labelledby={id}>
                  <h2 id={id} className="sw-footer__title">{col.title}</h2>
                  <ul className="sw-footer__links">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <a href={l.href} className={cx('sw-footer__link', l.className)}>
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              );
            })}
            {contacts && contacts.length > 0 && (
              <div className="sw-footer__col">
                <h2 className="sw-footer__title">{contactsTitle}</h2>
                <ul className="sw-footer__contacts">
                  {contacts.map((c) => (
                    <li key={c.label} className="sw-footer__contact">
                      <span className="sw-footer__contact-label">{c.label}</span>
                      {c.href ? (
                        <a href={c.href} className="sw-footer__contact-value sw-footer__contact-value--link">
                          {c.value}
                        </a>
                      ) : (
                        <span className="sw-footer__contact-value">{c.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="sw-footer__bottom">
          <p className="sw-footer__legal">{legal != null ? legal : `© ${year} sandwor`}</p>
          {legalLinks && legalLinks.length > 0 && (
            <ul className="sw-footer__legal-links">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  {/* [sandwor.ru] hrefLang / lang / aria-label — для ссылки на другой язык */}
                  <a
                    href={l.href}
                    hrefLang={l.hrefLang}
                    lang={l.lang}
                    aria-label={l.ariaLabel}
                    className="sw-footer__legal-link"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
