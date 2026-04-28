import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale, defaultLocale } from './i18n-routing';

export { locales, type Locale, defaultLocale };

export default getRequestConfig(async ({ locale }) => {
  // Validate incoming locale parameter
  if (!locales.includes(locale as Locale)) notFound();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
