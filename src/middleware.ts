import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n-routing';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'never',
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Backward compatibility for existing locale-prefixed links.
  const matchedLocale = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (matchedLocale) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = pathname.replace(new RegExp(`^/${matchedLocale}`), '') || '/';

    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set('NEXT_LOCALE', matchedLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });

    return response;
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all paths except API routes, Next.js internals and static files.
  // `api` обязателен в исключениях — иначе next-intl перехватывает /api/* и отдаёт 404.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
