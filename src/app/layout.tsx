import type { Metadata } from 'next';
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
  // Запасное описание (404 и страницы без своего): совпадает с позиционированием «сайты».
  description:
    'Сайты для бизнеса под ключ: лендинги и магазины на Tilda, кастомная разработка. Заявки сразу в CRM.',
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
    siteName: 'sandwor',
    type: 'website',
    images: [OG_DEFAULT_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    images: [OG_DEFAULT_IMAGE.url],
  },
};

/**
 * Корневой layout только подключает стили и общие метаданные. <html> с верным `lang`
 * рендерит layout локали (`[locale]/layout.tsx`), а адреса вне локалей — `not-found.tsx`.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
