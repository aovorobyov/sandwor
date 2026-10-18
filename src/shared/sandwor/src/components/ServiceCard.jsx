import React from 'react';
import { Icon } from './Icon.jsx';
import { cx, SERVICES, formatRub } from '../utils.js';

/**
 * A service line: icon tile + service label, title, one-line pitch, what's included,
 * price and term. With `href` the whole card is clickable: the title is the link and
 * its ::after covers the card (a «stretched link»), so screen readers hear a short
 * link name and the rest reads as plain text. No buttons inside a clickable card —
 * «Подробнее» is a span dressed as the ghost button.
 */
export function ServiceCard({
  service,
  label,
  badge,
  title,
  text,
  includes,
  price,
  priceSuffix,
  term,
  href,
  variant = 'default',
  moreLabel = 'Подробнее',
  termLabel = 'Срок',
  headingLevel = 3,
  linkAs,
  linkProps,
  className,
  ...rest
}) {
  const svc = SERVICES[service];
  const compact = variant === 'compact';
  const list = !compact && Array.isArray(includes) ? includes.filter(Boolean) : [];
  const Heading = `h${Math.min(6, Math.max(2, headingLevel))}`;
  const Link = linkAs || 'a';
  const priceText = typeof price === 'number' ? `от ${formatRub(price)}` : price;
  const hasMeta = priceText != null || term != null;

  return (
    <article
      className={cx(
        'sw-service-card',
        `sw-service-card--${compact ? 'compact' : 'default'}`,
        href && 'sw-service-card--link',
        list.length === 0 && 'sw-service-card--bare',
        className,
      )}
      {...rest}
    >
      <div className="sw-service-card__top">
        {svc && (
          <span className="sw-service-card__tile" aria-hidden="true">
            <Icon name={svc.icon} size={20} />
          </span>
        )}
        {svc && <span className="sw-service-card__service">{label || svc.label}</span>}
        {badge && <span className="sw-service-card__badge">{badge}</span>}
      </div>

      <Heading className="sw-service-card__title">
        {href ? (
          <Link href={href} className="sw-service-card__link" {...linkProps}>
            {title}
          </Link>
        ) : (
          title
        )}
      </Heading>

      {text && <p className="sw-service-card__text">{text}</p>}

      {list.length > 0 && (
        <ul className="sw-service-card__includes">
          {list.map((item, i) => (
            <li key={i} className="sw-service-card__include">
              <Icon name="check" size={16} className="sw-service-card__check" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {(hasMeta || href) && (
        <div className="sw-service-card__footer">
          {hasMeta && (
            <p className="sw-service-card__meta">
              {priceText != null && (
                <span className="sw-service-card__price">
                  {priceText}
                  {priceSuffix && <span className="sw-service-card__suffix">{' ' + priceSuffix}</span>}
                </span>
              )}
              {term != null && (
                <span className="sw-service-card__term">
                  <span className="sw-sr-only">{termLabel}: </span>
                  {term}
                </span>
              )}
            </p>
          )}
          {href && (
            <span
              className={cx('sw-btn', 'sw-btn--ghost', 'sw-btn--s', compact && 'sw-btn--icon', 'sw-service-card__more')}
              aria-hidden="true"
            >
              {!compact && <span>{moreLabel}</span>}
              <Icon name="arrow-right" size={15} className="sw-btn__icon sw-btn__icon--end sw-service-card__arrow" />
            </span>
          )}
        </div>
      )}
    </article>
  );
}
