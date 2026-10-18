import { formatRub } from '@sw/utils';

/** «от 45 000 ₽»: цена с предлогом текущего языка и неразрывными пробелами. */
export const formatPrice = (value: number, prefix: string): string => {
  return `${prefix} ${formatRub(value)}`;
};

/** «27 июня 2026» / «June 27, 2026». */
export const formatDate = (iso: string, locale: string): string => {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
    .format(new Date(iso))
    .replace(/\s*г\.$/, '');
};
