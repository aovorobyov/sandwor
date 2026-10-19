'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/** Когда уведомление показали впервые (ISO-дата). Через NOTICE_DAYS покажем снова. */
const STORAGE_KEY = 'cookie-notice';
const NOTICE_DAYS = 365;

/** Уведомление скрывается само через столько мс показа (пока вкладка видна). */
const HIDE_MS = 30_000;

/** На первой странице аналитика стартует через столько мс пребывания — или раньше, при действии. */
const START_MS = 5_000;

const DAY_MS = 24 * 60 * 60 * 1000;

/** pending — до гидрации (SSR не знает localStorage); visible — показываем; hidden — скрыто. */
export type NoticeState = 'pending' | 'visible' | 'hidden';

const readSeenAt = (): number | null => {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    const time = value ? Date.parse(value) : NaN;

    return Number.isNaN(time) ? null : time;
  } catch {
    return null;
  }
};

const markSeen = () => {
  try {
    window.localStorage.setItem(STORAGE_KEY, new Date().toISOString());
  } catch {
    // Приватный режим без хранилища: уведомление просто покажется снова.
  }
};

/**
 * Уведомление о cookie в режиме «продолжая пользоваться — соглашаетесь»
 * (как на skynia.space): без кнопок «Принять» / «Отклонить», только «Хорошо».
 *
 * - Показывается один раз: отметка в localStorage живёт NOTICE_DAYS дней.
 * - Скрывается само через HIDE_MS показа (таймер стоит, пока вкладка скрыта),
 *   по «Хорошо» или Esc.
 * - Аналитика (`isAnalyticsAllowed`) стартует при продолжении пользования:
 *   через START_MS на первой странице, раньше — при прокрутке, нажатии, клавише
 *   или переходе на другую страницу; в повторные визиты — сразу. Кто ушёл раньше
 *   START_MS, ничего не сделав, в Метрику не попадает.
 */
export const useCookieNotice = () => {
  const [state, setState] = useState<NoticeState>('pending');
  const [isAnalyticsAllowed, setIsAnalyticsAllowed] = useState(false);
  const pathname = usePathname();
  const firstPath = useRef(pathname);

  const allowAnalytics = useCallback(() => {
    setIsAnalyticsAllowed(true);
  }, []);

  const hide = useCallback(() => {
    setState('hidden');
    allowAnalytics();
  }, [allowAnalytics]);

  // Первый показ или повторный визит.
  useEffect(() => {
    const seenAt = readSeenAt();
    const isFresh = seenAt !== null && Date.now() - seenAt < NOTICE_DAYS * DAY_MS;

    if (isFresh) {
      setState('hidden');
      setIsAnalyticsAllowed(true);
      return;
    }

    setState('visible');
  }, []);

  // Отметку о показе ставим отдельно: в StrictMode эффект выше запускается дважды,
  // и отметка из первого прогона спрятала бы уведомление во втором.
  useEffect(() => {
    if (state === 'visible') {
      markSeen();
    }
  }, [state]);

  // Переход на другую страницу — тоже продолжение пользования.
  useEffect(() => {
    if (pathname !== firstPath.current) {
      allowAnalytics();
    }
  }, [pathname, allowAnalytics]);

  // Пока уведомление на экране: автоскрытие, Esc, старт аналитики по времени или действию.
  useEffect(() => {
    if (state !== 'visible') {
      return;
    }

    let hideLeft = HIDE_MS;
    let startLeft = START_MS;
    let shownAt = Date.now();
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let startTimer: ReturnType<typeof setTimeout> | undefined;

    const run = () => {
      shownAt = Date.now();
      hideTimer = setTimeout(hide, hideLeft);
      startTimer = setTimeout(allowAnalytics, startLeft);
    };

    const pause = () => {
      const spent = Date.now() - shownAt;
      hideLeft = Math.max(0, hideLeft - spent);
      startLeft = Math.max(0, startLeft - spent);
      clearTimeout(hideTimer);
      clearTimeout(startTimer);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        pause();
      } else {
        run();
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        hide();
        return;
      }

      allowAnalytics();
    };

    // «Подробнее» в самом уведомлении — не продолжение пользования, а чтение условий.
    const handlePointer = (event: Event) => {
      const target = event.target as Element | null;
      if (target?.closest?.('[data-cookie-notice]')) {
        return;
      }

      allowAnalytics();
    };

    if (!document.hidden) {
      run();
    }

    document.addEventListener('visibilitychange', handleVisibility);
    document.addEventListener('keydown', handleKey);
    document.addEventListener('pointerdown', handlePointer);
    window.addEventListener('scroll', allowAnalytics, { passive: true, once: true });

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(startTimer);
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('pointerdown', handlePointer);
      window.removeEventListener('scroll', allowAnalytics);
    };
  }, [state, hide, allowAnalytics]);

  return { state, hide, isAnalyticsAllowed };
};
