import type { ContactChannel } from './contacts.types';

/** Основной канал — выносится в primary-CTA, поэтому не дублируется в ряду соцсетей. */
export const PRIMARY_EMAIL = 'mailto:aovorobyov@mail.ru';

/** Соцсети для иконного ряда (без почты — она вынесена в CTA). */
export const CONTACT_CHANNELS: ContactChannel[] = [
  { id: 'telegram', label: 'Telegram', href: 'https://t.me/sandwor' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/aovorobyov' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/sandwor/' },
  { id: 'vk', label: 'VK', href: 'https://vk.com/sandwor' },
];
