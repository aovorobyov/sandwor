/** Основной канал — выносится в primary-CTA, поэтому не дублируется в ряду соцсетей. */
export const PRIMARY_EMAIL = 'mailto:aovorobyov@mail.ru';

/** Прямой email и телефон для блока статуса в герое. */
export const CONTACT_EMAIL = 'aovorobyov@mail.ru';
export const CONTACT_PHONE_HREF = 'tel:+79854316970';

/** Развёрнутый список каналов связи: подпись + «ручка» со стрелкой. */
export const CONTACT_LINKS = [
  { label: 'Telegram', handle: '@aovorobyov', href: 'https://t.me/aovorobyov' },
  { label: 'WhatsApp', handle: '+7 985 431-69-70', href: 'https://wa.me/79854316970' },
  { label: 'Почта', handle: 'aovorobyov@mail.ru', href: 'mailto:aovorobyov@mail.ru' },
  { label: 'GitHub', handle: 'github.com/aovorobyov', href: 'https://github.com/aovorobyov' },
] as const;

/**
 * Страницы, убранные из основной навигации, но доступные по прямой ссылке.
 * Собраны здесь, чтобы не терялись после урезания шапки до 4 пунктов.
 */
export const SECONDARY_LINKS = [{ href: '/course', labelKey: 'nav.course' }] as const;
