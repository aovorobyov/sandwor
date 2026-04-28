import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n-routing';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Explicitly rewrite non-prefixed paths to the default locale route tree.
  // This avoids 404 when only /[locale] routes exist in App Router.
  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (!hasLocalePrefix) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(rewriteUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all paths except Next.js internals and static files
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
