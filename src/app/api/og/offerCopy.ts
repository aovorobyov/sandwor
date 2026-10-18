import type { OfferCopy, OgLocale } from './route.types';

/**
 * Текст продающей обложки — отдельный от переводов страниц: edge-роут не тянет
 * весь бандл `messages`, а формулировки для превью в мессенджерах короче
 * страничных. Позиционирование то же, что в герое главной.
 */
export const OFFER_COPY: Record<OgLocale, OfferCopy> = {
  ru: {
    eyebrow: 'CRM · сайты · SMM · ИИ',
    title: 'Наводим порядок в продажах',
    lead: 'Внедряем CRM, делаем сайты и подключаем ИИ-ботов — чтобы заявки не терялись.',
    tagline: 'Студия для малого и среднего бизнеса',
    facts: [
      { value: 'от 30 000 ₽', label: 'стоимость старта' },
      { value: 'от 5 дней', label: 'до запуска' },
      { value: '1 день', label: 'срок ответа' },
    ],
  },
  en: {
    eyebrow: 'CRM · websites · SMM · AI',
    title: 'We bring order to your sales',
    lead: 'CRM setup, websites and AI bots — so leads stop getting lost.',
    tagline: 'A studio for small and mid-sized business',
    facts: [
      { value: 'from RUB 30,000', label: 'starting price' },
      { value: '5+ days', label: 'to launch' },
      { value: '1 day', label: 'reply time' },
    ],
  },
};
