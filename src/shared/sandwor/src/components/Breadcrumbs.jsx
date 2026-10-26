'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Icon } from './Icon.jsx';
import { cx } from '../utils.js';

/**
 * Where the page sits in the site: links up the chain, the current page last
 * (plain text, aria-current="page"). With more than three items the middle
 * collapses into «…» on narrow screens (`collapse="auto"`), or always
 * (`collapse="always"`); the «…» button expands the full path.
 */
export function Breadcrumbs({
  items = [],
  label = 'Навигационная цепочка',
  collapse = 'auto',
  expandLabel = 'Показать весь путь',
  linkAs: Link = 'a',
  className,
  ...rest
}) {
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef(null);
  const wasExpanded = useRef(false);
  const collapsible = collapse !== 'never' && items.length > 3;

  useEffect(() => {
    // the «…» button disappears on expand: hand focus to the first revealed link
    if (expanded && !wasExpanded.current && navRef.current) {
      const el =
        navRef.current.querySelector('.sw-crumbs__item--middle .sw-crumbs__link') ||
        navRef.current.querySelector('.sw-crumbs__link');
      if (el) el.focus();
    }
    wasExpanded.current = expanded;
  }, [expanded]);

  const last = items.length - 1;
  const sep = <Icon name="chevron-right" size={14} className="sw-crumbs__sep" />;

  return (
    <nav
      ref={navRef}
      aria-label={label}
      className={cx(
        'sw-crumbs',
        collapsible && (collapse === 'always' ? 'sw-crumbs--collapsed' : 'sw-crumbs--auto'),
        expanded && 'is-expanded',
        className,
      )}
      {...rest}
    >
      <ol className="sw-crumbs__list">
        {items.map((it, i) => {
          const isCurrent = i === last;
          const isMiddle = collapsible && i > 0 && i < last;
          const title = typeof it.label === 'string' ? it.label : undefined;
          let node;
          if (isCurrent) {
            node = (
              <span className="sw-crumbs__current" aria-current="page" title={title}>
                {it.label}
              </span>
            );
          } else if (it.href) {
            node = (
              <Link href={it.href} className="sw-crumbs__link">
                {it.label}
              </Link>
            );
          } else {
            node = <span className="sw-crumbs__text">{it.label}</span>;
          }
          return (
            <React.Fragment key={i}>
              <li
                className={cx(
                  'sw-crumbs__item',
                  isMiddle && 'sw-crumbs__item--middle',
                  isCurrent && 'sw-crumbs__item--current',
                  it.className,
                )}
              >
                {node}
                {!isCurrent && sep}
              </li>
              {collapsible && i === 0 && (
                <li className="sw-crumbs__item sw-crumbs__item--more">
                  <button
                    type="button"
                    className="sw-crumbs__more"
                    aria-label={expandLabel}
                    title={expandLabel}
                    onClick={() => setExpanded(true)}
                  >
                    …
                  </button>
                  {sep}
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
