import type { MetadataRoute } from 'next';
import { getTelegramPosts } from '@/entities/post/api/telegram';
import { getProjects } from '@/entities/project';
import { COURSES_REGISTRY } from '@/views/CoursePage/config/registry';

const BASE_URL = 'https://sandwor.com';

/**
 * Сайт работает в режиме `localePrefix: 'never'` — обе локали отдаются на одном URL,
 * язык выбирается кукой. В sitemap декларируем страницу как мультиязычную через
 * `xhtml:link` (Next.js собирает их из `alternates.languages`).
 */
const withLocaleAlternates = (path: string) => {
  const url = `${BASE_URL}${path}`;
  return {
    url,
    alternates: {
      languages: {
        ru: url,
        en: url,
        'x-default': url,
      },
    },
  };
};

const STATIC_PATHS = [
  { path: '', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/blog', priority: 0.8, changeFrequency: 'daily' as const },
  { path: '/projects', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/notes', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.5, changeFrequency: 'yearly' as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([
    getTelegramPosts(),
    Promise.resolve(getProjects()),
  ]);
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map(
    ({ path, priority, changeFrequency }) => ({
      ...withLocaleAlternates(path),
      lastModified: now,
      changeFrequency,
      priority,
    }),
  );

  const courseEntries: MetadataRoute.Sitemap = Object.keys(COURSES_REGISTRY).map((courseId) => ({
    ...withLocaleAlternates(`/course/${courseId}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    ...withLocaleAlternates(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    ...withLocaleAlternates(`/projects/${project.slug}`),
    lastModified: new Date(project.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticEntries, ...courseEntries, ...postEntries, ...projectEntries];
}
