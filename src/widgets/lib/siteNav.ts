import type { ServiceId } from '@/entities/service';
import { SERVICE_IDS, getServiceHref } from '@/entities/service';

export interface SiteNavLink {
  /** Путь без префикса локали. */
  href: string;
  /** Ключ подписи в переводах. */
  labelKey: string;
}

/** Основная навигация — одинаковая в шапке, мобильном меню и палитре. */
export const SITE_NAV: readonly SiteNavLink[] = [
  { href: '/services', labelKey: 'nav.services' },
  { href: '/cases', labelKey: 'nav.cases' },
  { href: '/blog', labelKey: 'nav.blog' },
  { href: '/contact', labelKey: 'nav.contact' },
];

/** Ссылки на страницы направлений. */
export const SERVICE_NAV: readonly { id: ServiceId; href: string }[] = SERVICE_IDS.map((id) => ({
  id,
  href: getServiceHref(id),
}));

/** Раздел активен на своей странице и на вложенных (`/blog/slug`). */
export const isActivePath = (pathname: string, href: string): boolean => {
  return pathname === href || pathname.startsWith(`${href}/`);
};
