import type { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import { OG_DEFAULT_IMAGE } from '@/shared/lib/seo/ogImage';
import { SITE_URL } from '@/shared/config/site';
// Порядок важен: токены и шрифты ДС → сброс отступов → стили компонентов ДС → глобальные стили сайта.
import '@/shared/sandwor/tokens/tokens.css';
import './reset.css';
import '@/shared/sandwor/src/sandwor.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | sandwor',
    default: 'sandwor',
  },
  description:
    'CRM, сайты, SMM и ИИ-автоматизации для малого и среднего бизнеса. Наводим порядок в продажах.',
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
      <html lang="ru" data-theme="dark" suppressHydrationWarning>
        <body>{children}</body>
      </html>
    </ViewTransitions>
  );
}
