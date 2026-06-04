import { useRef, useState } from 'react';

/** Разброс задержек точек, мс. */
const MAX_DELAY_MS = 360;

/**
 * Управляет анимацией «пересборки» точек: на старте раздаёт случайные задержки
 * (новые на каждый клик) и сбрасывает их, когда каждая точка отыграла свой keyframe.
 * Задержки генерируются только по клику — на SSR-разметку рандом не попадает.
 */
export const useRebuild = (dotCount: number) => {
  const [delays, setDelays] = useState<number[] | null>(null);
  const endedCountRef = useRef(0);

  const start = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (delays || prefersReducedMotion) {
      return;
    }

    endedCountRef.current = 0;
    setDelays(Array.from({ length: dotCount }, () => Math.random() * MAX_DELAY_MS));
  };

  const trackDotEnd = () => {
    endedCountRef.current += 1;

    if (endedCountRef.current >= dotCount) {
      setDelays(null);
    }
  };

  return { delays, start, trackDotEnd };
};
