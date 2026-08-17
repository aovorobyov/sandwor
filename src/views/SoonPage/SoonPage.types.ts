import type { Locale } from '@/i18n-routing';

export interface SoonPageProps {
  /** Локаль вычисляется middleware из исходного пути: тизер живёт вне сегмента `[locale]`. */
  locale: Locale;
}

/** Пункт списка «что изменится». Приходит из messages целыми строками. */
export interface SoonChange {
  kicker: string;
  title: string;
  desc: string;
}

/** Образец цвета из палитры редизайна. */
export interface PaletteSwatch {
  /** Имя токена в новой теме — подписывается моношрифтом под образцом. */
  token: string;
  value: string;
}
