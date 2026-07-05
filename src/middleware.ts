import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n-routing';

// В режиме `as-needed` next-intl сам разбирает префиксы: `/en/...` отдаёт EN,
// а обращения к дефолтной локали с префиксом (`/ru/...`) редиректит на URL без него.
export default createMiddleware(routing);

export const config = {
  // Match all paths except API routes, Next.js internals and static files.
  // `api` обязателен в исключениях — иначе next-intl перехватывает /api/* и отдаёт 404.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
