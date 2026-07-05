import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { ViewTransitions } from 'next-view-transitions';
import { OG_DEFAULT_IMAGE } from '@/shared/lib/seo/ogImage';
import { YandexMetrika } from '@/shared/lib/analytics';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://sandwor.ru'),
  title: {
    template: '%s | sandwor',
    default: 'sandwor',
  },
  description: 'Personal website',
  verification: {
    // По тегу на каждый ресурс Search Console — у доменов свои токены, Google берёт свой.
    google: [
      'u0eIVBtknauZqtkXlaBQ18pLIkExBF5UJifDJ0KeUCo', // sandwor.ru
      'arN6y5jaZLjtoMERFP81bY07HuVvPbBbhVysMeZRFRk', // sandwor.online
    ],
  },
  alternates: {
    types: {
      'application/atom+xml': '/feed.xml',
    },
  },
  openGraph: {
    siteName: 'sandwor',
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
          <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>

          <YandexMetrika />
        </body>
      </html>
    </ViewTransitions>
  );
}
