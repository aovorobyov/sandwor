'use client';

import { useEffect, useState } from 'react';
import type { ConsentState } from './useCookieConsent.types';

/** Ключ localStorage с решением пользователя по cookies/аналитике. */
const STORAGE_KEY = 'cookie-consent';

/** Читает сохранённое решение. Вне браузера и без записи — 'unknown' (баннер ещё покажем). */
const readConsent = (): ConsentState => {
  if (typeof window === 'undefined') {
    return 'unknown';
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  switch (stored) {
    case 'accepted':
      return 'accepted';
    case 'rejected':
      return 'rejected';
    default:
      return 'unknown';
  }
};

/**
 * Состояние согласия на cookies/аналитику и методы его смены.
 * До гидрации всегда 'unknown' (SSR не знает localStorage) — реальное значение
 * подхватывается в useEffect после монтирования, поэтому Метрика и баннер
 * появляются только на клиенте и без рассинхрона разметки.
 */
export const useCookieConsent = () => {
  const [consent, setConsent] = useState<ConsentState>('unknown');

  useEffect(() => {
    setConsent(readConsent());
  }, []);

  const accept = () => {
    window.localStorage.setItem(STORAGE_KEY, 'accepted');
    setConsent('accepted');
  };

  const reject = () => {
    window.localStorage.setItem(STORAGE_KEY, 'rejected');
    setConsent('rejected');
  };

  return { consent, accept, reject };
};
