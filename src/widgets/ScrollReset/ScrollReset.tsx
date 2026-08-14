'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Сбрасывает прокрутку в начало при смене страницы. View-transitions иногда
 * сохраняют позицию скролла — из-за этого новая страница открывалась «отмотанной».
 * Переходы с якорем (#…) не трогаем, чтобы не ломать переход «Смотреть тарифы».
 */
export const ScrollReset = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [pathname]);

  return null;
};
