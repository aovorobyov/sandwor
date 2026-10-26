'use client';
import React, { useCallback, useEffect, useId, useRef } from 'react';
import { Icon } from './Icon.jsx';
import { cx } from '../utils.js';

function assignRef(ref, node) {
  if (typeof ref === 'function') ref(node);
  else if (ref) ref.current = node;
}

/**
 * Shared body of Checkbox and Radio: a real <input> (visually hidden, still
 * focusable and clickable) over a drawn 18px box, a 15/23 label and an optional
 * description. `className`/`style` go to the <label> root; the rest — name,
 * value, checked, defaultChecked, onChange, required — to the native input.
 */
function ChoiceControl({
  type,
  label,
  description,
  error,
  indeterminate = false,
  disabled = false,
  id,
  inputRef,
  className,
  style,
  children,
  'aria-describedby': describedBy,
  ...rest
}) {
  const autoId = useId();
  const inputId = id || `sw-${type === 'radio' ? 'rd' : 'cb'}-${autoId.replace(/:/g, '')}`;
  const labelId = `${inputId}-label`;
  const descId = `${inputId}-desc`;
  const msgId = `${inputId}-msg`;
  const ref = useRef(null);

  const text = label != null ? label : children;
  const hasText = text != null && text !== false;
  const hasError = Boolean(error);
  const errorText = error === true ? null : error || null;
  const isCheckbox = type === 'checkbox';

  const setRef = useCallback((node) => {
    ref.current = node;
    assignRef(inputRef, node);
  }, [inputRef]);

  // `indeterminate` exists only as a DOM property, never as an attribute.
  useEffect(() => {
    if (ref.current && isCheckbox) ref.current.indeterminate = Boolean(indeterminate);
  }, [indeterminate, isCheckbox]);

  return (
    <label
      className={cx(
        'sw-checkbox',
        type === 'radio' && 'sw-checkbox--radio',
        !hasText && !description && 'sw-checkbox--bare',
        isCheckbox && indeterminate && 'is-indeterminate',
        hasError && 'is-error',
        disabled && 'is-disabled',
        className,
      )}
      style={style}
      htmlFor={inputId}
    >
      <input
        ref={setRef}
        id={inputId}
        type={type}
        className="sw-checkbox__input"
        disabled={disabled}
        aria-labelledby={hasText ? labelId : undefined}
        aria-describedby={cx(describedBy, description && descId, errorText && msgId) || undefined}
        aria-invalid={hasError || undefined}
        {...rest}
      />
      <span className="sw-checkbox__box" aria-hidden="true">
        {isCheckbox && (
          <>
            <Icon name="check" size={14} className="sw-checkbox__mark sw-checkbox__mark--check" />
            <Icon name="minus" size={14} className="sw-checkbox__mark sw-checkbox__mark--minus" />
          </>
        )}
      </span>
      {(hasText || description || errorText) && (
        <span className="sw-checkbox__body">
          {hasText && <span id={labelId} className="sw-checkbox__label">{text}</span>}
          {description && <span id={descId} className="sw-checkbox__desc">{description}</span>}
          {errorText && (
            <span id={msgId} role="alert" className="sw-checkbox__msg">
              <Icon name="alert-circle" size={14} className="sw-checkbox__msg-icon" />
              <span>{errorText}</span>
            </span>
          )}
        </span>
      )}
    </label>
  );
}

/**
 * Checkbox: an independent yes/no («Удобнее в Telegram», «Нужен созвон»).
 * `indeterminate` shows a minus for a parent whose children are partly on.
 */
export function Checkbox(props) {
  return <ChoiceControl {...props} type="checkbox" />;
}

/**
 * Radio: one of a few mutually exclusive options. Give every Radio in a set the
 * same `name` and wrap the set in <fieldset> + <legend> (or role="radiogroup"
 * with aria-labelledby) — arrow keys then move between them natively.
 */
export function Radio({ indeterminate, ...props }) {
  return <ChoiceControl {...props} type="radio" />;
}
