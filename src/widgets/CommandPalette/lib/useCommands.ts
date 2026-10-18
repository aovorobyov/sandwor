'use client';

import { useTranslations } from 'next-intl';
import { useTransitionRouter } from 'next-view-transitions';
import { useLocaleSwitch } from '@/features/locale-switch';
import { locales, type Locale } from '@/i18n-routing';
import { useLocalePaths } from '@/shared/lib/i18n';
import { SERVICE_NAV, SITE_NAV } from '../../lib/siteNav';
import type { PaletteCommand } from '../CommandPalette.types';
import type { PaletteSearchPost } from './paletteApi';

const NAV_ICONS: Record<string, string> = {
  '/': 'point',
  '/services': 'layout-grid',
  '/cases': 'briefcase',
  '/blog': 'file-text',
  '/contact': 'mail',
};

const SERVICE_ICONS = { crm: 'layout-kanban', sites: 'browser', smm: 'message-circle', ai: 'cpu' };

const LOCALE_LABELS: Record<Locale, string> = {
  ru: 'Русский',
  en: 'English',
};

export const useCommands = (posts: PaletteSearchPost[] = []): PaletteCommand[] => {
  const t = useTranslations();
  const router = useTransitionRouter();
  const { href } = useLocalePaths();
  const { switchLocale, currentLocale } = useLocaleSwitch();

  const navCommands: PaletteCommand[] = [{ href: '/', labelKey: 'nav.home' }, ...SITE_NAV].map(
    (item) => ({
      id: `nav-${item.href}`,
      label: t(item.labelKey),
      group: 'navigation',
      icon: NAV_ICONS[item.href] ?? 'point',
      // href() — иначе на EN палитра увела бы на RU-версию (as-needed).
      onSelect: () => router.push(href(item.href)),
    }),
  );

  const serviceCommands: PaletteCommand[] = SERVICE_NAV.filter((item) => item.isActive).map(
    (item) => ({
      id: `service-${item.id}`,
      label: t(`services.items.${item.id}.title`),
      group: 'service',
      icon: SERVICE_ICONS[item.id],
      keywords: `${item.id} ${t(`service-labels.${item.id}`)}`,
      onSelect: () => router.push(href(item.href)),
    }),
  );

  const postCommands: PaletteCommand[] = posts.map((post) => ({
    id: `post-${post.slug}`,
    label: post.title,
    group: 'post',
    icon: 'file-text',
    keywords: `post статья ${post.tag}`,
    onSelect: () => router.push(href(`/blog/${post.slug}`)),
  }));

  const localeCommands: PaletteCommand[] = locales
    .filter((locale) => locale !== currentLocale)
    .map((locale) => ({
      id: `locale-${locale}`,
      label: t('palette.switchLocale', { locale: LOCALE_LABELS[locale] }),
      group: 'locale',
      icon: 'world',
      keywords: `language локаль язык ${locale} ${LOCALE_LABELS[locale]}`,
      onSelect: () => switchLocale(locale),
    }));

  return [...navCommands, ...serviceCommands, ...postCommands, ...localeCommands];
};
