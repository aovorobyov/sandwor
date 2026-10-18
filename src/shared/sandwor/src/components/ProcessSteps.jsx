import React from 'react';
import { Icon } from './Icon.jsx';
import { Badge } from './Badge.jsx';
import { cx } from '../utils.js';

const LABELS = { list: 'Этапы работы', done: 'выполнено', current: 'идёт сейчас', duration: 'Срок' };
const pad = (n) => String(n).padStart(2, '0');

/**
 * «Как мы работаем» — a real, numbered sequence. Each step has a port (01, 02…),
 * a 1px connector to the next step, a title, a line of text and a duration tag.
 * `current` (0-based) marks the step in progress: earlier steps get a check and
 * the path up to the current step turns amber.
 * Row of equal columns on desktop, a vertical list with the connector on the left
 * on mobile (orientation="auto").
 */
export function ProcessSteps({
  steps = [],
  current,
  onCanvas = false,
  orientation = 'auto',
  headingLevel = 3,
  labels,
  className,
  style,
  ...rest
}) {
  const L = { ...LABELS, ...labels };
  const hasCurrent = typeof current === 'number' && current >= 0;
  const Heading = `h${Math.min(6, Math.max(2, headingLevel))}`;
  const last = steps.length - 1;

  return (
    <ol
      className={cx(
        'sw-process',
        `sw-process--${orientation}`,
        onCanvas && 'sw-process--canvas sw-canvas sw-canvas--bordered',
        className,
      )}
      aria-label={L.list}
      style={{ '--sw-process-n': Math.max(1, steps.length), ...style }}
      {...rest}
    >
      {steps.map((step, i) => {
        const state = !hasCurrent ? 'todo' : i < current ? 'done' : i === current ? 'current' : 'todo';
        return (
          <li
            key={step.id || i}
            className={cx('sw-process__step', `sw-process__step--${state}`, step.className)}
            aria-current={state === 'current' ? 'step' : undefined}
          >
            <span className="sw-process__port" aria-hidden="true">
              {state === 'done' ? <Icon name="check" size={16} /> : pad(i + 1)}
            </span>
            {i < last && (
              <span className={cx('sw-process__edge', hasCurrent && i < current && 'is-live')} aria-hidden="true" />
            )}
            <Heading className="sw-process__title">
              {step.title}
              {state === 'done' && <span className="sw-sr-only">{` — ${L.done}`}</span>}
              {state === 'current' && <span className="sw-sr-only">{` — ${L.current}`}</span>}
            </Heading>
            {step.text && <p className="sw-process__text">{step.text}</p>}
            {step.duration && (
              <p className="sw-process__meta">
                <span className="sw-sr-only">{`${L.duration}: `}</span>
                <Badge variant="tag" icon="clock">{step.duration}</Badge>
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
