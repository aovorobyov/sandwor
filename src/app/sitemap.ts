import type { MetadataRoute } from 'next';
import { getPosts } from '@/entities/post/api/posts';
import { ACTIVE_SERVICE_IDS, getServiceHref } from '@/entities/service';
import { PUBLISHED_CASE_SLUGS } from '@/entities/case';
import { buildLocaleUrl } from '@/shared/lib/seo/buildLocaleUrl';
import { defaultLocale, locales } from '@/i18n-routing';

type EntryMeta = Pick<
  MetadataRoute.Sitemap[number],
  'lastModified' | 'changeFrequency' | 'priority'
>;

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
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/cases', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.5, changeFrequency: 'yearly' as const },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' as const },
  { path: '/consent', priority: 0.2, changeFrequency: 'yearly' as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const now = new Date();

  const staticEntries = STATIC_PATHS.flatMap(({ path, priority, changeFrequency }) =>
    toLocalizedEntries(path, { lastModified: now, changeFrequency, priority }),
  );

  // Направления «Скоро» закрыты от индексации — в sitemap их нет.
  const serviceEntries = ACTIVE_SERVICE_IDS.flatMap((id) =>
    toLocalizedEntries(getServiceHref(id), {
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    }),
  );

  const caseEntries = PUBLISHED_CASE_SLUGS.flatMap((slug) =>
    toLocalizedEntries(`/cases/${slug}`, {
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.6,
    }),
  );

  const postEntries = posts.flatMap((post) =>
    toLocalizedEntries(`/blog/${post.slug}`, {
      lastModified: new Date(post.date),
      changeFrequency: 'yearly',
      priority: 0.7,
    }),
  );

  return [...staticEntries, ...serviceEntries, ...caseEntries, ...postEntries];
}
