'use client';
import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Icon } from './Icon.jsx';
import { SERVICES, cx } from '../utils.js';

const ICON_SIZE = { s: 15, m: 16 };
const STEP = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

function assignRef(ref, node) {
  if (typeof ref === 'function') ref(node);
  else if (ref) ref.current = node;
}

function toList(v) {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

/**
 * A row of selectable chips. Single choice (default) behaves as a radio group:
 * one tab stop, arrow keys move and select. `multiple` makes a group of toggle
 * buttons with aria-pressed. `options[].service` pulls icon + label from SERVICES.
 * With `name`, the selection is also posted with a native <form> (hidden inputs).
 * `error` (string) renders a danger message right after the group and links it via aria-describedby.
 */
export function ChipGroup({
  options = [],
  multiple = false,
  value,
  defaultValue,
  onChange,
  size = 'm',
  label,
  name,
  disabled = false,
  error,
  groupRef,
  className,
  onKeyDown,
  'aria-describedby': describedBy,
  ...rest
}) {
  const controlled = value !== undefined;
  const initial = () => (defaultValue !== undefined ? defaultValue : multiple ? [] : null);
  const [inner, setInner] = useState(initial);
  const selected = toList(controlled ? value : inner);
  const refs = useRef([]);
  const rootRef = useRef(null);
  const setRoot = useCallback((node) => {
    rootRef.current = node;
    assignRef(groupRef, node);
  }, [groupRef]);
  const autoId = useId();
  const msgId = `sw-chipgroup-${autoId.replace(/:/g, '')}-msg`;
  const hasError = Boolean(error);
  const errorText = error === true ? null : error || null;
  const initialRef = useRef(null);
  if (initialRef.current === null) initialRef.current = { value: initial() };

  // Uncontrolled: a native form.reset() brings the chips back to defaultValue.
  useEffect(() => {
    const form = rootRef.current && rootRef.current.closest('form');
    if (controlled || !form) return undefined;
    const onReset = () => setInner(initialRef.current.value);
    form.addEventListener('reset', onReset);
    return () => form.removeEventListener('reset', onReset);
  }, [controlled]);

  const items = options.map((o) => {
    const svc = o.service ? SERVICES[o.service] : null;
    return {
      ...o,
      label: o.label != null ? o.label : svc ? svc.label : String(o.value),
      icon: o.icon || (svc ? svc.icon : null),
      disabled: disabled || Boolean(o.disabled),
    };
  });
  const isOn = (v) => selected.includes(v);

  const commit = (next) => {
    if (!controlled) setInner(next);
    if (onChange) onChange(next);
  };

  const pick = (v) => {
    if (multiple) {
      const set = new Set(selected);
      if (set.has(v)) set.delete(v);
      else set.add(v);
      // keep the order of `options`, not the order of clicks
      commit(items.map((i) => i.value).filter((x) => set.has(x)));
    } else if (!isOn(v)) {
      commit(v);
    }
  };

  // single choice: roving tabindex — the selected chip (or the first enabled one) is the tab stop
  const selectedIndex = items.findIndex((i) => !i.disabled && isOn(i.value));
  const tabStop = selectedIndex >= 0 ? selectedIndex : items.findIndex((i) => !i.disabled);

  const move = (from, dir) => {
    for (let n = 1; n <= items.length; n += 1) {
      const j = (from + dir * n + items.length * n) % items.length;
      if (!items[j].disabled) return j;
    }
    return -1;
  };

  const handleKeyDown = (event, index) => {
    if (multiple) return;
    let next = -1;
    if (event.key in STEP) next = move(index, STEP[event.key]);
    else if (event.key === 'Home') next = move(-1, 1);
    else if (event.key === 'End') next = move(items.length, -1);
    if (next < 0) return;
    event.preventDefault();
    const el = refs.current[next];
    if (el) el.focus();
    pick(items[next].value);
  };

  const iconSize = ICON_SIZE[size] || ICON_SIZE.m;

  const group = (
    <div
      ref={setRoot}
      role={multiple ? 'group' : 'radiogroup'}
      aria-label={label}
      aria-disabled={disabled || undefined}
      aria-invalid={hasError && !multiple ? true : undefined}
      aria-describedby={cx(describedBy, errorText && msgId) || undefined}
      className={cx('sw-chipgroup', `sw-chipgroup--${size}`, hasError && 'is-error', className)}
      onKeyDown={onKeyDown}
      {...rest}
    >
      {items.map((item, index) => {
        const on = isOn(item.value);
        const glyph = on ? 'check' : item.icon;
        return (
          <button
            key={item.value}
            ref={(el) => { refs.current[index] = el; }}
            type="button"
            role={multiple ? undefined : 'radio'}
            aria-checked={multiple ? undefined : on}
            aria-pressed={multiple ? on : undefined}
            tabIndex={multiple ? undefined : index === tabStop ? 0 : -1}
            disabled={item.disabled}
            className={cx('sw-chipgroup__chip', glyph && 'sw-chipgroup__chip--glyph', on && 'is-selected', item.className)}
            onClick={() => pick(item.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            {glyph && (
              <Icon
                name={glyph}
                size={iconSize}
                className={cx('sw-chipgroup__icon', on && 'sw-chipgroup__icon--check')}
              />
            )}
            <span className="sw-chipgroup__label">{item.label}</span>
          </button>
        );
      })}
      {name && selected.map((v) => <input key={v} type="hidden" name={name} value={v} />)}
    </div>
  );
  // The message is a sibling (radiogroup/group may own only the chips). Always a fragment,
  // so the group is not remounted — and focus is not lost — when the error appears.
  return (
    <>
      {group}
      {errorText && (
        <p id={msgId} role="alert" className="sw-chipgroup__msg">
          <Icon name="alert-circle" size={14} className="sw-chipgroup__msg-icon" />
          <span>{errorText}</span>
        </p>
      )}
    </>
  );
}
