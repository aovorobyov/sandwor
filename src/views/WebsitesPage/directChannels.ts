import type { DirectChannelId } from './WebsitesPage.types';

/**
 * Прямые каналы связи рядом с формой заявки — мессенджеры конвертят выше формы.
 * `id` совпадает с ключом в `websites.order-direct` и именем логотипа ChannelIcon.
 */
export const DIRECT_CHANNELS: { id: DirectChannelId; href: string }[] = [
  { id: 'telegram', href: 'https://t.me/aovorobyov' },
  { id: 'whatsapp', href: 'https://wa.me/79854316970' },
];
