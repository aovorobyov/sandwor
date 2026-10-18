'use client';
import React, { useEffect, useId, useRef, useState } from 'react';
import { Button } from './Button.jsx';
import { Icon } from './Icon.jsx';
import { cx } from '../utils.js';

/** Mirrors --duration-slow: how long the exit transition runs before unmount. */
const EXIT_MS = 240;
const FOCUSABLE = [
  'a[href]', 'area[href]', 'button:not([disabled])', 'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])', 'textarea:not([disabled])', 'iframe', 'audio[controls]', 'video[controls]',
  '[contenteditable]:not([contenteditable="false"])', '[tabindex]',
].join(',');

/** Page-level (not contained) modals that are open, top last. */
const pageStack = [];
let lockCount = 0;
let savedBody = null;

function lockScroll() {
  lockCount += 1;
  if (lockCount > 1) return;
  const body = document.body;
  const gap = window.innerWidth - document.documentElement.clientWidth;
  savedBody = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
  body.style.overflow = 'hidden';
  // keep the layout from jumping when the scrollbar disappears
  if (gap > 0) body.style.paddingRight = `calc(${window.getComputedStyle(body).paddingRight} + ${gap}px)`;
}

function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount > 0 || !savedBody) return;
  document.body.style.overflow = savedBody.overflow;
  document.body.style.paddingRight = savedBody.paddingRight;
  savedBody = null;
}

function focusables(root) {
  if (!root) return [];
  return Array.from(root.querySelectorAll(FOCUSABLE)).filter(
    (el) => el.tabIndex >= 0 && el.getClientRects().length > 0 && !el.closest('[inert]'),
  );
}

/**
 * Dialog over a scrim: title, optional description, body, footer with actions
 * (primary last) and fine print. Traps focus, closes on Esc, on «Закрыть» and on
 * the scrim, returns focus to whatever opened it, locks page scroll. At ≤760px
 * it becomes a bottom sheet. `contained` renders it inside the nearest
 * positioned parent instead of over the page (previews, demos).
 */
export function Modal({
  open = false,
  onClose,
  title,
  description,
  icon,
  iconTone = 'neutral',
  children,
  footer,
  finePrint,
  size = 'm',
  closeOnScrim = true,
  closeOnEsc = true,
  contained = false,
  initialFocus,
  closeLabel = 'Закрыть',
  hideClose = false,
  label,
  id,
  className,
  onKeyDown,
  ...rest
}) {
  const autoId = useId().replace(/:/g, '');
  const baseId = id || `sw-modal-${autoId}`;
  const titleId = `${baseId}-title`;
  const descId = `${baseId}-desc`;

  const [mounted, setMounted] = useState(open);
  // the enter animation plays only for opens after mount (a dialog open on first paint just appears)
  const [animate, setAnimate] = useState(false);
  const panelRef = useRef(null);
  const returnRef = useRef(null);
  const downOnScrim = useRef(false);
  const openAtMount = useRef(open);
  const token = useRef({});
  const didMount = useRef(false);
  useEffect(() => { didMount.current = true; }, []);
  // derived during render so the very first frame of a later open already animates
  if (open && didMount.current && !animate) setAnimate(true);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const initialFocusRef = useRef(initialFocus);
  initialFocusRef.current = initialFocus;

  const close = () => {
    if (onCloseRef.current) onCloseRef.current();
  };

  // Exit: keep the dialog mounted with is-closing until the exit animation is over.
  useEffect(() => {
    if (open) {
      setMounted(true);
      return undefined;
    }
    const timer = setTimeout(() => setMounted(false), EXIT_MS);
    return () => clearTimeout(timer);
  }, [open]);

  // Focus in, scroll lock, focus back out.
  useEffect(() => {
    if (!open) return undefined;
    // a contained demo that is already open on page load does not steal focus
    const moveFocus = !(contained && openAtMount.current);
    openAtMount.current = false;
    returnRef.current = moveFocus ? document.activeElement : null;
    const me = token.current;
    if (!contained) {
      pageStack.push(me);
      lockScroll();
    }
    let raf = 0;
    if (moveFocus) {
      raf = requestAnimationFrame(() => {
        const panel = panelRef.current;
        if (!panel) return;
        const wanted = initialFocusRef.current && initialFocusRef.current.current;
        const body = panel.querySelector('.sw-modal__body');
        const target = wanted || focusables(body)[0] || panel;
        target.focus({ preventScroll: true });
      });
    }
    // page modals: if focus ever lands outside the top dialog, pull it back in
    const onFocusIn = (event) => {
      const panel = panelRef.current;
      if (pageStack[pageStack.length - 1] !== me || !panel || panel.contains(event.target)) return;
      panel.focus({ preventScroll: true });
    };
    if (!contained) document.addEventListener('focusin', onFocusIn);
    return () => {
      cancelAnimationFrame(raf);
      if (!contained) {
        document.removeEventListener('focusin', onFocusIn);
        const i = pageStack.indexOf(me);
        if (i >= 0) pageStack.splice(i, 1);
        unlockScroll();
      }
      const back = returnRef.current;
      returnRef.current = null;
      if (back && typeof back.focus === 'function' && document.contains(back)) back.focus({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleKeyDown = (event) => {
    if (onKeyDown) onKeyDown(event);
    if (event.defaultPrevented || !open) return;
    const panel = panelRef.current;
    if (event.key === 'Escape' && closeOnEsc) {
      event.stopPropagation();
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== 'Tab' || !panel) return;
    const list = focusables(panel);
    if (!list.length) {
      event.preventDefault();
      panel.focus();
      return;
    }
    const first = list[0];
    const last = list[list.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || active === panel || !panel.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !panel.contains(active))) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!open && !mounted) return null;

  const hasBody = children != null && children !== false;
  const hasFoot = Boolean(footer || finePrint);

  return (
    <div
      className={cx(
        'sw-modal',
        `sw-modal--${size}`,
        contained && 'sw-modal--contained',
        icon && 'sw-modal--with-icon',
        !hasBody && 'sw-modal--no-body',
        animate && 'sw-modal--animate',
        !open && 'is-closing',
        className,
      )}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <div
        className="sw-modal__scrim"
        aria-hidden="true"
        onMouseDown={(event) => {
          downOnScrim.current = event.target === event.currentTarget;
          // keep focus inside the dialog when the scrim does not close it
          if (!closeOnScrim) event.preventDefault();
        }}
        onClick={(event) => {
          if (closeOnScrim && downOnScrim.current && event.target === event.currentTarget) close();
          downOnScrim.current = false;
        }}
      />
      <div
        ref={panelRef}
        className="sw-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : label}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
      >
        <div className="sw-modal__head">
          {icon && (
            <span className={cx('sw-modal__icon', `sw-modal__icon--${iconTone}`)} aria-hidden="true">
              <Icon name={icon} size={20} />
            </span>
          )}
          {title && <h2 id={titleId} className="sw-modal__title">{title}</h2>}
          {description && <p id={descId} className="sw-modal__desc">{description}</p>}
          {!hideClose && (
            <Button
              variant="quiet"
              size="s"
              icon="x"
              iconOnly
              aria-label={closeLabel}
              title={closeLabel}
              className="sw-modal__close"
              onClick={close}
            />
          )}
        </div>
        {hasBody && <div className="sw-modal__body">{children}</div>}
        {hasFoot && (
          <div className="sw-modal__foot">
            {footer && <div className="sw-modal__actions">{footer}</div>}
            {finePrint && <p className="sw-modal__fine">{finePrint}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
