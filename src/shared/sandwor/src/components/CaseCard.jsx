import React from 'react';
import { Icon } from './Icon.jsx';
import { Canvas } from './Canvas.jsx';
import { Button } from './Button.jsx';
import { Badge } from './Badge.jsx';
import { cx } from '../utils.js';

const NB = ' ';

/** Default data for the built-in covers (the Кедр case). Override any key via `coverData`. */
const COVER_DEFAULTS = {
  scheme: {
    caption: 'схема внедрения',
    sources: [
      { icon: 'browser', label: 'Сайт' },
      { icon: 'building-store', label: 'Авито' },
      { icon: 'phone', label: 'Звонки' },
    ],
    hub: { icon: 'layout-kanban', title: 'amoCRM', meta: 'воронка · 6 этапов' },
    bot: { icon: 'cpu', label: 'Бот-квалификатор' },
    steps: 6,
    step: 3,
    stepLabels: ['заявка', 'сделка'],
    legend: ['поток заявок', 'пройденный этап'],
  },
  funnel: {
    title: `Воронка · 6${NB}этапов`,
    system: 'amoCRM',
    rows: [
      { label: 'Заявка', value: 100 },
      { label: 'Квалификация', value: 74 },
      { label: 'Встреча', value: 55 },
      { label: 'КП', value: 43 },
      { label: 'Счёт', value: 34 },
      { label: 'Сделка', value: 28 },
    ],
    summary: { label: `Конверсия в${NB}сделку`, from: '20%', to: '28%' },
    chip: { icon: 'robot', title: 'Бот-квалификатор', text: 'Тёплый лид → менеджеру', meta: `2${NB}мин` },
  },
  report: {
    icon: 'chart-bar',
    title: 'Сквозная аналитика',
    period: 'март',
    total: '124',
    caption: `заявки из${NB}трёх каналов`,
    channels: [
      { icon: 'browser', label: 'Сайт', value: 58 },
      { icon: 'building-store', label: 'Авито', value: 41 },
      { icon: 'phone', label: 'Звонки', value: 25 },
    ],
    lost: { label: 'Потеряно заявок', value: 0 },
    note: null,
  },
};

const CHIP_H = 32;
const CHIP_GAP = 12;

function SchemeCover({ d }) {
  const n = d.sources.length;
  const H = n * CHIP_H + (n - 1) * CHIP_GAP;
  const mid = H / 2;
  const steps = Math.max(2, d.steps || 6);
  const step = Math.min(steps - 1, Math.max(0, d.step || 0));
  return (
    <Canvas className="sw-case__cover sw-case-scheme">
      {d.caption && <p className="sw-case-scheme__cap">{d.caption}</p>}
      <div className="sw-case-scheme__graph">
        <div className="sw-case-scheme__sources">
          {d.sources.map((s, i) => (
            <span className="sw-case-scheme__src" key={s.label || i}>
              {s.icon && <Icon name={s.icon} size={15} />}
              {s.label}
            </span>
          ))}
        </div>
        <svg className="sw-case-scheme__links" viewBox={`0 0 48 ${H}`} preserveAspectRatio="none" style={{ height: H }} aria-hidden="true" focusable="false">
          {d.sources.map((s, i) => {
            const y = CHIP_H / 2 + i * (CHIP_H + CHIP_GAP);
            const path = Math.abs(y - mid) < 0.5 ? `M0 ${y} L48 ${mid}` : `M0 ${y} C26 ${y} 22 ${mid} 48 ${mid}`;
            return <path key={i} d={path} />;
          })}
        </svg>
        <div className="sw-case-scheme__hub">
          <div className="sw-case-scheme__hub-top">
            <span className="sw-case__tile">{d.hub.icon && <Icon name={d.hub.icon} size={18} />}</span>
            <div className="sw-case-scheme__hub-text">
              <p className="sw-case-scheme__hub-title">{d.hub.title}</p>
              {d.hub.meta && <p className="sw-case-scheme__hub-meta">{d.hub.meta}</p>}
            </div>
          </div>
          {d.bot && (
            <div className="sw-case-scheme__bot">
              {d.bot.icon && <Icon name={d.bot.icon} size={14} className="sw-case-scheme__bot-icon" />}
              <span className="sw-case-scheme__bot-label">{d.bot.label}</span>
              <Icon name="circle-check" size={14} className="sw-case-scheme__bot-ok" />
            </div>
          )}
          <div className="sw-case-scheme__steps" style={{ '--sw-case-progress': step / (steps - 1) }}>
            {Array.from({ length: steps }, (_, i) => (
              <i key={i} className={cx(i < step && 'is-on', i === step && 'is-current')} />
            ))}
          </div>
          {d.stepLabels && (
            <div className="sw-case-scheme__steps-labels">
              <span>{d.stepLabels[0]}</span>
              <span>{d.stepLabels[1]}</span>
            </div>
          )}
        </div>
      </div>
      {d.legend && (
        <div className="sw-case-scheme__legend">
          <span><i className="sw-case-scheme__lg-line" />{d.legend[0]}</span>
          <span><i className="sw-case-scheme__lg-dot" />{d.legend[1]}</span>
        </div>
      )}
    </Canvas>
  );
}

