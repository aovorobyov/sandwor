'use client';

import type { FC } from 'react';
import { cn } from '@/shared/lib/cn';
import { LOGO_DOTS, LOGO_VIEW_HEIGHT, LOGO_VIEW_WIDTH } from './Logo.dots';
import { useRebuild } from './useRebuild';
import s from './Logo.module.css';

const DOT_RADIUS = 5;
const DISPLAY_WIDTH = 112;

export const Logo: FC = () => {
  const { delays, start, trackDotEnd } = useRebuild(LOGO_DOTS.length);

  const handleClick = () => {
    start();
  };

  const handleDotAnimationEnd = () => {
    trackDotEnd();
  };

  return (
    <svg
      width={DISPLAY_WIDTH}
      height={(DISPLAY_WIDTH * LOGO_VIEW_HEIGHT) / LOGO_VIEW_WIDTH}
      viewBox={`0 0 ${LOGO_VIEW_WIDTH} ${LOGO_VIEW_HEIGHT}`}
      fill="none"
      role="img"
      aria-label="sandwor"
      className={s.root}
      onClick={handleClick}
    >
      {LOGO_DOTS.map(([cx, cy], index) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={DOT_RADIUS}
          fill="currentColor"
          className={cn(s.dot, delays && s.dotRebuilding)}
          style={delays ? { animationDelay: `${delays[index]}ms` } : undefined}
          onAnimationEnd={handleDotAnimationEnd}
        />
      ))}
    </svg>
  );
};
