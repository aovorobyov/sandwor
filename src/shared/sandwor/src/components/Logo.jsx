'use client';
import React, { useState } from 'react';
import { cx } from '../utils.js';
import { LOGO_STEM, LOGO_STUDIO, LOGO_STUDIO_SHIFT, LOGO_STUDIO_WINDOW, LOGO_WORD } from '../logoPaths.js';

// [sandwor.ru] Знак — векторный, контуры — в logoPaths.js.
const CLIP_ID = 'sw-logo-studio-window';

/**
 * The sandwor wordmark (vector). `size` keeps its old meaning — the font-size the text
 * logo had (site header: 18), so the mark lands in the same box.
 * [sandwor.ru] `studio` — the long version: the stem of the «d» rises and «studio» sits
 * to its right, above «wor». `studio="animate"`: two 7 s rounds sandwor ⇄ sandwor studio,
 * then it settles on «sandwor studio»; hovering replays one round. The extra height goes
 * above the box, so layout around the logo does not move.
 */
export function Logo({ size = 18, href, mono = false, studio = false, className, style, ...rest }) {
  const Tag = href ? 'a' : 'span';
  const withStudio = Boolean(studio);
  const animate = studio === 'animate';
  // intro — два круга и сборка; rest — статичный «sandwor studio»; replay — круг по наведению.
  const [phase, setPhase] = useState('intro');
  const onAnimationEnd = (e) => {
    if (e.animationName === 'sw-logo-studio-in' || e.animationName === 'sw-logo-studio-replay') setPhase('rest');
  };
  const onMouseEnter = (e) => {
    if (phase === 'rest') setPhase('replay');
    if (rest.onMouseEnter) rest.onMouseEnter(e);
  };
  const motion = animate ? { onAnimationEnd, onMouseEnter } : {};
  return (
    <Tag
      href={href}
      className={cx(
        'sw-logo',
        mono && 'sw-logo--mono',
        withStudio && 'sw-logo--studio',
        animate && 'sw-logo--animate',
        animate && phase !== 'intro' && `is-${phase}`,
        className,
      )}
      // Кегль — через переменную: контейнер может масштабировать знак (--sw-logo-scale),
      // не перебивая inline-стиль.
      style={{ '--sw-logo-size': `${size}px`, ...style }}
      aria-label={rest['aria-label'] || (withStudio ? 'sandwor studio' : 'sandwor')}
      {...rest}
      {...motion}
    >
      <svg className="sw-logo__mark" viewBox="0 0 1122 158" aria-hidden="true" focusable="false">
        <path d={LOGO_WORD} fill="currentColor" />
        {withStudio && (
          <>
            <path className="sw-logo__stem" d={LOGO_STEM} fill="currentColor" />
            {animate && (
              <clipPath id={CLIP_ID}>
                <path d={LOGO_STUDIO_WINDOW} />
              </clipPath>
            )}
            <g clipPath={animate ? `url(#${CLIP_ID})` : undefined}>
              <g className="sw-logo__studio">
                <path d={LOGO_STUDIO} transform={`translate(0 ${LOGO_STUDIO_SHIFT})`} />
              </g>
            </g>
          </>
        )}
      </svg>
    </Tag>
  );
}
