import React from 'react';
import { Icon } from './Icon.jsx';
import { cx } from '../utils.js';

const ICON_SIZE = { s: 15, m: 16, l: 18 };

/**
 * The action. Primary (amber) at most once per view — for the thing the view is
 * for. Renders <a> when `href` is set, otherwise <button type="button">.
 */
export function Button({
  variant = 'primary',
  size = 'm',
  icon,
  iconEnd,
  iconOnly = false,
  loading = false,
  loadingText = 'Отправляем…',
  block = false,
  href,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}) {
  const iconSize = iconOnly ? (size === 's' ? 16 : 20) : ICON_SIZE[size];
  const cls = cx(
    'sw-btn',
    `sw-btn--${variant}`,
    `sw-btn--${size}`,
    iconOnly && 'sw-btn--icon',
    block && 'sw-btn--block',
    loading && 'is-loading',
    className,
  );
  const content = loading ? (
    <>
      <Icon name="loader-2" size={iconSize} spin />
      {!iconOnly && <span>{loadingText}</span>}
    </>
  ) : (
    <>
      {icon && <Icon name={icon} size={iconSize} className="sw-btn__icon" />}
      {!iconOnly && children != null && <span>{children}</span>}
      {iconEnd && <Icon name={iconEnd} size={iconSize} className="sw-btn__icon sw-btn__icon--end" />}
    </>
  );
  if (href && !disabled) {
    return (
      <a href={href} className={cls} aria-busy={loading || undefined} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={cls} disabled={disabled} aria-busy={loading || undefined} {...rest}>
      {content}
    </button>
  );
}