function FunnelCover({ d }) {
  const last = d.rows.length - 1;
  return (
    <Canvas className="sw-case__cover sw-case-funnel">
      <div className="sw-case-funnel__stage">
        <div className="sw-case-funnel__panel">
          <div className="sw-case-funnel__head">
            <span className="sw-case-funnel__title">{d.title}</span>
            {d.system && <span className="sw-case-funnel__system">{d.system}</span>}
          </div>
          <ul className="sw-case-funnel__rows">
            {d.rows.map((r, i) => (
              <li key={r.label || i} className={cx('sw-case-funnel__row', i === last && 'is-last')}>
                <span className="sw-case-funnel__label">{r.label}</span>
                <span className="sw-case-funnel__bar"><i style={{ width: `${Math.max(0, Math.min(100, r.value))}%` }} /></span>
                <span className="sw-case-funnel__value">{`${r.value}%`}</span>
              </li>
            ))}
          </ul>
          {d.summary && (
            <div className="sw-case-funnel__sum">
              <span>{d.summary.label}</span>
              <span className="sw-case-funnel__sum-v">
                {`было ${d.summary.from} → `}<b>{d.summary.to}</b>
              </span>
            </div>
          )}
        </div>
        {d.chip && (
          <div className="sw-case-funnel__chip">
            <span className="sw-case__tile sw-case__tile--s">{d.chip.icon && <Icon name={d.chip.icon} size={14} />}</span>
            <span className="sw-case-funnel__chip-text">
              <b>{d.chip.title}</b>
              <small>
                {d.chip.text}
                {d.chip.meta && <>{' · '}<span className="sw-case-funnel__chip-meta">{d.chip.meta}</span></>}
              </small>
            </span>
          </div>
        )}
      </div>
    </Canvas>
  );
}

function ReportCover({ d }) {
  const max = Math.max(1, ...d.channels.map((c) => Number(c.value) || 0));
  return (
    <div className="sw-case__cover sw-case-report">
      <div className="sw-case-report__head">
        <span className="sw-case-report__title">
          {d.icon && <Icon name={d.icon} size={15} className="sw-case-report__title-icon" />}
          {d.title}
        </span>
        {d.period && <span className="sw-case-report__period">{d.period}</span>}
      </div>
      <div className="sw-case-report__fig">
        <span className="sw-case-report__num">{d.total}</span>
        {d.caption && <span className="sw-case-report__cap">{d.caption}</span>}
      </div>
      <div className="sw-case-report__rows">
        {d.channels.map((c, i) => (
          <div className="sw-case-report__row" key={c.label || i}>
            <span className="sw-case-report__src">
              {c.icon && <Icon name={c.icon} size={15} className="sw-case-report__src-icon" />}
              {c.label}
            </span>
            <span className="sw-case-report__bar"><i style={{ width: `${((Number(c.value) || 0) / max) * 100}%` }} /></span>
            <span className="sw-case-report__v">{c.value}</span>
          </div>
        ))}
        {d.lost && (
          <div className="sw-case-report__row sw-case-report__row--lost">
            <span className="sw-case-report__src">{d.lost.label}</span>
            <span className="sw-case-report__v">{d.lost.value}</span>
          </div>
        )}
      </div>
      {d.note && (
        <div className="sw-case-report__note">
          {d.note.icon && <Icon name={d.note.icon} size={15} className="sw-case-report__note-icon" />}
          <span>{d.note.text}</span>
          {d.note.meta && <span className="sw-case-report__note-meta">{d.note.meta}</span>}
        </div>
      )}
    </div>
  );
}

