import React from 'react';
import { Icon } from './Icon.jsx';
import { cx, SERVICES } from '../utils.js';

/** Default words for status badges; pass children to override. */
const STATUS_LABEL = { work: 'В\u00a0работе', ok: 'Запущено', pause: 'На\u00a0паузе', new: 'Новое' };
const ICON_SIZE = { s: 14, m: 14 };

/**
 * A short, non-interactive label. Variants:
 *  service — icon + label from SERVICES (services are never colour-coded);
 *  status  — work / ok / pause / new, each with its own glyph shape so it reads without colour;
 *  feature — the one amber highlight on a card («Чаще всего выбирают»);
 *  tag     — neutral mono meta tag;
 *  count   — the amber counter («12»).
 */
export function Badge({
  variant,
  service,
  tone,
  size = 'm',
  icon,
  max = 99,
  label,
  className,
  children,
  ...rest
}) {
  const v = variant || (service ? 'service' : tone ? 'status' : 'tag');
  const t = tone || 'new';
  const iconSize = ICON_SIZE[size] || ICON_SIZE.m;
  let lead = null;
  let text = children;

  if (v === 'service') {
    const svc = SERVICES[service];
    lead = icon || (svc && svc.icon);
    if (text == null && svc) text = svc.label;
  } else if (v === 'status') {
    lead = icon || null;
    if (text == null) text = STATUS_LABEL[t];
  } else {
    lead = icon || null;
  }

  if (v === 'count') {
    const n = typeof text === 'number' ? text : Number(text);
    const shown = Number.isFinite(n) && max && n > max ? `${max}+` : text;
    return (
      <span className={cx('sw-badge', 'sw-badge--count', `sw-badge--${size}`, className)} {...rest}>
        <span aria-hidden={label ? true : undefined}>{shown}</span>
        {label && <span className="sw-sr-only">{label}</span>}
      </span>
    );
  }

  return (
    <span
      className={cx('sw-badge', `sw-badge--${v}`, v === 'status' && `sw-badge--${t}`, `sw-badge--${size}`, className)}
      {...rest}
    >
      {lead ? (
        <Icon name={lead} size={iconSize} className="sw-badge__icon" />
      ) : v === 'status' ? (
        <span className="sw-badge__glyph" aria-hidden="true" />
      ) : null}
      {text != null && <span className="sw-badge__text">{text}</span>}
      {label && <span className="sw-sr-only">{label}</span>}
    </span>
  );
}
