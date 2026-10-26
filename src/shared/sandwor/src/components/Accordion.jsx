'use client';
import React, { useState, useId } from 'react';
import { Icon } from './Icon.jsx';
import { cx } from '../utils.js';

/**
 * FAQ accordion: a question per row, the answer slides open below it.
 * One open at a time by default; `multiple` lets several stay open.
 * Controlled via `value` (array of open ids) + `onChange(ids)`.
 */
export function Accordion({
  items = [],
  multiple = false,
  defaultOpen,
  value,
  onChange,
  headingLevel = 3,
  className,
  ...rest
}) {
  const uid = useId();
  const [inner, setInner] = useState(() => {
    const ids = defaultOpen == null ? [] : Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen];
    return multiple ? ids : ids.slice(0, 1);
  });
  const controlled = value !== undefined;
  const open = controlled ? value || [] : inner;
  const Heading = `h${Math.min(6, Math.max(2, headingLevel))}`;

  function toggle(id) {
    const isOpen = open.indexOf(id) >= 0;
    let next;
    if (isOpen) next = open.filter((x) => x !== id);
    else next = multiple ? open.concat(id) : [id];
    if (!controlled) setInner(next);
    if (onChange) onChange(next);
  }

  return (
    <div className={cx('sw-acc', className)} {...rest}>
      {items.map((it) => {
        const isOpen = open.indexOf(it.id) >= 0;
        const btnId = `${uid}-q-${it.id}`;
        const panelId = `${uid}-a-${it.id}`;
        return (
          <div key={it.id} className={cx('sw-acc__item', isOpen && 'is-open', it.className)}>
            <Heading className="sw-acc__heading">
              <button
                type="button"
                id={btnId}
                className="sw-acc__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                disabled={it.disabled}
                onClick={() => toggle(it.id)}
              >
                <span className="sw-acc__question">{it.question}</span>
                <span className="sw-acc__tile" aria-hidden="true">
                  <Icon name="plus" size={16} className="sw-acc__icon" />
                </span>
              </button>
            </Heading>
            <div id={panelId} role="region" aria-labelledby={btnId} className="sw-acc__panel">
              <div className="sw-acc__clip">
                <div className="sw-acc__answer">{it.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
