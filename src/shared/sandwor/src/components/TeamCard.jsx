import React from 'react';
import { Avatar } from './Avatar.jsx';
import { Badge } from './Badge.jsx';
import { Button } from './Button.jsx';
import { cx } from '../utils.js';

/**
 * A person on the team.
 *  founder — the visible founder: L avatar (amber tone), name, role, a first-person
 *            quote with a hanging «, mono meta and an optional contact action;
 *  member  — a compact row: M avatar, name, role, service badge on the right.
 */
export function TeamCard({
  variant = 'member',
  name,
  role,
  initials,
  photo,
  quote,
  meta,
  contact,
  service,
  headingLevel = 3,
  className,
  children,
  ...rest
}) {
  const Heading = `h${Math.min(6, Math.max(2, headingLevel))}`;

  if (variant === 'founder') {
    const { label: contactLabel, icon: contactIcon = 'brand-telegram', className: contactClass, ...contactRest } = contact || {};
    return (
      <article className={cx('sw-team-card', 'sw-team-card--founder', className)} {...rest}>
        <div className="sw-team-card__head">
          <Avatar name={name} initials={initials} src={photo} size="l" tone="founder" decorative />
          <div className="sw-team-card__who">
            <Heading className="sw-team-card__name">{name}</Heading>
            {role && <p className="sw-team-card__role">{role}</p>}
          </div>
        </div>
        {quote && (
          <blockquote className="sw-team-card__quote">
            <p>«{quote}»</p>
          </blockquote>
        )}
        {children}
        {(meta || contactLabel) && (
          <div className="sw-team-card__foot">
            {meta && <p className="sw-team-card__meta">{meta}</p>}
            {contactLabel && (
              <div className="sw-team-card__contact">
                <Button
                  variant="ghost"
                  icon={contactIcon}
                  className={cx('sw-team-card__contact-btn', contactClass)}
                  {...contactRest}
                >
                  {contactLabel}
                </Button>
              </div>
            )}
          </div>
        )}
      </article>
    );
  }

  return (
    <article className={cx('sw-team-card', 'sw-team-card--member', className)} {...rest}>
      <Avatar name={name} initials={initials} src={photo} size="m" decorative />
      <div className="sw-team-card__who">
        <Heading className="sw-team-card__name">{name}</Heading>
        {role && <p className="sw-team-card__role">{role}</p>}
      </div>
      {service && <Badge variant="service" service={service} className="sw-team-card__service" />}
      {children}
    </article>
  );
}

/** Stack of member cards, 12px apart, as a real list. */
export function TeamCardList({ label, className, children, ...rest }) {
  return (
    <ul className={cx('sw-team-card-list', className)} aria-label={label} {...rest}>
      {React.Children.toArray(children).map((child, i) => (
        <li key={child.key != null ? child.key : i} className="sw-team-card-list__item">
          {child}
        </li>
      ))}
    </ul>
  );
}
