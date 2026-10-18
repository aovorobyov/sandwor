import { POSITIONING, type Positioning } from '@/shared/config/positioning';
import type { OfferCopy, OgLocale } from './route.types';

/**
 * Текст продающей обложки — отдельный от переводов страниц: edge-роут не тянет
 * весь бандл `messages`, а формулировки для превью в мессенджерах короче
 * страничных. Позиционирование то же, что в герое главной.
 */
/** Тексты обложки для каждого позиционирования (`shared/config/positioning`). */
const OFFER_COPY_BY_POSITIONING: Record<Positioning, Record<OgLocale, OfferCopy>> = {
  sites: {
    ru: {
      eyebrow: 'Создание сайтов под ключ',
      title: 'Делаем сайты, которые приносят заявки',
      lead: 'Лендинги и магазины на Tilda и кастомная разработка — инструмент под вашу задачу и бюджет.',
      tagline: 'Сайты для бизнеса под ключ',
      facts: [
        { value: 'от 50 000 ₽', label: 'стоимость запуска' },
        { value: '1–2 недели', label: 'до публикации' },
        { value: '1 день', label: 'срок ответа' },
      ],
    },
    en: {
      eyebrow: 'Turnkey websites',
      title: 'Websites that bring you leads',
      lead: 'Tilda landing pages and stores and custom builds — the right tool for your goal and budget.',
      tagline: 'Websites for business, end to end',
      facts: [
        { value: 'from RUB 50,000', label: 'launch price' },
        { value: '1–2 weeks', label: 'to go live' },
        { value: '1 day', label: 'reply time' },
      ],
    },
  },
  studio: {
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
  },
};

export const OFFER_COPY: Record<OgLocale, OfferCopy> = OFFER_COPY_BY_POSITIONING[POSITIONING];
