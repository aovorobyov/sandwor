import type { MetadataRoute } from 'next';
import { locales } from '@/i18n';
import { MOCK_POSTS } from '@/views/BlogPage';

const BASE_URL = 'https://sandwor.space';

// Static page paths (excluding locale prefix — added below)
const STATIC_PATHS = ['', '/blog', '/projects', '/notes', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = locales.flatMap((locale) =>
    STATIC_PATHS.map((path) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
    })),
  );

  const postEntries = locales.flatMap((locale) =>
    MOCK_POSTS.map((post) => ({
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  );

  return [...staticEntries, ...postEntries];
}
