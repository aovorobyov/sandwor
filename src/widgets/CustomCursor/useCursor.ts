import { useEffect, useRef } from 'react';

/** Элементы, над которыми точка-курсор подрастает (аффорданс взамен нативного указателя). */
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, label, summary';

/** Сколько ждать без движения, прежде чем считать курсор остановившимся, мс. */
const IDLE_DELAY_MS = 120;

/**
 * Единственный в проекте слушатель `pointermove`. Двигает точку-курсор, помечает
 * её состояния (движется / над интерактивным) через data-атрибуты и пишет
 * --cursor-x/--cursor-y в documentElement (их читает свечение фона-полотна).
 * Активируется только на точном указателе без prefers-reduced-motion — иначе
 * остаётся нативный курсор. Возвращает ref на DOM-узел точки.
 */
export const useCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) {
      return undefined;
    }

    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) {
      return undefined;
    }

    const root = document.documentElement;
    root.classList.add('cursor-custom');

    let pointerX = -200;
    let pointerY = -200;
    let rafId = 0;
    let idleId = 0;
    let isFrameQueued = false;

    const render = () => {
      isFrameQueued = false;
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      dot.style.opacity = '1';
      root.style.setProperty('--cursor-x', `${pointerX}px`);
      root.style.setProperty('--cursor-y', `${pointerY}px`);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!isFrameQueued) {
        isFrameQueued = true;
        rafId = requestAnimationFrame(render);
      }

      dot.dataset.moving = 'true';
      window.clearTimeout(idleId);
      idleId = window.setTimeout(() => {
        dot.dataset.moving = 'false';
      }, IDLE_DELAY_MS);

      const target = event.target as Element | null;
      dot.dataset.interactive = target?.closest(INTERACTIVE_SELECTOR) ? 'true' : 'false';
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.clearTimeout(idleId);
      cancelAnimationFrame(rafId);
      root.classList.remove('cursor-custom');
      root.style.removeProperty('--cursor-x');
      root.style.removeProperty('--cursor-y');
    };
  }, []);

  return dotRef;
};
