'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useLocaleSwitch } from '@/features/locale-switch';
import { locales, type Locale } from '@/i18n-routing';
import { localizeHref } from '@/shared/ui/Link/localizeHref';
import type { DotIconName } from '@/shared/ui';
import type { PaletteCommand } from '../CommandPalette.types';
import type { PaletteSearchPost } from './paletteApi';

interface NavLink {
  id: string;
  href: string;
  labelKey: string;
  icon: DotIconName;
}

const NAV_LINKS: NavLink[] = [
  { id: 'nav-home', href: '/', labelKey: 'nav.home', icon: 'home' },
  { id: 'nav-websites', href: '/websites', labelKey: 'nav.websites', icon: 'projects' },
  { id: 'nav-blog', href: '/blog', labelKey: 'nav.blog', icon: 'blog' },
  { id: 'nav-projects', href: '/projects', labelKey: 'nav.projects', icon: 'projects' },
  { id: 'nav-news', href: '/news', labelKey: 'nav.news', icon: 'news' },
  { id: 'nav-timeline', href: '/timeline', labelKey: 'nav.timeline', icon: 'news' },
  { id: 'nav-course', href: '/course/ai-basics', labelKey: 'nav.course', icon: 'course' },
  { id: 'nav-contact', href: '/contact', labelKey: 'nav.contact', icon: 'mail' },
  { id: 'nav-uikit', href: '/uikit', labelKey: 'nav.uikit', icon: 'uikit' },
];

const LOCALE_LABELS: Record<Locale, string> = {
  ru: 'Русский',
  en: 'English',
};

export const useCommands = (posts: PaletteSearchPost[] = []): PaletteCommand[] => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { switchLocale, currentLocale } = useLocaleSwitch();

  const navCommands: PaletteCommand[] = NAV_LINKS.map(({ id, href, labelKey, icon }) => {
    return {
      id,
      label: t(labelKey),
      group: 'navigation',
      icon,
      // localizeHref — иначе на EN палитра увела бы на RU-версию (as-needed).
      onSelect: () => router.push(localizeHref(href, locale)),
    };
  });

  const postCommands: PaletteCommand[] = posts.map((post) => {
    return {
      id: `post-${post.slug}`,
      label: post.title,
      group: 'post',
      icon: 'post',
      keywords: `post статья ${post.tag}`,
      onSelect: () => router.push(localizeHref(`/blog/${post.slug}`, locale)),
    };
  });

  const localeCommands: PaletteCommand[] = locales
    .filter((locale) => {
      return locale !== currentLocale;
    })
    .map((locale) => {
      return {
        id: `locale-${locale}`,
        label: t('palette.switchLocale', { locale: LOCALE_LABELS[locale] }),
        group: 'locale',
        icon: 'locale',
        keywords: `language локаль язык ${locale} ${LOCALE_LABELS[locale]}`,
        onSelect: () => switchLocale(locale),
      };
    });

  return [...navCommands, ...postCommands, ...localeCommands];
};
