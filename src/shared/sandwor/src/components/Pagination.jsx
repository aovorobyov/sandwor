'use client';
import React, { useState } from 'react';
import { Icon } from './Icon.jsx';
import { Button } from './Button.jsx';
import { cx, formatNumber } from '../utils.js';

/* 1 … 4 5 6 … 12 — always the same number of slots, so the row never jumps. */
function pageRange(page, total, siblings) {
  const seq = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
  const slots = siblings * 2 + 5;
  if (total <= slots) return seq(1, total);
  const left = Math.max(page - siblings, 1);
  const right = Math.min(page + siblings, total);
  const leftDots = left > 3;
  const rightDots = right < total - 2;
  const edge = 3 + siblings * 2;
  if (!leftDots) return [...seq(1, edge), 'end', total];
  if (!rightDots) return [1, 'start', ...seq(total - edge + 1, total)];
  return [1, 'start', ...seq(left, right), 'end', total];
}

/**
 * Page switcher for long lists (cases, blog). Prev/next icon buttons, page
 * numbers with «…», the current page in amber. On ≤760px (or with `compact`)
 * it folds to «3 из 8» between the arrows. Pass `getHref` to render real links.
 */
export function Pagination({
  page,
  defaultPage = 1,
  total,
  onChange,
  siblings = 1,
  getHref,
  compact = false,
  label = 'Страницы',
  prevLabel = 'Предыдущая страница',
  nextLabel = 'Следующая страница',
  className,
  ...rest
}) {
  const [inner, setInner] = useState(defaultPage);
  const controlled = page !== undefined;
  const pages = Math.max(1, total || 1);
  const current = Math.min(Math.max(1, controlled ? page : inner), pages);

  function go(p, e) {
    if (p < 1 || p > pages || p === current) {
      if (e && getHref) e.preventDefault();
      return;
    }
    if (!controlled) setInner(p);
    if (onChange) onChange(p);
  }

  function nav(dir) {
    const target = current + dir;
    const off = target < 1 || target > pages;
    const props = {
      className: cx('sw-pag__nav', dir < 0 ? 'sw-pag__nav--prev' : 'sw-pag__nav--next'),
      'aria-label': dir < 0 ? prevLabel : nextLabel,
    };
    const icon = <Icon name={dir < 0 ? 'chevron-left' : 'chevron-right'} size={18} />;
    if (off) return <button type="button" disabled {...props}>{icon}</button>;
    if (getHref) {
      return (
        <a href={getHref(target)} rel={dir < 0 ? 'prev' : 'next'} onClick={(e) => go(target, e)} {...props}>
          {icon}
        </a>
      );
    }
    return <button type="button" onClick={() => go(target)} {...props}>{icon}</button>;
  }

  const items = pageRange(current, pages, siblings);

  return (
    <nav aria-label={label} className={cx('sw-pag', compact && 'sw-pag--compact', className)} {...rest}>
      {nav(-1)}
      <ol className="sw-pag__list">
        {items.map((p) => {
          if (typeof p !== 'number') {
            return (
              <li key={p} className="sw-pag__item sw-pag__dots" aria-hidden="true">…</li>
            );
          }
          const isCurrent = p === current;
          const common = {
            className: cx('sw-pag__page', isCurrent && 'is-current'),
            'aria-current': isCurrent ? 'page' : undefined,
            'aria-label': `Страница ${p}`,
          };
          return (
            <li key={p} className="sw-pag__item">
              {getHref ? (
                <a href={getHref(p)} onClick={(e) => go(p, e)} {...common}>{formatNumber(p)}</a>
              ) : (
                <button type="button" onClick={() => go(p)} {...common}>{formatNumber(p)}</button>
              )}
            </li>
          );
        })}
      </ol>
      <span className="sw-pag__compact">
        <span className="sw-pag__compact-now">{formatNumber(current)}</span> из {formatNumber(pages)}
      </span>
      {nav(1)}
    </nav>
  );
}

/**
 * «Показать ещё» under a list: a secondary block button plus a mono counter.
 * Keeps the button clickable while loading (the spinner says it's working);
 * hides it once everything is shown.
 */
export function LoadMore({
  shown,
  total,
  onLoadMore,
  loading = false,
  label = 'Показать ещё',
  loadingText = 'Загружаем…',
  caption,
  className,
  ...rest
}) {
  const done = total != null && shown >= total;
  const text = caption != null ? caption : `Показано ${formatNumber(shown)} из ${formatNumber(total)}`;
  return (
    <div className={cx('sw-loadmore', className)} {...rest}>
      {!done && (
        <Button
          variant="secondary"
          block
          loading={loading}
          loadingText={loadingText}
          className="sw-loadmore__btn"
          onClick={loading ? undefined : onLoadMore}
        >
          {label}
        </Button>
      )}
      <p className="sw-loadmore__caption" aria-live="polite">{text}</p>
    </div>
  );
}
