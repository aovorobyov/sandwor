import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { ViewTransitions } from 'next-view-transitions';
import { OG_DEFAULT_IMAGE } from '@/shared/lib/seo/ogImage';
import { YandexMetrika } from '@/shared/lib/analytics';
import { SITE_URL } from '@/shared/config/site';
import { IS_SITE_CLOSED } from '@/shared/config/soon';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | sandwor studio',
    default: 'sandwor studio',
  },
  description: 'Personal website',
  verification: {
    // Ресурс sandwor.ru в Search Console.
    google: 'u0eIVBtknauZqtkXlaBQ18pLIkExBF5UJifDJ0KeUCo',
  },
  alternates: {
    types: {
      'application/atom+xml': '/feed.xml',
    },
  },
  openGraph: {
    siteName: 'sandwor studio',
    type: 'website',
    images: [OG_DEFAULT_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    images: [OG_DEFAULT_IMAGE.url],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html suppressHydrationWarning>
        <body>
          {/* Заглушка собрана на дизайн-системе v2, у неё одна тема — тёмная. */}
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="system"
            enableSystem
            forcedTheme={IS_SITE_CLOSED ? 'dark' : undefined}
          >
            {children}
          </ThemeProvider>

          {/* На заглушке нет политики и уведомления о cookie — Метрику не подключаем. */}
          {!IS_SITE_CLOSED && <YandexMetrika />}
        </body>
      </html>
    </ViewTransitions>
  );
}
