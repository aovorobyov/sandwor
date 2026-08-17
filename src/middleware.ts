import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing, toLocale } from './i18n-routing';
import {
  IS_SITE_CLOSED,
  SOON_LOCALE_HEADER,
  SOON_PATH,
  SOON_RETRY_AFTER_SECONDS,
} from './shared/config/soon';

// В режиме `as-needed` next-intl сам разбирает префиксы: `/en/...` отдаёт EN,
// а обращения к дефолтной локали с префиксом (`/ru/...`) редиректит на URL без него.
const intlMiddleware = createMiddleware(routing);

/**
 * Тизер вместо любой страницы: rewrite сохраняет исходный URL в адресной строке,
 * а 503 + `Retry-After` говорят поисковикам «это временно, не выкидывайте из индекса».
 */
const buildSoonResponse = (request: NextRequest): NextResponse => {
  const url = request.nextUrl.clone();
  url.pathname = SOON_PATH;
  url.search = '';

  const [, localePrefix] = request.nextUrl.pathname.split('/');
  const headers = new Headers(request.headers);

  headers.set(SOON_LOCALE_HEADER, toLocale(localePrefix));

  const response = NextResponse.rewrite(url, { request: { headers }, status: 503 });

  response.headers.set('Retry-After', String(SOON_RETRY_AFTER_SECONDS));
  // Тизер нельзя кешировать: иначе он останется у клиентов и CDN после выключения флага.
  response.headers.set('Cache-Control', 'no-store, must-revalidate');

  return response;
};

const middleware = (request: NextRequest) => {
  if (IS_SITE_CLOSED) {
    return buildSoonResponse(request);
  }

  return intlMiddleware(request);
};

export default middleware;

export const config = {
  // Match all paths except API routes, Next.js internals and static files.
  // `api` обязателен в исключениях — иначе next-intl перехватывает /api/* и отдаёт 404.
  // Тот же список работает и в режиме анонса: telegram-вебхук, robots и sitemap живут дальше.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
