import type { ReactNode } from 'react';
import type { BreadcrumbsItem } from '@sw/components/Breadcrumbs';

export interface PageHeroProps {
  /** Путь от главной; последний пункт — текущая страница. */
  breadcrumbs?: BreadcrumbsItem[];
  /** Подпись крошек для скринридера. */
  breadcrumbsLabel?: string;
  /** Моно-строка или бейджи над заголовком. */
  meta?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  /** Кнопки: одна primary на экран, остальные secondary/ghost. */
  actions?: ReactNode;
  /** Правая колонка: схема, факты, контакты. */
  aside?: ReactNode;
  /** l — display-1 (главная), m — display-2 (внутренние страницы). */
  size?: 'm' | 'l';
  className?: string;
  /** Дополнительный блок под действиями (цифры, контакты). */
  children?: ReactNode;
}
