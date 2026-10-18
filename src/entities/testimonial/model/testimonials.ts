import type { TestimonialCardProps } from '@sw/components/TestimonialCard';
import type { ClientLogosItem } from '@sw/components/ClientLogos';

/**
 * Отзывы клиентов для TestimonialCard. Пока пусто: секция «Что говорят клиенты»
 * не выводится, пока здесь нет настоящих отзывов с согласия клиента.
 * Тексты — на языке оригинала; для EN-версии можно добавить перевод в `quoteEn`.
 */
export interface Testimonial extends Omit<TestimonialCardProps, 'quote'> {
  id: string;
  quote: string;
  quoteEn?: string;
}

export const TESTIMONIALS: readonly Testimonial[] = [];

/**
 * Стена клиентов для ClientLogos. Пусто, пока нет согласованных логотипов:
 * блок «Нам доверяют» появится на главной сам, как только здесь будут записи.
 */
export const CLIENT_LOGOS: readonly ClientLogosItem[] = [];
