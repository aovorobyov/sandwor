'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/cn';
import type { ReadingProgressProps } from './ReadingProgress.types';
import s from './ReadingProgress.module.css';

/** Появляется после того, как пользователь проскроллил мимо оригинального meta-блока статьи. */
const SHOW_THRESHOLD_PX = 240;

export const ReadingProgress: FC<ReadingProgressProps> = (props) => {
  const { readTimeLabel, formattedDate } = props;
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let isTicking = false;

    const compute = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = total > 0 ? Math.min(Math.max(scrolled / total, 0), 1) : 0;

      setProgress(ratio);
      setIsVisible(scrolled > SHOW_THRESHOLD_PX);
      isTicking = false;
    };

    const handleScroll = () => {
      if (isTicking) {
        return;
      }
      isTicking = true;
      window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className={cn(s.root, isVisible && s.visible)} aria-hidden={!isVisible}>
      <div className={s.inner}>
        <span>{readTimeLabel}</span>

        <span className={s.separator}>·</span>

        <span>{formattedDate}</span>
      </div>

      <div className={s.bar}>
        <div className={s.fill} style={{ transform: `scaleX(${progress})` }} />
      </div>
    </div>
  );
};
