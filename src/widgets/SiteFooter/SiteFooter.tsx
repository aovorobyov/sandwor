'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Footer } from '@sw/components/Footer';
import { useBrief } from '@/features/brief';
import { buildLocalePath } from '@/features/locale-switch';
import { defaultLocale, locales, type Locale } from '@/i18n-routing';
import { CONTACT_CHANNELS, PRIMARY_CONTACT_IDS } from '@/shared/config/contacts';
import { byPositioning } from '@/shared/config/positioning';
import { useLocalePaths } from '@/shared/lib/i18n';
import { SERVICE_NAV, SITE_NAV } from '../lib/siteNav';

/** Соцсети под логотипом: только каналы, где нам можно написать. */
const SOCIAL_IDS = ['telegram', 'whatsapp'] as const;

/**
 * Подвал на Footer дизайн-системы: CTA-полоса с брифом, услуги, разделы,
 * контакты и юридическая строка со ссылкой на политику и переключателем языка.
 */
export const SiteFooter: FC = () => {
  const t = useTranslations();
  const { openBrief } = useBrief();
  const { locale, path, href } = useLocalePaths();

  const otherLocale = locales.find((item) => item !== locale) ?? defaultLocale;
  const otherLocaleHref = buildLocalePath(href(path), locale as Locale, otherLocale);

  return (
    <Footer
      logoHref={href('/')}
      tagline={t(byPositioning({ sites: 'brand.tagline', studio: 'brand.tagline-studio' }))}
      cta={{
        title: t('footer.cta-title'),
        text: t('footer.cta-text'),
        action: { label: t('footer.cta-action'), onClick: () => openBrief() },
      }}
      columns={[
        {
          title: t('footer.services'),
          links: SERVICE_NAV.map((item) =>
            item.isActive
              ? { label: t(`services.items.${item.id}.title`), href: href(item.href) }
              : {
                  label: `${t(`service-labels.${item.id}`)}\u00a0·\u00a0${t('common.soon')}`,
                },
          ),
        },
        {
          title: t('footer.company'),
          links: SITE_NAV.filter((item) => item.href !== '/services').map((item) => ({
            label: t(item.labelKey),
            href: href(item.href),
          })),
        },
      ]}
      contactsTitle={t('footer.contacts-title')}
      contacts={CONTACT_CHANNELS.filter((channel) => PRIMARY_CONTACT_IDS.includes(channel.id)).map(
        (channel) => ({
          label: t(`contacts.${channel.id}`),
          value: channel.handle,
          href: channel.href,
        }),
      )}
      socials={CONTACT_CHANNELS.filter((channel) =>
        (SOCIAL_IDS as readonly string[]).includes(channel.id),
      ).map((channel) => ({
        icon: channel.icon,
        label: t(`contacts.${channel.id}`),
        href: channel.href,
        target: '_blank',
        rel: 'noopener noreferrer',
      }))}
      legal={t('footer.rights', { year: new Date().getFullYear() })}
      legalLinks={[
        { label: t('footer.privacy'), href: href('/privacy') },
        { label: t('footer.consent'), href: href('/consent') },
        // hrefLang: переход на другой язык — полная загрузка страницы (LinkInterceptor
        // её не перехватывает), чтобы чат amoCRM и всё прочее поднялись на новом языке.
        {
          label: t('footer.language'),
          href: otherLocaleHref,
          hrefLang: otherLocale,
          lang: otherLocale,
          ariaLabel: t('footer.language-aria'),
        },
      ]}
    />
  );
};
