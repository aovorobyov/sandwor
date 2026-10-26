'use client';
import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { cx, formatNumber } from '../utils.js';

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

/**
 * Styled native range input: keyboard, touch and screen-reader behaviour stay
 * the browser's own. The label row shows the formatted value on the right; the
 * filled part of the track follows `--sw-slider-pct`. `className`/`style` go to
 * the wrapper, every other prop (name, aria-*, onBlur…) to the <input type="range">.
 */
export function Slider({
  label,
  value,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  format,
  marks,
  minLabel,
  maxLabel,
  disabled = false,
  id,
  inputRef,
  className,
  style,
  ...rest
}) {
  const autoId = useId();
  const inputId = id || `sw-sl-${autoId.replace(/:/g, '')}`;
  const controlled = value !== undefined;
  const initial = () => clamp(defaultValue !== undefined ? Number(defaultValue) : min, min, max);
  const [inner, setInner] = useState(initial);
  const ref = useRef(null);
  const initialRef = useRef(null);
  if (initialRef.current === null) initialRef.current = initial();

  // Uncontrolled: a native form.reset() brings the thumb back to defaultValue.
  useEffect(() => {
    const form = ref.current && ref.current.form;
    if (controlled || !form) return undefined;
    const onReset = () => setInner(initialRef.current);
    form.addEventListener('reset', onReset);
    return () => form.removeEventListener('reset', onReset);
  }, [controlled]);

  const setRef = useCallback((node) => {
    ref.current = node;
    if (typeof inputRef === 'function') inputRef(node);
    else if (inputRef) inputRef.current = node;
  }, [inputRef]);
  const current = clamp(controlled ? Number(value) : inner, min, max);
  const pct = max > min ? ((current - min) / (max - min)) * 100 : 0;
  const readout = format ? format(current) : formatNumber(current);

  const handleChange = (event) => {
    const next = Number(event.target.value);
    if (!controlled) setInner(next);
    if (onChange) onChange(next, event);
  };

  const at = (v) => (max > min ? ((clamp(v, min, max) - min) / (max - min)) * 100 : 0);
  const markList = (marks || []).map((m) => (typeof m === 'number'
    ? { value: m, label: formatNumber(m) }
    : { value: m.value, label: m.label != null ? m.label : formatNumber(m.value) }));

  return (
    <div className={cx('sw-slider', disabled && 'is-disabled', className)} style={style}>
      {(label || readout != null) && (
        <div className="sw-slider__head">
          {label && <label className="sw-slider__label" htmlFor={inputId}>{label}</label>}
          <span className="sw-slider__value" aria-hidden="true">{readout}</span>
        </div>
      )}
      <input
        ref={setRef}
        id={inputId}
        type="range"
        className="sw-slider__input"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={handleChange}
        disabled={disabled}
        aria-valuetext={typeof readout === 'string' ? readout : undefined}
        style={{ '--sw-slider-pct': pct }}
        {...rest}
      />
      {markList.length > 0 ? (
        <div className="sw-slider__scale sw-slider__scale--marks" aria-hidden="true">
          {markList.map((m) => {
            const p = at(m.value);
            return (
              <span
                key={m.value}
                className={cx(
                  'sw-slider__mark',
                  p <= 0 && 'sw-slider__mark--start',
                  p >= 100 && 'sw-slider__mark--end',
                  m.value === current && 'is-current',
                )}
                style={{ '--sw-slider-mark': p }}
              >
                {m.label}
              </span>
            );
          })}
        </div>
      ) : (
        <div className="sw-slider__scale" aria-hidden="true">
          <span>{minLabel != null ? minLabel : formatNumber(min)}</span>
          <span>{maxLabel != null ? maxLabel : formatNumber(max)}</span>
        </div>
      )}
    </div>
  );
}
