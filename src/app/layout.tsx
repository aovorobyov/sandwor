import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { ViewTransitions } from 'next-view-transitions';
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
