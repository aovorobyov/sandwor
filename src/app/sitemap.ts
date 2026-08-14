import type { MetadataRoute } from 'next';
import { getPosts } from '@/entities/post/api/posts';
import { getProjects } from '@/entities/project';
import { COURSES_REGISTRY } from '@/views/CoursePage/config/registry';
import { SITE_URL as BASE_URL } from '@/shared/config/site';
import { defaultLocale, locales } from '@/i18n-routing';

type EntryMeta = Pick<
  MetadataRoute.Sitemap[number],
  'lastModified' | 'changeFrequency' | 'priority'
>;

/** URL страницы для локали: дефолтная — без префикса, остальные — с /{locale}. */
const buildLocaleUrl = (locale: string, path: string) => {
  const prefix = locale === defaultLocale ? '' : `/${locale}`;

  return `${BASE_URL}${prefix}${path}`;
};

/** Блок hreflang-альтернатив: по ссылке на каждую локаль + x-default на дефолтную. */
const buildLanguageAlternates = (path: string) => {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, buildLocaleUrl(locale, path)]),
  );

  return {
    languages: {
      ...languages,
      'x-default': buildLocaleUrl(defaultLocale, path),
    },
  };
};

/**
 * Раскрывает один путь в записи sitemap — по одной на локаль.
 * Режим `localePrefix: 'as-needed'`: у ru URL без префикса, у en — `/en/...`.
 * Каждая запись несёт полный блок `xhtml:link` (Next.js собирает его из `alternates.languages`).
 */
const toLocalizedEntries = (path: string, meta: EntryMeta): MetadataRoute.Sitemap => {
  const alternates = buildLanguageAlternates(path);

  return locales.map((locale) => ({
    url: buildLocaleUrl(locale, path),
    alternates,
    ...meta,
  }));
};

const STATIC_PATHS = [
  { path: '', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/blog', priority: 0.8, changeFrequency: 'daily' as const },
  { path: '/projects', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/timeline', priority: 0.6, changeFrequency: 'daily' as const },
  { path: '/news', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/contact', priority: 0.5, changeFrequency: 'yearly' as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([getPosts(), Promise.resolve(getProjects())]);
  const now = new Date();

  const staticEntries = STATIC_PATHS.flatMap(({ path, priority, changeFrequency }) =>
    toLocalizedEntries(path, { lastModified: now, changeFrequency, priority }),
  );

  const courseEntries = Object.keys(COURSES_REGISTRY).flatMap((courseId) =>
    toLocalizedEntries(`/course/${courseId}`, {
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    }),
  );

  const postEntries = posts.flatMap((post) =>
    toLocalizedEntries(`/blog/${post.slug}`, {
      lastModified: new Date(post.date),
      changeFrequency: 'yearly',
      priority: 0.7,
    }),
  );

  const projectEntries = projects.flatMap((project) =>
    toLocalizedEntries(`/projects/${project.slug}`, {
      lastModified: new Date(project.date),
      changeFrequency: 'yearly',
      priority: 0.6,
    }),
  );

  return [...staticEntries, ...courseEntries, ...postEntries, ...projectEntries];
}
