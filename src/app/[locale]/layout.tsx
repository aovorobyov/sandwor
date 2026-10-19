import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { locales, type Locale } from '@/i18n-routing';
import { SiteHeader } from '@/widgets/SiteHeader';
import { SiteFooter } from '@/widgets/SiteFooter';
import { CommandPalette } from '@/widgets/CommandPalette';
import { ScrollReset } from '@/widgets/ScrollReset';
import { BriefProvider } from '@/features/brief';
import { CookieConsent } from '@/features/cookie-consent';
import { LinkInterceptor } from '@/shared/lib/navigation';
import { byPositioning } from '@/shared/config/positioning';

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: {
      template: '%s | sandwor',
      absolute: t(byPositioning({ sites: 'title', studio: 'title-studio' })),
    },
    description: t(byPositioning({ sites: 'description', studio: 'description-studio' })),
  };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!locales.includes(locale as Locale)) notFound();

  // Enable static rendering for this locale
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <BriefProvider>
        <LinkInterceptor />
        <ScrollReset />
        <SiteHeader />
        <main style={{ flex: 1 }}>{children}</main>
        <SiteFooter />
        <CommandPalette />
        {/* Уведомление о cookie, Метрика и чат amoCRM (появляется после уведомления). */}
        <CookieConsent />
      </BriefProvider>
    </NextIntlClientProvider>
  );
}
