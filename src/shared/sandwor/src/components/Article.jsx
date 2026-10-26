'use client';
import React, { useEffect, useId, useRef, useState } from 'react';
import { Avatar } from './Avatar.jsx';
import { Badge } from './Badge.jsx';
import { Breadcrumbs } from './Breadcrumbs.jsx';
import { Icon } from './Icon.jsx';
import { cx } from '../utils.js';

/** A heading counts as «current» once its top passes this line (px from the viewport top). */
const SPY_LINE = 120;

function sameItems(a, b) {
  return a.length === b.length && a.every((x, i) => x.id === b[i].id && x.label === b[i].label);
}

/**
 * Reading typography for raw HTML or Markdown output: h2, h3, p, ul, ol,
 * blockquote, figure, table, pre, code, hr, a. Pass elements as children or a
 * CMS string as `html`. Only the prose's own flow children are styled, so
 * components placed inside keep their look.
 */
export function ArticleProse({ as: Tag = 'div', html, className, children, ...rest }) {
  if (html != null) {
    return <Tag className={cx('sw-prose', className)} dangerouslySetInnerHTML={{ __html: html }} {...rest} />;
  }
  return (
    <Tag className={cx('sw-prose', className)} {...rest}>
      {children}
    </Tag>
  );
}

/** A note inside the prose: info-circle, a short title and a sentence or two. */
export function ArticleCallout({ title, icon = 'info-circle', className, children, ...rest }) {
  return (
    <aside className={cx('sw-prose__callout', className)} role="note" {...rest}>
      <Icon name={icon} size={20} className="sw-prose__callout-icon" />
      <div className="sw-prose__callout-body">
        {title && <p className="sw-prose__callout-title">{title}</p>}
        {children != null && <div className="sw-prose__callout-text">{children}</div>}
      </div>
    </aside>
  );
}

/** A figure with a caption under it: a scheme on Canvas, a screenshot, a chart. */
export function ArticleFigure({ caption, className, children, ...rest }) {
  return (
    <figure className={cx('sw-prose__figure', className)} {...rest}>
      {children}
      {caption && <figcaption className="sw-prose__caption">{caption}</figcaption>}
    </figure>
  );
}

/** Table of contents: links to the H2 anchors, the current one marked with a 2px accent bar. */
export function ArticleToc({ items = [], activeId, onNavigate, label = 'Содержание', className, ...rest }) {
  const capId = `sw-toc-${useId().replace(/:/g, '')}`;
  return (
    <nav className={cx('sw-article__toc', className)} aria-labelledby={capId} {...rest}>
      <p id={capId} className="sw-article__toc-caption">{label}</p>
      <ol className="sw-article__toc-list">
        {items.map((it) => {
          const on = it.id === activeId;
          return (
            <li key={it.id} className="sw-article__toc-item">
              <a
                href={`#${it.id}`}
                className={cx('sw-article__toc-link', on && 'is-active', it.className)}
                aria-current={on ? 'location' : undefined}
                onClick={() => onNavigate && onNavigate(it.id)}
              >
                {it.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * The blog article page: breadcrumbs, service badges, title, lead, author row,
 * the prose body and (from 1100px) a sticky table of contents built from the
 * body's h2[id] headings.
 */
export function Article({
  breadcrumbs,
  breadcrumbsLabel,
  services = [],
  title,
  lead,
  author,
  date,
  dateTime,
  readingTime,
  toc = true,
  tocLabel = 'Содержание',
  activeId: activeIdProp,
  prose = true,
  as: Tag = 'article',
  className,
  children,
  ...rest
}) {
  const bodyRef = useRef(null);
  const [found, setFound] = useState([]);
  const [spied, setSpied] = useState(null);
  const items = Array.isArray(toc) ? toc : toc ? found : [];
  const itemsKey = items.map((i) => i.id).join('|');
  const activeId = activeIdProp !== undefined ? activeIdProp : spied || (items[0] && items[0].id);

  // toc === true: collect h2[id] from the rendered body (works for `html` strings too)
  useEffect(() => {
    if (toc !== true || !bodyRef.current) return;
    const next = Array.from(bodyRef.current.querySelectorAll('h2[id]')).map((el) => ({
      id: el.id,
      label: el.textContent.trim(),
    }));
    setFound((prev) => (sameItems(prev, next) ? prev : next));
  });

  // scroll spy: the last heading whose top has passed SPY_LINE is current
  useEffect(() => {
    if (!items.length || activeIdProp !== undefined) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      let current = items[0].id;
      items.forEach((it) => {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= SPY_LINE) current = it.id;
      });
      setSpied(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey, activeIdProp]);

  const hasMeta = author || date || readingTime;

  return (
    <Tag className={cx('sw-article', items.length > 0 && 'sw-article--toc', className)} {...rest}>
      <header className="sw-article__header">
        {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} label={breadcrumbsLabel} className="sw-article__crumbs" />}
        {services.length > 0 && (
          <div className="sw-article__services">
            {services.map((s) => <Badge key={s} variant="service" service={s} />)}
          </div>
        )}
        {title && <h1 className="sw-article__title">{title}</h1>}
        {lead && <p className="sw-article__lead">{lead}</p>}
        {hasMeta && (
          <div className="sw-article__meta">
            {author && (
              <span className="sw-article__author">
                <Avatar
                  size="s"
                  name={author.name}
                  initials={author.initials}
                  src={author.src}
                  tone={author.tone}
                  decorative
                  ring="bg"
                />
                <span className="sw-article__author-name">{author.name}</span>
              </span>
            )}
            {(date || readingTime) && (
              <span className="sw-article__stamp">
                {date && <time dateTime={dateTime}>{date}</time>}
                {date && readingTime && '\u00a0· '}
                {readingTime}
              </span>
            )}
          </div>
        )}
      </header>
      <div ref={bodyRef} className="sw-article__body">
        {prose ? <ArticleProse>{children}</ArticleProse> : children}
      </div>
      {items.length > 0 && (
        <aside className="sw-article__aside">
          <ArticleToc items={items} activeId={activeId} onNavigate={setSpied} label={tocLabel} />
        </aside>
      )}
    </Tag>
  );
}
