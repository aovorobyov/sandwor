'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Когда человек продолжил пользоваться сайтом после уведомления (ISO-дата) — это и есть
 * согласие на cookie и Метрику. Через NOTICE_DAYS уведомление покажется снова.
 */
const STORAGE_KEY = 'cookie-notice';
const NOTICE_DAYS = 365;

/** Уведомление скрывается само через столько мс показа (пока вкладка видна). */
const HIDE_MS = 30_000;

/** На первой странице аналитика стартует через столько мс пребывания — или раньше, при действии. */
const START_MS = 5_000;

const DAY_MS = 24 * 60 * 60 * 1000;

/** Клавиши навигации и модификаторы — не «действие на сайте», а поиск, куда нажать. */
const NEUTRAL_KEYS = new Set(['Tab', 'Shift', 'Alt', 'Control', 'Meta', 'CapsLock']);

/**
 * Переход по «Подробнее» из уведомления — чтение условий, а не продолжение пользования.
 * idle — обычный режим; opening — ссылку нажали, ждём смены адреса; reading — на странице условий.
 */
type TermsState = 'idle' | 'opening' | 'reading';

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
 * - Отметка в localStorage ставится, только когда человек продолжил пользоваться сайтом
 *   после показа, и живёт NOTICE_DAYS дней. Кто ушёл, ничего не сделав, в следующий
 *   визит снова увидит уведомление, а Метрика до тех пор не подключится.
 * - Скрывается само через HIDE_MS показа (таймер стоит, пока вкладка скрыта),
 *   по «Хорошо» или Esc.
 * - Аналитика (`isAnalyticsAllowed`) стартует при продолжении пользования:
 *   через START_MS на первой странице, раньше — при прокрутке, нажатии, клавише
 *   или переходе на другую страницу; в повторные визиты — сразу. Кто ушёл раньше
 *   START_MS, ничего не сделав, в Метрику не попадает.
 * - Переход по «Подробнее» и чтение условий согласием не считаются; Tab и
 *   модификаторы — тоже. Esc, закрывший модальное окно, уведомление не трогает.
 */
export const useCookieNotice = () => {
  const [state, setState] = useState<NoticeState>('pending');
  const [isAnalyticsAllowed, setIsAnalyticsAllowed] = useState(false);
  const pathname = usePathname();
  const firstPath = useRef(pathname);
  const terms = useRef<TermsState>('idle');
  /** Уведомление показано в этот визит: продолжение пользования станет согласием. */
  const isShownNow = useRef(false);

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

  useEffect(() => {
    if (state === 'visible') {
      isShownNow.current = true;
    }
  }, [state]);

  // Отметку ставим в момент согласия, а не показа: иначе тот, кто ушёл, ничего не сделав,
  // в следующий визит попал бы в Метрику без уведомления. В повторные визиты отметку
  // не продлеваем — через NOTICE_DAYS человек увидит уведомление снова.
  useEffect(() => {
    if (isAnalyticsAllowed && isShownNow.current) {
      isShownNow.current = false;
      markSeen();
    }
  }, [isAnalyticsAllowed]);

  // Переход на другую страницу — тоже продолжение пользования. Кроме перехода
  // по «Подробнее» на сами условия: согласием станет уже следующий переход.
  useEffect(() => {
    if (pathname === firstPath.current) {
      return;
    }

    if (terms.current === 'opening') {
      terms.current = 'reading';
      return;
    }

    terms.current = 'idle';
    allowAnalytics();
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

    // Пока человек читает условия, ни таймер, ни прокрутка согласием не считаются.
    const allowIfUsing = () => {
      if (terms.current === 'idle') {
        allowAnalytics();
      }
    };

    const run = () => {
      shownAt = Date.now();
      hideTimer = setTimeout(hide, hideLeft);
      startTimer = setTimeout(allowIfUsing, startLeft);
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

    const isInNotice = (target: EventTarget | null) => {
      return !!(target as Element | null)?.closest?.('[data-cookie-notice]');
    };

    // Ссылка «Подробнее» в уведомлении: дальше будет переход на условия.
    const markTermsOpening = (target: EventTarget | null) => {
      if ((target as Element | null)?.closest?.('[data-cookie-notice] a')) {
        terms.current = 'opening';
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      // Esc, который уже обработало модальное окно, уведомление не закрывает.
      if (event.defaultPrevented) {
        return;
      }

      if (event.key === 'Escape') {
        hide();
        return;
      }

      if (NEUTRAL_KEYS.has(event.key) || isInNotice(event.target)) {
        if (event.key === 'Enter') markTermsOpening(event.target);
        return;
      }

      allowIfUsing();
    };

    const handlePointer = (event: Event) => {
      if (isInNotice(event.target)) {
        markTermsOpening(event.target);
        return;
      }

      allowIfUsing();
    };

    if (!document.hidden) {
      run();
    }

    document.addEventListener('visibilitychange', handleVisibility);
    document.addEventListener('keydown', handleKey);
    document.addEventListener('pointerdown', handlePointer);
    window.addEventListener('scroll', allowIfUsing, { passive: true });

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(startTimer);
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('pointerdown', handlePointer);
      window.removeEventListener('scroll', allowIfUsing);
    };
  }, [state, hide, allowAnalytics]);

  return { state, hide, isAnalyticsAllowed };
};
