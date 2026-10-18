import React from 'react';
import { cx } from '../utils.js';

const FACES = ['display', 'text', 'mono'];

/** «клиента» after 1, 21, 31… (but not 11); «клиентов» otherwise — «8 из 140+ клиентов». */
function clientsWord(total) {
  const m = String(total).match(/\d+/);
  const n = m ? Number(m[0]) : 0;
  return n % 10 === 1 && n % 100 !== 11 ? 'клиента' : 'клиентов';
}

/**
 * The client wall: equal cells split by 1px hairlines. A cell shows the client's
 * logo (`src`, greyed until hover) or a neutral text wordmark — placeholder faces
 * vary between cells. Header: caption + «8 из 140+ клиентов». No marquee.
 */
export function ClientLogos({
  items = [],
  caption = 'Нам доверяют',
  total,
  countText,
  columns = 4,
  className,
  style,
  ...rest
}) {
  const n = items.length;
  const cols = Math.max(1, columns);
  const mobCols = Math.min(cols, 2);
  const count = countText !== undefined ? countText : total ? `${n} из ${total} ${clientsWord(total)}` : null;
  // empty cells complete the last row so the hairline grid never shows a solid gap
  const fillDesk = (cols - (n % cols)) % cols;
  const fillMob = (mobCols - (n % mobCols)) % mobCols;
  const fillers = Array.from({ length: Math.max(fillDesk, fillMob) }, (_, i) => (
    <li
      key={`fill-${i}`}
      aria-hidden="true"
      className={cx('sw-logos__cell', 'sw-logos__fill', i < fillDesk && 'sw-logos__fill--desk', i < fillMob && 'sw-logos__fill--mob')}
    />
  ));

  return (
    <div className={cx('sw-logos', className)} style={{ '--sw-logos-cols': cols, '--sw-logos-cols-m': mobCols, ...style }} {...rest}>
      {(caption || count) && (
        <div className="sw-logos__head">
          {caption && <p className="sw-logos__caption">{caption}</p>}
          {count && <p className="sw-logos__count">{count}</p>}
        </div>
      )}
      <ul className="sw-logos__grid" aria-label={typeof caption === 'string' ? caption : 'Клиенты'}>
        {items.map((it, i) => {
          const face = it.face || FACES[i % FACES.length];
          const mark = it.src ? (
            <img className="sw-logos__img" src={it.src} alt={it.name} loading="lazy" decoding="async" />
          ) : (
            <span className={cx('sw-logos__mark', `sw-logos__mark--${face}`)}>{it.name}</span>
          );
          return (
            <li key={it.id || it.name || i} className={cx('sw-logos__cell', it.className)}>
              {it.href ? (
                <a className="sw-logos__body sw-logos__link" href={it.href}>{mark}</a>
              ) : (
                <span className="sw-logos__body">{mark}</span>
              )}
            </li>
          );
        })}
        {fillers}
      </ul>
    </div>
  );
}
