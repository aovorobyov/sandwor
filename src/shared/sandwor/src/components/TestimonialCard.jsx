import React from 'react';
import { Icon } from './Icon.jsx';
import { Avatar } from './Avatar.jsx';
import { Button } from './Button.jsx';
import { cx } from '../utils.js';

/**
 * A client's words: quote glyph (+ optional result chip), the quote, and who said it
 * with an optional link to the case. Semantics: <figure> → <blockquote> + <figcaption>.
 * No star ratings — the proof is the metric and the case.
 */
export function TestimonialCard({
  quote,
  author,
  role,
  company,
  avatar,
  photo,
  caseLink,
  metric,
  variant = 'default',
  className,
  ...rest
}) {
  const featured = variant === 'featured';
  const position = [role, company].filter(Boolean).join(', ');
  const { label: caseLabel, className: caseClass, ...caseRest } = caseLink || {};

  return (
    <figure className={cx('sw-testimonial', featured && 'sw-testimonial--featured', className)} {...rest}>
      <div className="sw-testimonial__top">
        <Icon name="quote" size={20} className="sw-testimonial__glyph" />
        {metric && metric.value != null && (
          <p className="sw-testimonial__metric">
            <span className="sw-testimonial__metric-value">{metric.value}</span>
            {metric.label && ' '}
            {metric.label && <span className="sw-testimonial__metric-label">{metric.label}</span>}
          </p>
        )}
      </div>

      <blockquote className="sw-testimonial__quote">
        <p>{quote}</p>
      </blockquote>

      <figcaption className="sw-testimonial__footer">
        <span className="sw-testimonial__person">
          <Avatar name={author} initials={avatar} src={photo} size="m" decorative />
          <span className="sw-testimonial__who">
            <span className="sw-testimonial__name">{author}</span>
            {position && <span className="sw-testimonial__role">{position}</span>}
          </span>
        </span>
        {caseLabel && (
          <Button
            variant="ghost"
            size="s"
            iconEnd="arrow-right"
            className={cx('sw-testimonial__case', caseClass)}
            {...caseRest}
          >
            {caseLabel}
          </Button>
        )}
      </figcaption>
    </figure>
  );
}
