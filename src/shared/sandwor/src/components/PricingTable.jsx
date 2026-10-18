'use client';
import React, { useId, useState } from 'react';
import { Icon } from './Icon.jsx';
import { Button } from './Button.jsx';
import { Badge } from './Badge.jsx';
import { Tooltip, TooltipInfo } from './Tooltip.jsx';
import { SegmentedControl } from './SegmentedControl.jsx';
import { cx, formatRub } from '../utils.js';

const NBSP = ' ';
const LABELS = {
  caption: 'Сравнение тарифов',
  yes: 'есть',
  no: 'нет',
  pick: 'Тариф',
  cta: 'Выбрать',
  hint: (label) => `Подробнее: ${label}`,
};

function priceText(price) {
  return typeof price === 'number' ? `от${NBSP}${formatRub(price)}` : price;
}

function Value({ value, labels }) {
  if (value === true) return <Icon name="check" size={18} label={labels.yes} className="sw-ptable__yes" />;
  if (value === false || value == null) {
    return (
      <span className="sw-ptable__no" role="img" aria-label={labels.no}>
        —
      </span>
    );
  }
  return <span className="sw-ptable__str">{value}</span>;
}

function Label({ row, labels }) {
  return (
    <>
      {row.label}
      {row.hint && (
        <>
          {NBSP}
          <Tooltip content={row.hint} open={row.hintOpen} className="sw-ptable__hint">
            <TooltipInfo label={labels.hint(typeof row.label === 'string' ? row.label : '')} />
          </Tooltip>
        </>
      )}
    </>
  );
}

function Cta({ plan, size, block, nameId, labels, onSelect }) {
  const cta = typeof plan.cta === 'string' || plan.cta == null ? { label: plan.cta || labels.cta } : plan.cta;
  return (
    <Button
      variant={plan.featured ? 'primary' : 'secondary'}
      size={size}
      block={block}
      href={cta.href}
      aria-describedby={nameId}
      onClick={(e) => {
        if (cta.onClick) cta.onClick(e);
        if (onSelect) onSelect(plan.id);
      }}
    >
      {cta.label}
    </Button>
  );
}

/**
 * Plan comparison. Desktop: a real <table> with a sticky header row (name, price,
 * CTA), feature rows grouped under mono titles, the featured plan framed in
 * accent-line. ≤760px (layout="auto"): a SegmentedControl picks one plan and its
 * features are listed as label / value pairs.
 */
export function PricingTable({
  plans = [],
  groups = [],
  layout = 'auto',
  plan: planProp,
  defaultPlan,
  onPlanChange,
  onSelect,
  labels,
  className,
  ...rest
}) {
  const L = { ...LABELS, ...labels };
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const featured = plans.find((p) => p.featured);
  const [inner, setInner] = useState(
    defaultPlan !== undefined ? defaultPlan : (featured || plans[0] || {}).id,
  );
  const controlled = planProp !== undefined;
  const selectedId = controlled ? planProp : inner;
  const selIndex = Math.max(0, plans.findIndex((p) => p.id === selectedId));
  const sel = plans[selIndex];
  const hasBadge = plans.some((p) => p.badge);

  const pick = (id) => {
    if (!controlled) setInner(id);
    if (onPlanChange) onPlanChange(id);
  };

  const nameId = (p, where) => `sw-ptable-${uid}-${where}-${p.id}`;

  return (
    <div className={cx('sw-ptable', `sw-ptable--${layout}`, className)} {...rest}>
      {/* ── table (desktop) ── */}
      <table className="sw-ptable__table">
        <caption className="sw-sr-only">{L.caption}</caption>
        <colgroup>
          <col className="sw-ptable__col-label" />
          {plans.map((p) => (
            <col key={p.id} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <td className="sw-ptable__corner" />
            {plans.map((p) => (
              <th key={p.id} scope="col" className={cx('sw-ptable__plan', p.featured && 'is-featured')}>
                <span className="sw-ptable__plan-in">
                  {hasBadge && (
                    <span className="sw-ptable__flag">
                      {p.badge && <Badge variant="feature" size="s">{p.badge}</Badge>}
                    </span>
                  )}
                  <span className="sw-ptable__name" id={nameId(p, 't')}>{p.name}</span>
                  <span className="sw-ptable__price">{priceText(p.price)}</span>
                  {p.term && <span className="sw-ptable__term">{p.term}</span>}
                  <span className="sw-ptable__cta">
                    <Cta plan={p} size="s" nameId={nameId(p, 't')} labels={L} onSelect={onSelect} />
                  </span>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        {groups.map((g, gi) => (
          <tbody key={g.id || gi} className="sw-ptable__body">
            {g.title && (
              <tr className="sw-ptable__group">
                <th scope="rowgroup" className="sw-ptable__group-title">{g.title}</th>
                {plans.map((p) => (
                  <td key={p.id} className={cx(p.featured && 'is-featured')} />
                ))}
              </tr>
            )}
            {g.rows.map((row, ri) => (
              <tr key={row.id || ri} className={cx('sw-ptable__row', row.className)}>
                <th scope="row" className="sw-ptable__label">
                  <Label row={row} labels={L} />
                </th>
                {plans.map((p, pi) => (
                  <td key={p.id} className={cx('sw-ptable__cell', p.featured && 'is-featured')}>
                    <Value value={row.values[pi]} labels={L} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>

      {/* ── one plan at a time (mobile) ── */}
      {sel && (
        <div className="sw-ptable__list">
          <SegmentedControl
            block
            label={L.pick}
            options={plans.map((p) => ({ value: p.id, label: p.name }))}
            value={sel.id}
            onChange={pick}
          />
          <section className={cx('sw-ptable__card', sel.featured && 'is-featured')} aria-labelledby={nameId(sel, 'l')}>
            <div className="sw-ptable__card-head">
              <div className="sw-ptable__card-title">
                <h3 className="sw-ptable__name" id={nameId(sel, 'l')}>{sel.name}</h3>
                {sel.badge && <Badge variant="feature" size="s">{sel.badge}</Badge>}
              </div>
              <div className="sw-ptable__card-price">
                <span className="sw-ptable__price">{priceText(sel.price)}</span>
                {sel.term && <span className="sw-ptable__term">{sel.term}</span>}
              </div>
            </div>
            {groups.map((g, gi) => (
              <div key={g.id || gi} className="sw-ptable__sect">
                {g.title && <p className="sw-ptable__sect-title">{g.title}</p>}
                <dl className="sw-ptable__pairs">
                  {g.rows.map((row, ri) => (
                    <div key={row.id || ri} className="sw-ptable__pair">
                      <dt className="sw-ptable__pair-label">
                        <Label row={row} labels={L} />
                      </dt>
                      <dd className={cx('sw-ptable__pair-value', sel.featured && 'is-featured')}>
                        <Value value={row.values[selIndex]} labels={L} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
            <Cta plan={sel} size="m" block nameId={nameId(sel, 'l')} labels={L} onSelect={onSelect} />
          </section>
        </div>
      )}
    </div>
  );
}
