'use client';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from './Icon.jsx';
import { Button } from './Button.jsx';
import { cx } from '../utils.js';

const TONE_ICON = { success: 'circle-check', error: 'alert-circle', neutral: 'info-circle' };
const LEAVE_MS = 240; // = --duration-slow

/**
 * One short message about something that just happened. Error toasts are
 * role="alert"; others are announced by the polite ToastViewport around them.
 * With `duration` and `onClose` it closes itself; hover and focus pause the timer.
 */
export function Toast({
  tone = 'neutral',
  title,
  description,
  action,
  onClose,
  closeLabel = 'Закрыть',
  duration = 0,
  paused = false,
  leaving = false,
  className,
  children,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  onKeyDown,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const remaining = useRef(duration);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const rootRef = useRef(null);

  const stopped = paused || hover || focusWithin || leaving;
  useEffect(() => {
    if (!duration || stopped || !closeRef.current) return undefined;
    const started = Date.now();
    const t = setTimeout(() => closeRef.current && closeRef.current(), Math.max(0, remaining.current));
    return () => {
      clearTimeout(t);
      remaining.current -= Date.now() - started;
    };
  }, [duration, stopped]);

  // If focus is inside when the toast closes, hand it to the next toast or the viewport.
  const close = () => {
    const el = rootRef.current;
    if (el && el.contains(document.activeElement)) {
      const vp = el.closest('.sw-toast-viewport');
      const next = el.nextElementSibling || el.previousElementSibling;
      const target = (next && next.querySelector('button')) || vp;
      if (target) target.focus();
    }
    if (onClose) onClose();
  };

  return (
    <div
      ref={rootRef}
      className={cx('sw-toast', `sw-toast--${tone}`, leaving && 'is-leaving', className)}
      role={tone === 'error' ? 'alert' : undefined}
      aria-hidden={leaving || undefined}
      onPointerEnter={(e) => { if (e.pointerType !== 'touch') setHover(true); if (onPointerEnter) onPointerEnter(e); }}
      onPointerLeave={(e) => { setHover(false); if (onPointerLeave) onPointerLeave(e); }}
      onFocus={(e) => { setFocusWithin(true); if (onFocus) onFocus(e); }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocusWithin(false); if (onBlur) onBlur(e); }}
      onKeyDown={(e) => { if (e.key === 'Escape' && onClose) { e.stopPropagation(); close(); } if (onKeyDown) onKeyDown(e); }}
      {...rest}
    >
      <Icon name={TONE_ICON[tone] || TONE_ICON.neutral} size={20} className="sw-toast__icon" />
      <div className="sw-toast__body">
        {title != null && <div className="sw-toast__title">{title}</div>}
        {description != null && <div className="sw-toast__desc">{description}</div>}
        {children}
        {action && action.label && (
          <Button variant="ghost" size="s" className="sw-toast__action" onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </div>
      {onClose && (
        <Button
          variant="quiet"
          size="s"
          icon="x"
          iconOnly
          aria-label={closeLabel}
          className="sw-toast__close"
          onClick={close}
        />
      )}
    </div>
  );
}

/**
 * The stack region for toasts: bottom-right on desktop, full-width bottom on mobile.
 * `contained` positions it inside the nearest positioned parent (previews, demos).
 */
export function ToastViewport({ contained = false, label = 'Уведомления', className, children, ...rest }) {
  return (
    <div
      role="region"
      aria-label={label}
      aria-live="polite"
      tabIndex={-1}
      className={cx('sw-toast-viewport', contained && 'sw-toast-viewport--contained', className)}
      {...rest}
    >
      {children}
    </div>
  );
}

const ToastContext = createContext(null);
let toastSeq = 0;

/**
 * Put once near the root. Renders the children and a ToastViewport;
 * `useToast()` inside gives { show, dismiss }.
 */
export function ToastProvider({ children, duration = 5000, max = 3, contained = false, label = 'Уведомления' }) {
  const [toasts, setToasts] = useState([]);
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const timers = useRef({});

  useEffect(() => () => Object.values(timers.current).forEach(clearTimeout), []);

  const dismiss = useCallback((id) => {
    setToasts((list) => list.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    clearTimeout(timers.current[id]);
    timers.current[id] = setTimeout(() => {
      delete timers.current[id];
      setToasts((list) => list.filter((t) => t.id !== id));
    }, LEAVE_MS);
  }, []);

  const show = useCallback(
    (opts = {}) => {
      toastSeq += 1;
      const id = opts.id || `sw-toast-${toastSeq}`;
      const toast = { tone: 'neutral', duration, ...opts, id, leaving: false };
      setToasts((list) => {
        const rest = list.filter((t) => t.id !== id);
        const live = rest.filter((t) => !t.leaving);
        const overflow = live.length + 1 - max;
        const dropped = overflow > 0 ? new Set(live.slice(0, overflow).map((t) => t.id)) : null;
        return [...rest.filter((t) => !dropped || !dropped.has(t.id)), toast];
      });
      return id;
    },
    [duration, max],
  );

  const api = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <ToastViewport
        contained={contained}
        label={label}
        onPointerEnter={(e) => { if (e.pointerType !== 'touch') setHover(true); }}
        onPointerLeave={() => setHover(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}
      >
        {toasts.map((t) => (
          <Toast
            key={t.id}
            tone={t.tone}
            title={t.title}
            description={t.description}
            duration={t.duration}
            paused={hover || focused}
            leaving={t.leaving}
            closeLabel={t.closeLabel}
            action={
              t.action && {
                label: t.action.label,
                onClick: (e) => {
                  if (t.action.onClick) t.action.onClick(e);
                  dismiss(t.id);
                },
              }
            }
            onClose={() => dismiss(t.id)}
          />
        ))}
      </ToastViewport>
    </ToastContext.Provider>
  );
}

/** { show({ tone, title, description, action: { label, onClick }, duration }) → id, dismiss(id) } */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast: оберните приложение в <ToastProvider>');
  return ctx;
}
