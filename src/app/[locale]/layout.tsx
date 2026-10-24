import { notFound } from 'next/navigation';
import { BRAND_NAME } from '@/shared/config/site';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import { locales, type Locale } from '@/i18n-routing';
import { SiteHeader } from '@/widgets/SiteHeader';
import { SiteFooter } from '@/widgets/SiteFooter';
import { CommandPalette } from '@/widgets/CommandPalette';
import { ScrollReset } from '@/widgets/ScrollReset';
import { BriefProvider } from '@/features/brief';
import { CookieConsent } from '@/features/cookie-consent';
import { LinkInterceptor } from '@/shared/lib/navigation';
import { AttributionCapture } from '@/shared/lib/attribution';
import { pickClientMessages } from '@/shared/lib/i18n/clientMessages';
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
      template: `%s | ${BRAND_NAME}`,
      absolute: t(byPositioning({ sites: 'title', studio: 'title-studio' })),
    },
    description: t(byPositioning({ sites: 'description', studio: 'description-studio' })),
  };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!locales.includes(locale as Locale)) notFound();

  // Enable static rendering for this locale
  setRequestLocale(locale);

  const [messages, t] = await Promise.all([getMessages(), getTranslations('nav')]);

  return (
    <ViewTransitions>
      <html lang={locale} data-theme="dark" suppressHydrationWarning>
        <body>
          <NextIntlClientProvider messages={pickClientMessages(messages)}>
            <BriefProvider>
              {/* Первая ссылка на странице: с клавиатуры — сразу к содержимому, мимо меню. */}
              <a href="#main" className="skip-link">
                {t('skip')}
              </a>
              <LinkInterceptor />
              <AttributionCapture />
              <ScrollReset />
              <SiteHeader />
              <main id="main" tabIndex={-1} style={{ flex: 1 }}>
                {children}
              </main>
              <SiteFooter />
              <CommandPalette />
              {/* Уведомление о cookie, Метрика и чат amoCRM (появляется после уведомления). */}
              <CookieConsent />
            </BriefProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
