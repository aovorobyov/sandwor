interface NavLink {
  href: string;
  labelKey: string;
  /** Пункт-заглушка: показывается серым и не кликается (раздел ещё не наполнен). */
  isDisabled?: boolean;
}

/** Основная навигация — 4 пункта, одинаковые в шапке и футере. */
export const NAV_LINKS: readonly NavLink[] = [
  { href: '/websites', labelKey: 'nav.websites' },
  { href: '/cases', labelKey: 'nav.cases' },
  { href: '/blog', labelKey: 'nav.blog' },
  { href: '/contact', labelKey: 'nav.contact' },
];

interface SecondaryLink {
  href: string;
  labelKey: string;
  /** Внешняя ссылка (RSS) — открывается напрямую, без локале-роутинга. */
  isExternal?: boolean;
}

/** Второстепенные разделы — чипы в мобильном меню и колонка «Ещё» в футере. */
export const SECONDARY_LINKS: readonly SecondaryLink[] = [
  { href: '/course', labelKey: 'nav.course' },
  { href: '/feed.xml', labelKey: 'nav.rss', isExternal: true },
];
