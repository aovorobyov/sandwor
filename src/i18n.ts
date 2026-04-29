import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale, defaultLocale } from './i18n-routing';

export { locales, type Locale, defaultLocale };

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;

  // Handle requests without locale prefix by falling back to default.
  if (!requestedLocale) {
    return {
      locale: defaultLocale,
      messages: (await import(`../messages/${defaultLocale}.json`)).default,
    };
  }

  // Validate incoming locale parameter.
  if (!locales.includes(requestedLocale as Locale)) notFound();

  return {
    locale: requestedLocale,
    messages: (await import(`../messages/${requestedLocale}.json`)).default,
  };
});
