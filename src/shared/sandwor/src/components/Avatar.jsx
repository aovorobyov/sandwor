'use client';
import React, { useEffect, useState } from 'react';
import { cx } from '../utils.js';

/** «Андрей Сомов» → «АС». */
function initialsOf(name) {
  if (!name) return '';
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0))
    .join('')
    .toUpperCase();
}

/**
 * A person's tile: initials (Unbounded 600) or a photo, square with a small radius.
 * tone="founder" is the amber variant for the one visible founder.
 * Set `decorative` when the name is printed right next to it.
 */
export function Avatar({
  name,
  initials,
  src,
  alt,
  size = 'm',
  tone = 'default',
  status,
  statusLabel = 'в сети',
  ring = 'surface',
  decorative = false,
  className,
  ...rest
}) {
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(false), [src]);
  const photo = Boolean(src) && !broken;
  const online = status === 'online';
  const spoken = [alt || name, online ? statusLabel : null].filter(Boolean).join(', ');
  const a11y = decorative || !spoken ? { 'aria-hidden': true } : { role: 'img', 'aria-label': spoken };

  return (
    <span
      className={cx(
        'sw-avatar',
        `sw-avatar--${size}`,
        `sw-avatar--${tone}`,
        photo && 'sw-avatar--photo',
        ring === 'bg' && 'sw-avatar--on-bg',
        className,
      )}
      {...a11y}
      {...rest}
    >
      {photo ? (
        <img className="sw-avatar__img" src={src} alt="" onError={() => setBroken(true)} />
      ) : (
        <span className="sw-avatar__initials" aria-hidden="true">{initials || initialsOf(name)}</span>
      )}
      {online && <span className="sw-avatar__status" aria-hidden="true" />}
    </span>
  );
}

/**
 * Overlapping stack of avatars for team teasers, with a «+3» tile for the rest.
 * `people` — [{ name, initials?, src?, tone? }]; `max` — how many tiles to show.
 */
export function AvatarGroup({
  people = [],
  max = 4,
  total,
  size = 'm',
  ring = 'bg',
  label,
  moreLabel = (n) => `и ещё ${n}`,
  className,
  ...rest
}) {
  const shown = people.slice(0, Math.max(0, max));
  const extra = Math.max(0, (total != null ? total : people.length) - shown.length);
  return (
    <div
      role="group"
      aria-label={label}
      className={cx('sw-avatar-group', `sw-avatar-group--${size}`, ring === 'surface' && 'sw-avatar-group--on-surface', className)}
      {...rest}
    >
      {shown.map((p, i) => (
        <Avatar
          key={p.id || p.name || i}
          name={p.name}
          initials={p.initials}
          src={p.src}
          alt={p.alt}
          tone={p.tone}
          size={size}
          className="sw-avatar-group__item"
        />
      ))}
      {extra > 0 && (
        <span
          className={cx('sw-avatar', `sw-avatar--${size}`, 'sw-avatar--more', 'sw-avatar-group__item')}
          role="img"
          aria-label={moreLabel(extra)}
        >
          <span className="sw-avatar__initials" aria-hidden="true">+{extra}</span>
        </span>
      )}
    </div>
  );
}
