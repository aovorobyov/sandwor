'use client';
import React, {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { Icon } from './Icon.jsx';
import { cx } from '../utils.js';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
const EDGE = 8; // keep the bubble this far from the viewport edge
const GAP = 10; // trigger → bubble distance (matches CSS)

/**
 * A wrapped `width: max-content` box keeps its full max-width and leaves a gap on
 * the right of shorter lines. Shrink it to the longest line; `text-wrap: balance`
 * in the CSS keeps the same line breaks at that width.
 */
function fitToLines(bubble, content) {
  if (!content || typeof document.createRange !== 'function') return;
  const range = document.createRange();
  range.selectNodeContents(content);
  const rects = Array.prototype.filter.call(range.getClientRects(), (r) => r.width > 0);
  if (new Set(rects.map((r) => Math.round(r.top))).size < 2) return; // one line is already tight
  const left = Math.min(...rects.map((r) => r.left));
  const right = Math.max(...rects.map((r) => r.right));
  const cs = window.getComputedStyle(bubble);
  const chrome = ['paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth']
    .reduce((sum, k) => sum + (parseFloat(cs[k]) || 0), 0);
  const width = Math.ceil(right - left + chrome);
  if (width < bubble.offsetWidth) bubble.style.width = `${width}px`;
}

/**
 * A short plain-text hint for the trigger it wraps. Opens on hover after `delay`
 * and immediately on keyboard focus; closes on Esc, blur and mouse leave.
 * On touch, a tap toggles it. Never put links or buttons inside.
 */
export function Tooltip({
  content,
  type = 'description',
  placement = 'top',
  delay = 300,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  id: idProp,
  className,
  children,
  ...rest
}) {
  const autoId = useId();
  const id = idProp || `sw-tooltip-${autoId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const controlled = openProp !== undefined;
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const open = !disabled && Boolean(controlled ? openProp : innerOpen);
  const [fit, setFit] = useState({ place: placement, shift: 0 });
  const rootRef = useRef(null);
  const bubbleRef = useRef(null);
  const contentRef = useRef(null);
  const timer = useRef(null);
  const [fontsTick, setFontsTick] = useState(0);

  const setOpen = useCallback(
    (next) => {
      clearTimeout(timer.current);
      if (!controlled) setInnerOpen(next);
      if (onOpenChange) onOpenChange(next);
    },
    [controlled, onOpenChange],
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  // Esc closes from anywhere; a tap outside closes a tap-opened tooltip.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open, setOpen]);

  // Web fonts change line widths: measure once more when they have loaded.
  useEffect(() => {
    if (!open || !document.fonts || document.fonts.status === 'loaded') return undefined;
    let alive = true;
    document.fonts.ready.then(() => { if (alive) setFontsTick((n) => n + 1); });
    return () => { alive = false; };
  }, [open]);

  // Fit the bubble to its lines, then keep it inside the viewport: flip left/right, slide top/bottom.
  useIsoLayoutEffect(() => {
    const bubble = bubbleRef.current;
    if (!bubble) return;
    bubble.style.width = '';
    if (!open || !rootRef.current) return;
    fitToLines(bubble, contentRef.current);
    const vw = document.documentElement.clientWidth || window.innerWidth;
    const r = rootRef.current.getBoundingClientRect();
    const bw = bubbleRef.current.offsetWidth;
    let place = placement;
    if (place === 'left' && r.left - GAP - bw < EDGE) place = r.right + GAP + bw <= vw - EDGE ? 'right' : 'top';
    if (place === 'right' && r.right + GAP + bw > vw - EDGE) place = r.left - GAP - bw >= EDGE ? 'left' : 'top';
    let shift = 0;
    if (place === 'top' || place === 'bottom') {
      const center = r.left + r.width / 2;
      const left = center - bw / 2;
      const right = center + bw / 2;
      if (left < EDGE) shift = EDGE - left;
      else if (right > vw - EDGE) shift = vw - EDGE - right;
      shift = Math.round(shift);
    }
    setFit((prev) => (prev.place === place && prev.shift === shift ? prev : { place, shift }));
  }, [open, placement, content, fontsTick]);

  const onPointerEnter = (e) => {
    if (e.pointerType === 'touch' || disabled) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), delay);
  };
  const onPointerLeave = (e) => {
    if (e.pointerType === 'touch') return;
    setOpen(false);
  };
  const onPointerDown = (e) => {
    if (e.pointerType === 'touch' && !disabled) setOpen(!open);
  };
  const onFocus = () => {
    if (!disabled) setOpen(true);
  };
  const onBlur = (e) => {
    if (!rootRef.current || !rootRef.current.contains(e.relatedTarget)) setOpen(false);
  };

  // description: the bubble adds detail to the trigger's own name;
  // label: the bubble IS the name (icon-only buttons) — no aria-label needed then.
  const relation = type === 'label' ? 'aria-labelledby' : 'aria-describedby';
  const trigger = isValidElement(children) ? (
    cloneElement(children, { [relation]: cx(children.props[relation], id) })
  ) : (
    <span className="sw-tooltip__text" tabIndex={0} {...{ [relation]: id }}>
      {children}
    </span>
  );

  const place = open ? fit.place : placement;
  return (
    <span
      ref={rootRef}
      className={cx('sw-tooltip', open && 'is-open', className)}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onFocus={onFocus}
      onBlur={onBlur}
      {...rest}
    >
      {trigger}
      <span
        ref={bubbleRef}
        id={id}
        role="tooltip"
        className={cx('sw-tooltip__bubble', `sw-tooltip__bubble--${place}`, open && 'is-open')}
        style={fit.shift && open ? { '--sw-tooltip-shift': `${fit.shift}px` } : undefined}
      >
        <span ref={contentRef} className="sw-tooltip__content">{content}</span>
        <span className="sw-tooltip__arrow" aria-hidden="true" />
      </span>
    </span>
  );
}

/**
 * The small «i» trigger that sits next to a term. `label` names what it explains:
 * «Что такое сквозная аналитика».
 */
export function TooltipInfo({ label, icon = 'info-circle', className, ...rest }) {
  return (
    <button type="button" className={cx('sw-tooltip__info', className)} aria-label={label} {...rest}>
      <Icon name={icon} size={16} />
    </button>
  );
}
