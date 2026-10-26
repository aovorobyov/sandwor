'use client';
import React, { useId, useState } from 'react';
import { Icon } from './Icon.jsx';
import { Button } from './Button.jsx';
import { ChipGroup } from './ChipGroup.jsx';
import { Slider } from './Slider.jsx';
import { Checkbox } from './Checkbox.jsx';
import { SegmentedControl } from './SegmentedControl.jsx';
import { cx, formatNumber } from '../utils.js';

const NB = ' ';
const ORDER = ['crm', 'sites', 'smm', 'ai'];

const DEFAULT_PRICES = {
  crmBase: 45000,
  crmPerManager: 1500,
  crmIncluded: 5,
  sites: 60000,
  smmMonth: 35000,
  ai: 30000,
};

const DEFAULT_INTEGRATIONS = [
  { value: 'forms', label: 'Формы сайта и квизы', price: 8000 },
  { value: 'telephony', label: 'IP-телефония', price: 12000 },
  { value: 'erp', label: '1С и склад', price: 18000 },
];

/** Launch terms per service; `days` only orders them — the longest one wins. */
const DEFAULT_TERMS = {
  crm: { text: '7–10 дней', days: 10 },
  sites: { text: '2–3 недели', days: 21 },
  smm: { text: '5–7 дней', days: 7 },
  ai: { text: 'от 5 дней', days: 5 },
};

const DEFAULT_COPY = {
  services: 'Что нужно',
  servicesHint: 'Можно несколько',
  managers: 'Сколько менеджеров в CRM',
  integrations: 'Интеграции',
  months: 'Срок ведения',
  caption: 'Предварительная оценка',
  from: 'от',
  term: 'Срок запуска',
  approx: '≈',
  cta: 'Обсудить расчёт',
  note: 'Точная цена — после бесплатного аудита',
  empty: 'Отметьте, что нужно, — посчитаем стоимость и срок.',
  emptyTotal: 'Услуги не выбраны',
  serviceLabels: {},
  managersText: (n) => `${n}${NB}${plural(n, ['менеджер', 'менеджера', 'менеджеров'])}`,
  monthsText: (n) => `${n}${NB}${plural(Number(n), ['месяц', 'месяца', 'месяцев'])}`,
  managersHint: (included, perManager) =>
    `До${NB}${included} менеджеров входят в${NB}базовую настройку, каждый следующий${NB}— +${formatNumber(perManager)}${NB}₽`,
  perMonth: (price) => `${formatNumber(price)}${NB}₽ в${NB}месяц`,
  lines: {
    crm: 'Внедрение CRM',
    sites: 'Разработка сайта',
    smm: 'SMM и контент',
    ai: 'ИИ-автоматизации',
  },
};

const SERVICE_OPTIONS = [
  { value: 'crm', service: 'crm' },
  { value: 'sites', service: 'sites', label: 'Сайт' },
  { value: 'smm', service: 'smm' },
  { value: 'ai', service: 'ai' },
];

const MONTHS = ['1', '3', '6'];

const DEFAULT_VALUE = { services: ['crm'], managers: 8, integrations: [], months: '3' };

/** Russian plural: plural(3, ['менеджер', 'менеджера', 'менеджеров']) → 'менеджера'. */
function plural(n, forms) {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return forms[2];
  if (b === 1) return forms[0];
  if (b > 1 && b < 5) return forms[1];
  return forms[2];
}

function normalize(v) {
  const src = { ...DEFAULT_VALUE, ...(v || {}) };
  return {
    services: ORDER.filter((s) => (src.services || []).includes(s)),
    managers: Number(src.managers) || DEFAULT_VALUE.managers,
    integrations: Array.isArray(src.integrations) ? src.integrations : [],
    months: MONTHS.includes(String(src.months)) ? String(src.months) : DEFAULT_VALUE.months,
  };
}

