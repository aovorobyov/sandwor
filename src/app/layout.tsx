import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { ViewTransitions } from 'next-view-transitions';
import { OG_DEFAULT_IMAGE } from '@/shared/lib/seo/ogImage';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://sandwor.ru'),
  title: {
    template: '%s | sandwor',
    default: 'sandwor',
  },
  description: 'Personal website',
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
        </body>
      </html>
    </ViewTransitions>
  );
}
