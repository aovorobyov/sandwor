import { getLocale } from 'next-intl/server';
import { NotFoundPage } from '@/views/NotFoundPage';

/** Адреса вне маршрутов локалей: страница без шапки, с логотипом. */
export default async function NotFound() {
  const locale = await getLocale();

  // Корневой layout не рендерит <html>: у адресов вне локалей он свой.
  return (
    <html lang={locale} data-theme="dark">
      <body>
        <main style={{ flex: 1 }}>
          <NotFoundPage standalone />
        </main>
      </body>
    </html>
  );
}
