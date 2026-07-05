interface NavLink {
  href: string;
  labelKey: string;
  /** Пункт-заглушка: показывается серым и не кликается (раздел ещё не наполнен). */
  isDisabled?: boolean;
}

export const NAV_LINKS: readonly NavLink[] = [
  { href: '/websites', labelKey: 'nav.websites' },
  { href: '/cases', labelKey: 'nav.cases', isDisabled: true },
  { href: '/blog', labelKey: 'nav.blog' },
  { href: '/contact', labelKey: 'nav.contact' },
];
