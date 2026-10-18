import React from 'react';
import { ICONS } from '../icons.js';
import { cx } from '../utils.js';

/**
 * Tabler outline icon from the system's subset. Inherits colour from `color`,
 * sizes by `size` (px) or by font-size when `size` is omitted.
 */
export function Icon({ name, size, spin = false, label, className, style, ...rest }) {
  const inner = ICONS[name];
  if (!inner) return null;
  const dims = size ? { width: size, height: size } : null;
  return (
    <svg
      viewBox="0 0 24 24"
      className={cx('sw-icon', spin && 'sw-icon--spin', className)}
      style={dims ? { ...dims, ...style } : style}
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      focusable="false"
      dangerouslySetInnerHTML={{ __html: inner }}
      {...rest}
    />
  );
}

/** Names available to <Icon name>. */
export const iconNames = Object.keys(ICONS);
