import { defaultLocale } from '@/i18n-routing';

/**
 * Подставляет префикс локали во внутренний href.
 * Дефолтная локаль — без префикса; внешние ссылки, якоря и уже префиксованные пути не трогаем.
 */
export const localizeHref = (href: string, locale: string): string => {
  if (locale === defaultLocale) {
    return href;
  }

  const isInternal = href.startsWith('/');
  const isAlreadyPrefixed = href === `/${locale}` || href.startsWith(`/${locale}/`);

  if (!isInternal || isAlreadyPrefixed) {
    return href;
  }

  return href === '/' ? `/${locale}` : `/${locale}${href}`;
};

/**
 * Обратное к `localizeHref`: путь без префикса локали (`/en/blog` → `/blog`).
 * Префикс снимается и у дефолтной локали: при серверном рендере `usePathname()`
 * отдаёт внутренний адрес после rewrite middleware (`/ru/blog`), а не `/blog`.
 */
export const delocalizePath = (pathname: string, locale: string): string =>
  pathname.replace(new RegExp(`^/${locale}(?=/|$)`), '') || '/';
