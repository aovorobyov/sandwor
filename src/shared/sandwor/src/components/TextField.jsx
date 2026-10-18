'use client';
import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { Icon } from './Icon.jsx';
import { cx, formatNumber } from '../utils.js';

// useLayoutEffect warns during SSR (Next.js); fall back to useEffect on the server.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function assignRef(ref, node) {
  if (typeof ref === 'function') ref(node);
  else if (ref) ref.current = node;
}

/**
 * Text input with a label above and a hint or an error below. `multiline` turns
 * it into an auto-growing textarea with an optional «120 / 500» counter.
 * `className`/`style` go to the wrapper; every other prop goes to the native
 * <input>/<textarea> (name, placeholder, type, autoComplete, required, onBlur…).
 */
export function TextField({
  label,
  hint,
  error,
  optional = false,
  optionalLabel = 'необязательно',
  icon,
  suffix,
  size = 'm',
  multiline = false,
  rows = 3,
  maxLength,
  disabled = false,
  readOnly = false,
  id,
  value,
  defaultValue,
  onChange,
  inputRef,
  className,
  style,
  'aria-describedby': describedBy,
  ...rest
}) {
  const autoId = useId();
  const fieldId = id || `sw-tf-${autoId.replace(/:/g, '')}`;
  const msgId = `${fieldId}-msg`;
  const countId = `${fieldId}-count`;
  const suffixId = `${fieldId}-suffix`;
  const ref = useRef(null);

  const controlled = value !== undefined;
  const [innerLength, setInnerLength] = useState(() => String(defaultValue == null ? '' : defaultValue).length);
  const length = controlled ? String(value == null ? '' : value).length : innerLength;

  const hasError = Boolean(error);
  const errorText = error === true ? null : error || null;
  const message = hasError ? errorText : hint;
  const showCount = multiline && maxLength != null;
  const showSuffix = !multiline && suffix != null;

  const setRef = useCallback((node) => {
    ref.current = node;
    assignRef(inputRef, node);
  }, [inputRef]);

  const resize = useCallback(() => {
    const el = ref.current;
    if (!multiline || !el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [multiline]);

  useIsoLayoutEffect(() => { resize(); }, [resize, value]);

  // Uncontrolled: a native form.reset() restores the value — sync the counter and height after it.
  useEffect(() => {
    const form = ref.current && ref.current.form;
    if (controlled || !form) return undefined;
    let timer;
    const onReset = () => {
      timer = setTimeout(() => {
        if (ref.current) setInnerLength(ref.current.value.length);
        resize();
      }, 0);
    };
    form.addEventListener('reset', onReset);
    return () => { form.removeEventListener('reset', onReset); clearTimeout(timer); };
  }, [controlled, resize]);

  const handleChange = (event) => {
    if (!controlled) setInnerLength(event.target.value.length);
    resize();
    if (onChange) onChange(event);
  };

  // Clicks on the icon, suffix or padding still put the caret in the field.
  const handleMouseDown = (event) => {
    if (disabled || !ref.current || event.target === ref.current) return;
    event.preventDefault();
    ref.current.focus();
  };

  const control = {
    id: fieldId,
    ref: setRef,
    className: 'sw-textfield__input',
    disabled,
    readOnly,
    maxLength,
    value,
    defaultValue,
    onChange: handleChange,
    'aria-invalid': hasError || undefined,
    'aria-describedby': cx(describedBy, showSuffix && suffixId, message && msgId, showCount && countId) || undefined,
    ...rest,
  };

  const iconSize = size === 'l' ? 18 : 16;

  return (
    <div
      className={cx(
        'sw-textfield',
        `sw-textfield--${size}`,
        multiline && 'sw-textfield--multiline',
        hasError && 'is-error',
        disabled && 'is-disabled',
        readOnly && 'is-readonly',
        className,
      )}
      style={style}
    >
      {(label || optional) && (
        <div className="sw-textfield__head">
          {label && <label className="sw-textfield__label" htmlFor={fieldId}>{label}</label>}
          {optional && <span className="sw-textfield__optional">{optionalLabel}</span>}
        </div>
      )}
      <div className="sw-textfield__control" onMouseDown={handleMouseDown}>
        {!multiline && icon && <Icon name={icon} size={iconSize} className="sw-textfield__icon" />}
        {multiline ? <textarea rows={rows} {...control} /> : <input type="text" {...control} />}
        {showSuffix && <span id={suffixId} className="sw-textfield__suffix">{suffix}</span>}
      </div>
      {(message || showCount) && (
        <div className="sw-textfield__foot">
          {/* a new error mounts as role="alert" (keyed apart from the hint) so it is announced once */}
          {message && hasError && (
            <p key="error" id={msgId} role="alert" className="sw-textfield__msg sw-textfield__msg--error">
              <Icon name="alert-circle" size={14} className="sw-textfield__msg-icon" />
              <span>{message}</span>
            </p>
          )}
          {message && !hasError && (
            <p key="hint" id={msgId} className="sw-textfield__msg">{message}</p>
          )}
          {showCount && (
            <span id={countId} className={cx('sw-textfield__count', length >= maxLength && 'is-full')}>
              {formatNumber(length)} / {formatNumber(maxLength)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
