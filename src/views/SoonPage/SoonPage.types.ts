import type { Locale } from '@/i18n-routing';

export interface SoonPageProps {
  /** Локаль вычисляется middleware из исходного пути: тизер живёт вне сегмента `[locale]`. */
  locale: Locale;
}
