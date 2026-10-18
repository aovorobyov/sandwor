'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SiteHeader as DsSiteHeader } from '@sw/components/SiteHeader';
import { useBrief } from '@/features/brief';
import { CONTACT_CHANNELS, PRIMARY_CONTACT_IDS, TELEGRAM_URL } from '@/shared/config/contacts';
import { useLocalePaths } from '@/shared/lib/i18n';
import { SERVICE_NAV, SITE_NAV, isActivePath } from '../lib/siteNav';

/**
 * Шапка сайта на SiteHeader дизайн-системы: разделы, Telegram и одна
 * primary-кнопка «Обсудить проект», которая открывает бриф. Уже 880px разделы
 * уходят в бургер и MobileMenu — с группой услуг и контактами.
 */
export const SiteHeader: FC = () => {
  const t = useTranslations();
  const { openBrief } = useBrief();
  const { path, href } = useLocalePaths();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cta = { label: t('header.cta'), onClick: () => openBrief() };

  // Из мобильного меню бриф открывается после его закрытия: два диалога сразу —
  // две ловушки фокуса.
  const menuCta = {
    label: t('header.cta'),
    onClick: () => {
      setIsMenuOpen(false);
      openBrief();
    },
  };

  return (
    <DsSiteHeader
      logoHref={href('/')}
      navLabel={t('nav.label')}
      menuLabel={t('header.menu')}
      nav={SITE_NAV.map((item) => ({
        label: t(item.labelKey),
        href: href(item.href),
        active: isActivePath(path, item.href),
      }))}
      cta={cta}
      menuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      secondary={{
        icon: 'brand-telegram',
        label: t('header.telegram'),
        href: TELEGRAM_URL,
        target: '_blank',
        rel: 'noopener noreferrer',
      }}
      menu={{
        label: t('header.menu-title'),
        closeLabel: t('header.menu-close'),
        navLabel: t('header.menu-nav'),
        servicesTitle: t('header.services-title'),
        services: SERVICE_NAV.map((item) => ({
          id: item.id,
          label: t(`services.items.${item.id}.title`),
          href: href(item.href),
        })),
        contacts: CONTACT_CHANNELS.filter((channel) =>
          PRIMARY_CONTACT_IDS.includes(channel.id),
        ).map((channel) => ({
          label: t(`contacts.${channel.id}`),
          value: channel.handle,
          href: channel.href,
        })),
        cta: menuCta,
      }}
    />
  );
};
