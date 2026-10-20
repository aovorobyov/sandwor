'use client';

import { useEffect } from 'react';
import { useTransitionRouter } from 'next-view-transitions';

/** Клик, который браузер должен обработать сам: новая вкладка, скачивание, средняя кнопка. */
const isModifiedClick = (event: MouseEvent): boolean => {
  return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
};

/** Ссылка ведёт на другую страницу этого же сайта (не якорь на текущей и не файл). */
const getInternalPath = (anchor: HTMLAnchorElement): string | null => {
  if (anchor.target && anchor.target !== '_self') {
    return null;
  }

  if (anchor.hasAttribute('download') || anchor.getAttribute('rel')?.includes('external')) {
    return null;
  }

  // Ссылка на другой язык — обычная загрузка: виджеты (чат amoCRM) подхватят новую локаль.
  if (anchor.hreflang && anchor.hreflang !== document.documentElement.lang) {
    return null;
  }

  const url = new URL(anchor.href, window.location.href);
  const isSameOrigin = url.origin === window.location.origin;
  const isFile = /\.[a-z0-9]+$/i.test(url.pathname);

  if (!isSameOrigin || isFile || url.pathname.startsWith('/api/')) {
    return null;
  }

  const isSamePageAnchor =
    url.pathname === window.location.pathname &&
    url.search === window.location.search &&
    url.hash !== '';

  if (isSamePageAnchor) {
    return null;
  }

  return `${url.pathname}${url.search}${url.hash}`;
};

/**
 * Компоненты дизайн-системы рендерят ссылки обычным `<a href>` — у них нет
 * пропа для `next/link`. Чтобы переходы между страницами оставались клиентскими
 * (без перезагрузки и с view-transitions), перехватываем клики по внутренним
 * ссылкам на уровне документа и отдаём их роутеру. Обработчики компонентов
 * срабатывают раньше: MobileMenu успевает закрыться, а `preventDefault` в них
 * отменяет и наш переход.
 */
export const LinkInterceptor = () => {
  const router = useTransitionRouter();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event)) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.('a[href]');
      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      const path = getInternalPath(anchor);
      if (!path) {
        return;
      }

      event.preventDefault();
      router.push(path);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [router]);

  return null;
};