/** Pure pricing: values → { total, term, lines }. */
function estimate(v, prices, integrations, terms, copy) {
  const lines = [];
  const has = (s) => v.services.includes(s);
  if (has('crm')) {
    const extra = Math.max(0, v.managers - prices.crmIncluded);
    lines.push({ key: 'crm', label: copy.lines.crm, meta: copy.managersText(v.managers), value: prices.crmBase + extra * prices.crmPerManager });
    integrations.forEach((i) => {
      if (v.integrations.includes(i.value)) lines.push({ key: `int-${i.value}`, label: i.label, value: i.price, sub: true });
    });
  }
  if (has('sites')) lines.push({ key: 'sites', label: copy.lines.sites, value: prices.sites });
  if (has('smm')) lines.push({ key: 'smm', label: copy.lines.smm, meta: copy.monthsText(v.months), value: prices.smmMonth * Number(v.months) });
  if (has('ai')) lines.push({ key: 'ai', label: copy.lines.ai, value: prices.ai });

  const chosen = v.services.map((s) => terms[s]).filter(Boolean);
  let term = null;
  if (chosen.length) {
    const longest = chosen.reduce((a, b) => (b.days > a.days ? b : a));
    term = chosen.length > 1 ? `${copy.approx}${NB}${longest.text}` : longest.text;
  }
  const total = lines.reduce((sum, l) => sum + l.value, 0);
  return { total, term, lines, services: v.services };
}

function Money({ value, className }) {
  return (
    <span className={className}>
      {formatNumber(value)}
      <span className="sw-calc__rub">{NB}₽</span>
    </span>
  );
}

/**
 * Interactive cost estimate: inputs on the left (services, CRM seats,
 * integrations, SMM term), a sticky result panel on the right that updates
 * live. Uncontrolled by default (`defaultValue`), controlled with
 * `value` + `onChange(value, estimate)`.
 */
