import type { Locale } from '@/i18n-routing';

export interface AmoCrmButtonProps {
  /** Язык интерфейса виджета. Совпадает с локалью сайта — amoCRM понимает и `ru`, и `en`. */
  locale: Locale;
}
