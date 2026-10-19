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
  // Старые адреса v1: «Создание сайтов» стало направлением в «Услугах», курс снят.
  async redirects() {
    return [
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
