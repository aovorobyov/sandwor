'use client';
import React, { useState, useRef } from 'react';
import { Icon } from './Icon.jsx';
import { cx } from '../utils.js';

/**
 * 2–4 mutually exclusive options in a sunken track: a period, a view, a size.
 * Behaves like a radio group: one tab stop, arrows move and select.
 */
export function SegmentedControl({
  options = [],
  value,
  defaultValue,
  onChange,
  size = 'm',
  label,
  block = false,
  disabled = false,
  className,
  ...rest
}) {
  const refs = useRef({});
  const firstEnabled = options.find((o) => !o.disabled);
  const [inner, setInner] = useState(defaultValue !== undefined ? defaultValue : firstEnabled && firstEnabled.value);
  const controlled = value !== undefined;
  const current = controlled ? value : inner;
  const currentIsOption = options.some((o) => o.value === current && !o.disabled);

  function select(v) {
    if (v === current) return;
    if (!controlled) setInner(v);
    if (onChange) onChange(v);
  }

  function onKeyDown(e) {
    const enabled = options.filter((o) => !o.disabled);
    if (!enabled.length) return;
    const i = enabled.findIndex((o) => refs.current[o.value] === e.currentTarget);
    let next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = enabled[(i + 1) % enabled.length];
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = enabled[(i - 1 + enabled.length) % enabled.length];
    else if (e.key === 'Home') next = enabled[0];
    else if (e.key === 'End') next = enabled[enabled.length - 1];
    if (!next) return;
    e.preventDefault();
    select(next.value);
    const el = refs.current[next.value];
    if (el) el.focus();
  }

  const iconSize = size === 's' ? 15 : 16;

  return (
    <div
      role="radiogroup"
      aria-label={label}
      aria-disabled={disabled || undefined}
      className={cx('sw-seg', `sw-seg--${size}`, block && 'sw-seg--block', className)}
      {...rest}
    >
      {options.map((o) => {
        const checked = o.value === current;
        const off = disabled || o.disabled;
        const tabbable = !off && (checked || (!currentIsOption && firstEnabled && o.value === firstEnabled.value));
        return (
          <button
            key={o.value}
            ref={(el) => { refs.current[o.value] = el; }}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-label={o.ariaLabel}
            tabIndex={tabbable ? 0 : -1}
            disabled={off}
            className={cx('sw-seg__option', o.label == null && 'sw-seg__option--icon', checked && 'is-active', o.className)}
            onClick={() => select(o.value)}
            onKeyDown={onKeyDown}
          >
            {o.icon && <Icon name={o.icon} size={iconSize} className="sw-seg__icon" />}
            {o.label != null && <span className="sw-seg__label">{o.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
