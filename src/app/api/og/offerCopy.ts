import type { OfferCopy, OgLocale } from './route.types';

/**
 * Текст продающей обложки — отдельный от переводов страниц: edge-роут не тянет
 * весь бандл `messages`, а формулировки для превью в мессенджерах короче
 * страничных. Позиционирование то же, что в герое главной.
 */
export const OFFER_COPY: Record<OgLocale, OfferCopy> = {
  ru: {
    eyebrow: 'Создание сайтов под ключ',
    title: 'Делаю сайты, которые приносят заявки',
    lead: 'Лендинги, магазины на Tilda и кастомная разработка — инструмент под вашу задачу и бюджет.',
    tagline: 'Сайты для бизнеса под ключ',
    facts: [
      { value: 'от 50 000 ₽', label: 'стоимость запуска' },
      { value: '1–2 недели', label: 'до публикации' },
      { value: '1 день', label: 'срок ответа' },
    ],
  },
  en: {
    eyebrow: 'Websites, end to end',
    title: 'Websites that bring you leads',
    lead: 'Landing pages, Tilda stores and custom builds — the right tool for your goal and budget.',
    tagline: 'Websites for business, end to end',
    facts: [
      { value: 'from RUB 50,000', label: 'launch price' },
      { value: '1–2 weeks', label: 'to go live' },
      { value: '1 day', label: 'reply time' },
    ],
  },
};
