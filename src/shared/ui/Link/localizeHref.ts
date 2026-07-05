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