const COVERS = { scheme: SchemeCover, funnel: FunnelCover, report: ReportCover };

/** Split "2 мин" → ["2", "мин"] so the unit can sit smaller next to the numeral. */
function splitMetric(m) {
  if (m.unit != null) return [m.value, m.unit];
  const v = String(m.value);
  const match = v.match(/^([^\s ]+)[\s ]+([^\d].*)$/);
  return match ? [match[1], match[2]] : [v, null];
}

/**
 * Case study card: an illustrated cover (built-in scheme / funnel / report, or
 * your own node) and a body with client, services, task / solution and 2–3
 * metrics. With `href` the whole card is one link («Читать кейс»).
 */
export function CaseCard({
  client,
  subtitle,
  services = [],
  cover = 'scheme',
  coverData,
  coverLabel,
  task,
  solution,
  metrics = [],
  href,
  cta = 'Читать кейс',
  labels,
  layout = 'split',
  headingLevel = 3,
  className,
  ...rest
}) {
  const H = `h${Math.min(6, Math.max(2, headingLevel))}`;
  const Builtin = typeof cover === 'string' ? COVERS[cover] : null;
  let coverEl = null;
  if (Builtin) {
    const d = { ...COVER_DEFAULTS[cover], ...(coverData || {}) };
    coverEl = <Builtin d={d} />;
  } else if (cover) {
    coverEl = <Canvas className="sw-case__cover sw-case__cover--custom">{cover}</Canvas>;
  }
  const coverA11y = coverLabel
    ? { role: 'img', 'aria-label': coverLabel }
    : Builtin
      ? { 'aria-hidden': true }
      : {};

  return (
    <article
      className={cx('sw-case', `sw-case--${layout}`, !coverEl && 'sw-case--bare', href && 'sw-case--link', className)}
      {...rest}
    >
      {coverEl && (
        <div className="sw-case__media" {...coverA11y}>
          {coverEl}
        </div>
      )}
      <div className="sw-case__body">
        <div className="sw-case__head">
          <div className="sw-case__who">
            <H className="sw-case__client">{client}</H>
            {subtitle && <p className="sw-case__sub">{subtitle}</p>}
          </div>
          {services.length > 0 && (
            <div className="sw-case__badges">
              {services.map((id) => (
                <Badge key={id} service={id}>
                  {labels && labels.services ? labels.services[id] : undefined}
                </Badge>
              ))}
            </div>
          )}
        </div>
        {(task || solution) && (
          <dl className="sw-case__dl">
            {task && (
              <div className="sw-case__dl-row">
                <dt>{(labels && labels.task) || 'Задача'}</dt>
                <dd>{task}</dd>
              </div>
            )}
            {solution && (
              <div className="sw-case__dl-row">
                <dt>{(labels && labels.solution) || 'Решение'}</dt>
                <dd>{solution}</dd>
              </div>
            )}
          </dl>
        )}
        <div className="sw-case__foot">
          {metrics.length > 0 && (
            <dl className="sw-case__metrics">
              {metrics.map((m, i) => {
                const [num, unit] = splitMetric(m);
                return (
                  <div className={cx('sw-case__metric', i === 0 && 'is-lead')} key={m.label || i}>
                    <dt className="sw-case__metric-label">{m.label}</dt>
                    <dd className="sw-case__metric-value">
                      {num}
                      {unit && <span className="sw-case__metric-unit">{`${NB}${unit}`}</span>}
                    </dd>
                  </div>
                );
              })}
            </dl>
          )}
          {href && (
            <Button
              variant="ghost"
              iconEnd="arrow-right"
              href={href}
              className="sw-case__link"
              aria-label={typeof client === 'string' ? `${cta}: ${client}` : undefined}
            >
              {cta}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
