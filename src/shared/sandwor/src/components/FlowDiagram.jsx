import React from 'react';
import { Icon } from './Icon.jsx';
import { Canvas } from './Canvas.jsx';
import { Badge } from './Badge.jsx';
import { cx } from '../utils.js';

/** Screen-reader words for node states (visible state is a glyph). */
const STATE_SR = { done: 'выполнено', live: 'выполняется сейчас', idle: 'ожидает' };

function pad2(n) {
  return n < 10 ? `0${n}` : String(n);
}

function FlowNode({ node, index, numbered, size }) {
  const state = node.state || 'done';
  const idx = node.index != null ? node.index : numbered ? pad2(index + 1) : null;
  return (
    <div className={cx('sw-flow__node', `sw-flow__node--${state}`)}>
      <div className="sw-flow__node-top">
        <span className="sw-flow__tile">
          {node.icon && <Icon name={node.icon} size={size === 'compact' ? 16 : 18} />}
        </span>
        {idx != null && idx !== false && <span className="sw-flow__index">{idx}</span>}
        <span className="sw-flow__state">
          {state === 'done' ? (
            <Icon name="circle-check" size={16} className="sw-flow__check" />
          ) : (
            <span className="sw-flow__state-dot" aria-hidden="true" />
          )}
          <span className="sw-sr-only">{STATE_SR[state]}</span>
        </span>
      </div>
      <p className="sw-flow__node-title">{node.title}</p>
      {node.meta && <p className="sw-flow__node-meta">{node.meta}</p>}
      {(node.time || node.ref) && (
        <p className="sw-flow__node-foot">
          <span>{node.time}</span>
          {node.ref && <span className="sw-flow__ref">{node.ref}</span>}
        </p>
      )}
    </div>
  );
}

/**
 * The signature illustration: an automation / lead path on the dot-grid canvas.
 * A header bar (title + live status), nodes joined by amber edges with latency
 * labels, an optional dashed side branch and a footer row of stats.
 * Horizontal from 760px, a vertical stack below.
 */
export function FlowDiagram({
  title,
  titleIcon = 'automation',
  status,
  nodes = [],
  edges = [],
  branch,
  stats,
  size = 'hero',
  numbered = true,
  listLabel = 'Шаги схемы',
  className,
  ...rest
}) {
  const n = nodes.length;
  const br = branch && branch.afterIndex >= 0 && branch.afterIndex < n - 1 ? branch : null;
  const hasBar = title || status;

  return (
    <figure className={cx('sw-flow', `sw-flow--${size}`, br && 'sw-flow--branched', className)} {...rest}>
      {hasBar && (
        <figcaption className="sw-flow__bar">
          <span className="sw-flow__title">
            {titleIcon && (
              <span className="sw-flow__tile sw-flow__tile--s">
                <Icon name={titleIcon} size={14} />
              </span>
            )}
            <span className="sw-flow__title-text">{title}</span>
          </span>
          {status && (
            <Badge tone={status.tone === 'idle' ? 'pause' : 'work'} className="sw-flow__status">
              {status.label}
            </Badge>
          )}
        </figcaption>
      )}
      <Canvas className="sw-flow__body">
        <ol className="sw-flow__track" aria-label={listLabel}>
          {nodes.map((node, i) => {
            const last = i === n - 1;
            const next = last ? null : nodes[i + 1];
            const outIdle = next && (next.state || 'done') === 'idle';
            const inIdle = (node.state || 'done') === 'idle';
            const label = edges[i];
            const hasBr = br && br.afterIndex === i;
            return (
              <li
                key={node.id || i}
                className={cx(
                  'sw-flow__item',
                  i === 0 && 'is-first',
                  last && 'is-last',
                  inIdle && 'is-in-idle',
                  outIdle && 'is-out-idle',
                  hasBr && 'has-branch',
                )}
              >
                <FlowNode node={node} index={i} numbered={numbered} size={size} />
                {!last && (
                  <div className="sw-flow__edge" aria-hidden="true">
                    {label && <span className="sw-flow__edge-label">{label}</span>}
                    {hasBr && (
                      <>
                        <span className="sw-flow__branch-line" />
                        <span className="sw-flow__junction" />
                        <span className="sw-flow__branch">
                          {br.icon && <Icon name={br.icon} size={14} className="sw-flow__branch-icon" />}
                          <span className="sw-flow__branch-label">{br.label}</span>
                          {br.count != null && <span className="sw-flow__branch-count">{br.count}</span>}
                        </span>
                      </>
                    )}
                  </div>
                )}
                {!last && label && <span className="sw-sr-only">{`До следующего шага: ${label}.`}</span>}
                {hasBr && (
                  <span className="sw-sr-only">
                    {`Ответвление: ${br.label}${br.count != null ? `, ${br.count}` : ''}.`}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </Canvas>
      {stats && stats.length > 0 && (
        <dl className={cx('sw-flow__foot', stats.length % 2 === 1 && 'is-odd')}>
          {stats.map((s, i) => (
            <div className="sw-flow__stat" key={s.label || i}>
              <dt className="sw-flow__stat-label">{s.label}</dt>
              <dd className="sw-flow__stat-value">
                <span>{s.value}</span>
                {s.meter != null && (
                  <>
                    <span className="sw-flow__stat-note">{s.note != null ? s.note : `${Math.round(s.meter)}%`}</span>
                    <span className="sw-flow__meter" aria-hidden="true">
                      <span style={{ width: `${Math.max(0, Math.min(100, s.meter))}%` }} />
                    </span>
                  </>
                )}
                {s.meter == null && s.note != null && <span className="sw-flow__stat-note">{s.note}</span>}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </figure>
  );
}
