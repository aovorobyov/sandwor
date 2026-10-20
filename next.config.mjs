import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');
const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  // Старые адреса v1: «Создание сайтов» стало направлением в «Услугах», курс снят,
  // проекты стали кейсами, лента новостей и таймлайн — блогом.
  async redirects() {
    return [
      { source: '/projects/:path*', destination: '/cases', permanent: true },
      { source: '/en/projects/:path*', destination: '/en/cases', permanent: true },
      { source: '/projects', destination: '/cases', permanent: true },
      { source: '/en/projects', destination: '/en/cases', permanent: true },
      { source: '/:old(news|notes|timeline)/:path*', destination: '/blog', permanent: true },
      { source: '/en/:old(news|notes|timeline)/:path*', destination: '/en/blog', permanent: true },
      { source: '/:old(news|notes|timeline)', destination: '/blog', permanent: true },
      { source: '/en/:old(news|notes|timeline)', destination: '/en/blog', permanent: true },
      { source: '/websites', destination: '/services/sites', permanent: true },
      { source: '/en/websites', destination: '/en/services/sites', permanent: true },
      { source: '/course/:path*', destination: '/', permanent: true },
      { source: '/en/course/:path*', destination: '/en', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      // Telegram CDN domains for post photos
      { protocol: 'https', hostname: '*.telegram-cdn.org' },
      { protocol: 'https', hostname: '*.telesco.pe' },
    ],
  },
};

export default withAnalyzer(withNextIntl(nextConfig));
