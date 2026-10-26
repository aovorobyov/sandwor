import React from 'react';
import { Icon } from './Icon.jsx';
import { Badge } from './Badge.jsx';
import { Button } from './Button.jsx';
import { cx, formatNumber } from '../utils.js';

/**
 * A plan card: name (+ amber badge when featured), subtitle, «от 120 000 ₽»,
 * optional note and term, features, and a CTA pinned to the bottom so cards
 * in one row line up. Featured = accent-line border + primary CTA; the rest
 * get a secondary CTA.
 */
export function PricingCard({
  name,
  subtitle,
  price,
  pricePrefix = 'от',
  priceNote,
  term,
  termLabel = 'Срок',
  features,
  featured = false,
  badge,
  cta,
  headingLevel = 3,
  className,
  children,
  ...rest
}) {
  const Heading = `h${Math.min(6, Math.max(2, headingLevel))}`;
  const badgeText = badge === false ? null : badge || (featured ? 'Чаще всего выбирают' : null);
  const list = Array.isArray(features) ? features.filter(Boolean) : [];
  const { label: ctaLabel, className: ctaClass, variant: ctaVariant, ...ctaRest } = cta || {};

  return (
    <article className={cx('sw-pricing-card', featured && 'sw-pricing-card--featured', className)} {...rest}>
      <div className="sw-pricing-card__head">
        <Heading className="sw-pricing-card__name">{name}</Heading>
        {badgeText && (
          <Badge variant="feature" className="sw-pricing-card__badge">
            {badgeText}
          </Badge>
        )}
      </div>
      {subtitle && <p className="sw-pricing-card__subtitle">{subtitle}</p>}

      {price != null && (
        <p className="sw-pricing-card__price">
          {pricePrefix && <span className="sw-pricing-card__from">{pricePrefix}</span>}
          {pricePrefix && '\u00a0'}
          <span className="sw-pricing-card__amount">{typeof price === 'number' ? formatNumber(price) : price}</span>
          {typeof price === 'number' && '\u00a0'}
          {typeof price === 'number' && <span className="sw-pricing-card__currency">₽</span>}
        </p>
      )}
      {priceNote && <p className="sw-pricing-card__note">{priceNote}</p>}
      {term && (
        <p className="sw-pricing-card__term">
          <Icon name="clock" size={16} className="sw-pricing-card__term-icon" />
          <span className="sw-sr-only">{termLabel}: </span>
          <span>{term}</span>
        </p>
      )}

      {list.length > 0 && (
        <ul className="sw-pricing-card__features">
          {list.map((f, i) => (
            <li key={i} className="sw-pricing-card__feature">
              <Icon name="check" size={16} className="sw-pricing-card__check" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}

      {children}

      {cta && ctaLabel && (
        <div className="sw-pricing-card__cta">
          <Button
            variant={ctaVariant || (featured ? 'primary' : 'secondary')}
            size="l"
            block
            className={cx('sw-pricing-card__button', ctaClass)}
            {...ctaRest}
          >
            {ctaLabel}
          </Button>
        </div>
      )}
    </article>
  );
}
