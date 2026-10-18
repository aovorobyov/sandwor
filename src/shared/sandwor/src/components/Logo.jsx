import React from 'react';
import { cx } from '../utils.js';

/**
 * The sandwor wordmark as live text: Unbounded 700, −0.03em tracking, the dot
 * (0.2778em) sitting on the baseline 0.2222em after the "r". Only the dot takes
 * the accent. `size` is the font-size in px (site header: 18).
 */
export function Logo({ size = 18, href, mono = false, className, style, ...rest }) {
  const Tag = href ? 'a' : 'span';
  return (
    <Tag
      href={href}
      className={cx('sw-logo', mono && 'sw-logo--mono', className)}
      style={{ fontSize: size, ...style }}
      aria-label={rest['aria-label'] || 'sandwor'}
      {...rest}
    >
      <span aria-hidden="true">sandwor</span>
      <span className="sw-logo__dot" aria-hidden="true" />
    </Tag>
  );
}
