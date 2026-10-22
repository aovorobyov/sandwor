/** Идентификаторы каналов связи: совпадают с ключами в `contacts.*` переводов. */
export type ContactChannelId = 'telegram' | 'email' | 'phone';

export interface ContactChannel {
  id: ContactChannelId;
  /** Иконка из набора дизайн-системы. */
  icon: string;
  /** «Ручка» канала — одинакова на всех языках. */
  handle: string;
  href: string;
  /** Внешняя ссылка — открывается в новой вкладке. */
  isExternal?: boolean;
}

export const TELEGRAM_URL = 'https://t.me/sandworbot';
export const CONTACT_EMAIL = 'sandwor@mail.ru';

/**
 * Каналы связи по порядку важности: шапка, мобильное меню, подвал, страница контактов.
 * WhatsApp убран 21.10.2026: заблокирован в России с февраля 2026 года, переписка в нём
 * хранится за рубежом (см. локальную инструкцию docs/rkn-notification.md, шаг 3).
 */
export const CONTACT_CHANNELS: readonly ContactChannel[] = [
  {
    id: 'telegram',
    icon: 'brand-telegram',
    handle: '@sandworbot',
    href: TELEGRAM_URL,
    isExternal: true,
  },
  { id: 'email', icon: 'mail', handle: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { id: 'phone', icon: 'phone', handle: '+7 985 431-69-70', href: 'tel:+79854316970' },
];

/** Короткий список для меню и подвала: без дублей номера. */
export const PRIMARY_CONTACT_IDS: readonly ContactChannelId[] = ['email', 'telegram'];
