import type { MetadataRoute } from 'next';
import { MOCK_POSTS } from '@/views/BlogPage';

const BASE_URL = 'https://sandwor.com';

// Static page paths for localePrefix: 'never' mode.
const STATIC_PATHS = ['', '/blog', '/projects', '/notes', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_PATHS.map((path) => ({
    url: `${BASE_URL}${path === '' ? '' : path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const postEntries = MOCK_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
