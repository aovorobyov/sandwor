'use client';
import React, { useState, useRef, useId } from 'react';
import { Icon } from './Icon.jsx';
import { cx } from '../utils.js';

/**
 * Underline tabs. Switches panels of one view (or filters a list) without
 * leaving the page. Keyboard: ←/→ move and select, Home/End jump to the ends.
 * Panels come from `panels` ({ [id]: node }) or from `children(activeId)`.
 * Without either, only the tab list renders (a filter above your own content).
 */
export function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  panels,
  children,
  size = 'm',
  label,
  className,
  ...rest
}) {
  const uid = useId();
  const tabRefs = useRef({});
  const firstEnabled = items.find((it) => !it.disabled);
  const [inner, setInner] = useState(defaultValue !== undefined ? defaultValue : firstEnabled && firstEnabled.id);
  const controlled = value !== undefined;
  const active = controlled ? value : inner;
  const hasPanels = panels != null || typeof children === 'function';
  const activeIsTab = items.some((it) => it.id === active && !it.disabled);

  const tabId = (id) => `${uid}-tab-${id}`;
  const panelId = (id) => `${uid}-panel-${id}`;

  function select(id) {
    if (id === active) return;
    if (!controlled) setInner(id);
    if (onChange) onChange(id);
  }

  function focusTab(id) {
    const el = tabRefs.current[id];
    if (el) {
      el.focus();
      if (el.scrollIntoView) el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }

  function onKeyDown(e) {
    const enabled = items.filter((it) => !it.disabled);
    if (!enabled.length) return;
    const current = enabled.findIndex((it) => tabRefs.current[it.id] === e.currentTarget);
    let next = null;
    if (e.key === 'ArrowRight') next = enabled[(current + 1) % enabled.length];
    else if (e.key === 'ArrowLeft') next = enabled[(current - 1 + enabled.length) % enabled.length];
    else if (e.key === 'Home') next = enabled[0];
    else if (e.key === 'End') next = enabled[enabled.length - 1];
    if (!next) return;
    e.preventDefault();
    select(next.id);
    focusTab(next.id);
  }

  return (
    <div className={cx('sw-tabs', `sw-tabs--${size}`, className)} {...rest}>
      <div className="sw-tabs__scroll">
        <div className="sw-tabs__list" role="tablist" aria-label={label} aria-orientation="horizontal">
          {items.map((it) => {
            const selected = it.id === active;
            const tabbable = selected || (!activeIsTab && firstEnabled && it.id === firstEnabled.id);
            return (
              <button
                key={it.id}
                type="button"
                role="tab"
                id={tabId(it.id)}
                ref={(el) => { tabRefs.current[it.id] = el; }}
                aria-selected={selected}
                aria-controls={hasPanels ? panelId(it.id) : undefined}
                tabIndex={tabbable ? 0 : -1}
                disabled={it.disabled}
                className={cx('sw-tabs__tab', selected && 'is-active', it.className)}
                onClick={() => select(it.id)}
                onKeyDown={onKeyDown}
              >
                {it.icon && <Icon name={it.icon} size={size === 's' ? 15 : 16} className="sw-tabs__icon" />}
                <span className="sw-tabs__label">{it.label}</span>
                {it.count != null && <span className="sw-tabs__count">{it.count}</span>}
              </button>
            );
          })}
        </div>
      </div>
      {hasPanels &&
        items.map((it) => {
          const selected = it.id === active;
          const content = panels != null ? panels[it.id] : selected ? children(active) : null;
          return (
            <div
              key={it.id}
              role="tabpanel"
              id={panelId(it.id)}
              aria-labelledby={tabId(it.id)}
              tabIndex={0}
              hidden={!selected}
              className="sw-tabs__panel"
            >
              {content}
            </div>
          );
        })}
    </div>
  );
}
