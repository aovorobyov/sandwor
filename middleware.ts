import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n';

// next-intl middleware handles locale detection and redirects:
// - / → /ru (redirect to default locale)
// - /blog → /ru/blog (prefix missing locale)
export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  // Match all paths except Next.js internals and static files
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
