import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

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
};

export default withNextIntl(nextConfig);
