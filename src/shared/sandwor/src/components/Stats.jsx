import React from 'react';
import { cx } from '../utils.js';

function autoColumns(n) {
  if (n <= 5) return Math.max(3, n);
  return n === 6 ? 3 : 4;
}

/**
 * The numbers block: big Fira Code values with a short label, separated by
 * hairlines. At most one value is amber (`accent`) — the number that is the point.
 * Desktop: one row (3–5 columns) with vertical lines; ≤760px: 2-up grid with
 * horizontal lines. `onCanvas` turns every number into a node on the dot grid.
 */
export function Stats({ items = [], columns, onCanvas = false, label, className, style, ...rest }) {
  const n = items.length;
  const cols = Math.min(6, Math.max(1, columns || autoColumns(n)));
  const accentIndex = items.findIndex((it) => it.accent);
  const lastRowStart = Math.floor((n - 1) / cols) * cols;
  // longest value in characters: the value size shrinks (never grows) so it always fits its column
  const chars = Math.max(5, ...items.map((it) => (typeof it.value === 'string' || typeof it.value === 'number' ? String(it.value).length : 5)));

  return (
    <ul
      className={cx('sw-stats', onCanvas ? 'sw-stats--canvas sw-canvas sw-canvas--bordered' : 'sw-stats--flat', className)}
      style={{ '--sw-stats-cols': cols, '--sw-stats-chars': chars, ...style }}
      aria-label={label}
      {...rest}
    >
      {items.map((it, i) => (
        <li
          key={it.id || i}
          className={cx(
            'sw-stats__item',
            i === accentIndex && 'sw-stats__item--accent',
            i % cols === 0 && 'is-row-start',
            i >= cols && 'is-row-next',
            i >= lastRowStart && 'is-row-last',
            it.className,
          )}
        >
          <span className="sw-stats__value">{it.value}</span>{' '}
          <span className="sw-stats__label">{it.label}</span>
          {it.note && (
            <>
              {' '}
              <span className="sw-stats__note">{it.note}</span>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
