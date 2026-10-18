/** Идентификаторы каналов связи: совпадают с ключами в `contact.channels`. */
export type ContactChannelId = 'telegram' | 'whatsapp' | 'email';

/** Основной канал — выносится в primary-CTA, поэтому не дублируется в ряду соцсетей. */
export const PRIMARY_EMAIL = 'mailto:sandwor@mail.ru';

/** Прямой email и телефон для блока статуса в герое. */
export const CONTACT_EMAIL = 'sandwor@mail.ru';
export const CONTACT_PHONE_HREF = 'tel:+79854316970';

/**
 * Развёрнутый список каналов связи: подпись + «ручка» со стрелкой.
 * `id` совпадает с ключом в `contact.channels` — подпись приходит из переводов,
 * иначе «Почта» утекает в английскую локаль. Сами «ручки» одинаковы на всех языках.
 */
export const CONTACT_LINKS: { id: ContactChannelId; handle: string; href: string }[] = [
  { id: 'telegram', handle: '@sandworbot', href: 'https://t.me/sandworbot' },
  { id: 'whatsapp', handle: '+7 985 431-69-70', href: 'https://wa.me/79854316970' },
  { id: 'email', handle: 'sandwor@mail.ru', href: 'mailto:sandwor@mail.ru' },
];
