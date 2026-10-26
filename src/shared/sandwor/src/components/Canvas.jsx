import React from 'react';
import { cx } from '../utils.js';

/**
 * The dot-grid canvas — the system's only texture. Put schemes, flows and case
 * covers on it; never put body text or forms on it.
 */
export function Canvas({ as: Tag = 'div', bordered = false, className, children, ...rest }) {
  return (
    <Tag className={cx('sw-canvas', bordered && 'sw-canvas--bordered', className)} {...rest}>
      {children}
    </Tag>
  );
}
