import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');
const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Telegram CDN domains for post photos
      { protocol: 'https', hostname: '*.telegram-cdn.org' },
      { protocol: 'https', hostname: '*.telesco.pe' },
    ],
  },
  redirects: async () => {
    return [
      // Старый /notes сохранял индексацию в Google (был в sitemap) — перенаправляем
      // на новый /news, чтобы не плодить 404 и сохранить SEO-вес.
      { source: '/notes', destination: '/news', permanent: true },
    ];
  },
};

export default withAnalyzer(withNextIntl(nextConfig));