export function Calculator({
  value,
  defaultValue,
  onChange,
  onCta,
  ctaHref,
  prices: pricesProp,
  integrations = DEFAULT_INTEGRATIONS,
  terms: termsProp,
  copy: copyProp,
  sticky = true,
  className,
  ...rest
}) {
  const uid = useId().replace(/:/g, '');
  const copy = { ...DEFAULT_COPY, ...(copyProp || {}), lines: { ...DEFAULT_COPY.lines, ...((copyProp && copyProp.lines) || {}) } };
  const prices = { ...DEFAULT_PRICES, ...(pricesProp || {}) };
  const terms = { ...DEFAULT_TERMS, ...(termsProp || {}) };

  const controlled = value !== undefined;
  const [inner, setInner] = useState(() => normalize(defaultValue));
  const v = controlled ? normalize(value) : inner;
  const est = estimate(v, prices, integrations, terms, copy);

  const update = (patch) => {
    const next = normalize({ ...v, ...patch });
    if (!controlled) setInner(next);
    if (onChange) onChange(next, estimate(next, prices, integrations, terms, copy));
  };

  const toggleIntegration = (key, on) => {
    const set = new Set(v.integrations);
    if (on) set.add(key);
    else set.delete(key);
    update({ integrations: integrations.map((i) => i.value).filter((k) => set.has(k)) });
  };

  const hasCrm = v.services.includes('crm');
  const hasSmm = v.services.includes('smm');
  const empty = v.services.length === 0;
  const ids = {
    services: `sw-calc-${uid}-services`,
    managersHint: `sw-calc-${uid}-mhint`,
    months: `sw-calc-${uid}-months`,
    caption: `sw-calc-${uid}-caption`,
  };

  return (
    <div className={cx('sw-calc', sticky && 'sw-calc--sticky', className)} {...rest}>
      <div className="sw-calc__inputs">
        <div className="sw-calc__field">
          <div className="sw-calc__head">
            <span id={ids.services} className="sw-calc__label">{copy.services}</span>
            {copy.servicesHint && <span className="sw-calc__aside">{copy.servicesHint}</span>}
          </div>
          <ChipGroup
            multiple
            options={SERVICE_OPTIONS.map((o) =>
              copy.serviceLabels[o.value] ? { ...o, label: copy.serviceLabels[o.value] } : o,
            )}
            value={v.services}
            onChange={(services) => update({ services })}
            aria-labelledby={ids.services}
          />
        </div>

        {hasCrm && (
          <div className="sw-calc__field">
            <Slider
              label={copy.managers}
              min={1}
              max={50}
              value={v.managers}
              onChange={(managers) => update({ managers })}
              format={copy.managersText}
              aria-describedby={ids.managersHint}
            />
            <p id={ids.managersHint} className="sw-calc__hint">
              {copy.managersHint(prices.crmIncluded, prices.crmPerManager)}
            </p>
          </div>
        )}

        {hasCrm && integrations.length > 0 && (
          <fieldset className="sw-calc__fieldset">
            <legend className="sw-calc__label sw-calc__legend">{copy.integrations}</legend>
            <ul className="sw-calc__options">
              {integrations.map((i) => {
                const id = `sw-calc-${uid}-int-${i.value}`;
                const on = v.integrations.includes(i.value);
                return (
                  <li key={i.value} className={cx('sw-calc__option', on && 'is-on')}>
                    <Checkbox
                      id={id}
                      className="sw-calc__check"
                      label={i.label}
                      checked={on}
                      onChange={(e) => toggleIntegration(i.value, e.target.checked)}
                      aria-describedby={`${id}-price`}
                    />
                    <label id={`${id}-price`} htmlFor={id} className="sw-calc__price">
                      +{formatNumber(i.price)}<span className="sw-calc__rub">{NB}₽</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        )}

        {hasSmm && (
          <div className="sw-calc__field">
            <div className="sw-calc__head">
              <span id={ids.months} className="sw-calc__label">{copy.months}</span>
              <span className="sw-calc__aside">{copy.perMonth(prices.smmMonth)}</span>
            </div>
            <SegmentedControl
              block
              options={MONTHS.map((m) => ({ value: m, label: copy.monthsText(m) }))}
              value={v.months}
              onChange={(months) => update({ months })}
              aria-labelledby={ids.months}
            />
          </div>
        )}
      </div>

      <section className={cx('sw-calc__result', empty && 'is-empty')} aria-labelledby={ids.caption}>
        <h3 id={ids.caption} className="sw-calc__caption">{copy.caption}</h3>
        <p className="sw-calc__total" aria-live="polite" aria-atomic="true">
          {empty ? (
            <>
              <span className="sw-calc__dash" aria-hidden="true">—</span>
              <span className="sw-sr-only">{copy.emptyTotal}</span>
            </>
          ) : (
            <>
              <span className="sw-calc__from">{copy.from}</span>
              {NB}
              <Money value={est.total} className="sw-calc__sum" />
            </>
          )}
        </p>

        {empty ? (
          <p className="sw-calc__empty">{copy.empty}</p>
        ) : (
          <>
            <p className="sw-calc__term">
              <Icon name="clock" size={16} className="sw-calc__term-icon" />
              <span className="sw-calc__term-label">{copy.term}</span>
              <span className="sw-calc__term-value">{est.term}</span>
            </p>
            <ul className="sw-calc__lines">
              {est.lines.map((l) => (
                <li key={l.key} className={cx('sw-calc__line', l.sub && 'sw-calc__line--sub')}>
                  <span className="sw-calc__line-label">
                    {l.label}
                    {l.meta && <span className="sw-calc__line-meta">{` · ${l.meta}`}</span>}
                  </span>
                  <Money value={l.value} className="sw-calc__line-value" />
                </li>
              ))}
            </ul>
          </>
        )}

        <Button
          variant="primary"
          size="l"
          block
          className="sw-calc__cta"
          href={empty ? undefined : ctaHref}
          disabled={empty}
          onClick={onCta ? () => onCta(est, v) : undefined}
        >
          {copy.cta}
        </Button>
        {copy.note && <p className="sw-calc__note">{copy.note}</p>}
      </section>
    </div>
  );
}
