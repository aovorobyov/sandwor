'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { delocalizePath, localizeHref } from '@/shared/ui/Link/localizeHref';

interface LocalePaths {
  locale: string;
  /** Текущий путь без префикса локали — для сравнения с href навигации. */
  path: string;
  /** Внутренний путь с префиксом текущей локали. */
  href: (path: string) => string;
}

/** Пути для компонентов дизайн-системы, которые рендерят обычный `<a href>`. */
export const useLocalePaths = (): LocalePaths => {
  const locale = useLocale();
  const pathname = usePathname() || '/';

  return {
    locale,
    path: delocalizePath(pathname, locale),
    href: (path) => localizeHref(path, locale),
  };
};
