'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { cycleAccent } from '@/features/accent-toggle';
import { useLocaleSwitch } from '@/features/locale-switch';
import { locales, type Locale } from '@/i18n-routing';
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
  const router = useRouter();
  const { setTheme } = useTheme();
  const { switchLocale, currentLocale } = useLocaleSwitch();

  const navCommands: PaletteCommand[] = NAV_LINKS.map(({ id, href, labelKey, icon }) => {
    return {
      id,
      label: t(labelKey),
      group: 'navigation',
      icon,
      onSelect: () => router.push(href),
    };
  });

  const postCommands: PaletteCommand[] = posts.map((post) => {
    return {
      id: `post-${post.slug}`,
      label: post.title,
      group: 'post',
      icon: 'post',
      keywords: `post статья ${post.tag}`,
      onSelect: () => router.push(`/blog/${post.slug}`),
    };
  });

  const themeCommands: PaletteCommand[] = [
    {
      id: 'theme-light',
      label: t('palette.themeLight'),
      group: 'theme',
      icon: 'light',
      keywords: 'light светлая day',
      onSelect: () => setTheme('light'),
    },
    {
      id: 'theme-dark',
      label: t('palette.themeDark'),
      group: 'theme',
      icon: 'dark',
      keywords: 'dark тёмная темная night',
      onSelect: () => setTheme('dark'),
    },
    {
      id: 'theme-system',
      label: t('palette.themeSystem'),
      group: 'theme',
      icon: 'system',
      keywords: 'system auto системная',
      onSelect: () => setTheme('system'),
    },
  ];

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

  const accentCommand: PaletteCommand = {
    id: 'accent-cycle',
    label: t('palette.accentChange'),
    group: 'accent',
    icon: 'drop',
    keywords: 'color цвет акцент палитра',
    onSelect: () => cycleAccent(),
  };

  return [...navCommands, ...postCommands, ...themeCommands, ...localeCommands, accentCommand];
};
