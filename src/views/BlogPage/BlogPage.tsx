import { getLocale, getTranslations } from 'next-intl/server';
import { Tabs } from '@sw/components/Tabs';
import { getPosts } from '@/entities/post/api/posts';
import { LeadMagnet } from '@/features/lead-magnet';
import { PostsGrid } from '@/widgets/PostsGrid';
import { JsonLd, buildBreadcrumbs } from '@/shared/lib/jsonLd';
import { localizeHref } from '@/shared/ui/Link';
import { PageHero } from '@/shared/ui/PageHero';
import { Section } from '@/shared/ui/Section';

const ALL = 'all';

export const BlogPage = async () => {
  const locale = await getLocale();
  const [t, posts] = await Promise.all([getTranslations(), getPosts(locale)]);
  const href = (path: string) => localizeHref(path, locale);

  const tags = Array.from(new Set(posts.map((post) => post.tag)));

  return (
    <>
      <JsonLd
        data={buildBreadcrumbs([
          { name: t('nav.home'), path: href('/') },
          { name: t('nav.blog'), path: href('/blog') },
        ])}
      />

      <PageHero
        breadcrumbs={[{ label: t('nav.home'), href: href('/') }, { label: t('nav.blog') }]}
        meta={t('blog-page.meta')}
        title={t('blog-page.title')}
        lead={t('blog-page.lead')}
      />

      <Section spacing="s" aria-label={t('blog-page.title')}>
        {tags.length > 1 ? (
          <Tabs
            label={t('blog-page.filter-label')}
            items={[
              { id: ALL, label: t('blog-page.filter-all'), count: posts.length },
              // id без пробелов: из него собираются aria-controls / aria-labelledby.
              ...tags.map((tag, index) => ({
                id: `tag-${index}`,
                label: tag,
                count: posts.filter((post) => post.tag === tag).length,
              })),
            ]}
            panels={Object.fromEntries([
              [ALL, <PostsGrid key={ALL} posts={posts} headingLevel={2} />],
              ...tags.map((tag, index) => [
                `tag-${index}`,
                <PostsGrid
                  key={tag}
                  posts={posts.filter((post) => post.tag === tag)}
                  headingLevel={2}
                />,
              ]),
            ])}
          />
        ) : (
          <PostsGrid posts={posts} headingLevel={2} />
        )}
      </Section>

      <Section spacing="s" aria-label={t('materials.kicker')}>
        <LeadMagnet placement="blog" />
      </Section>
    </>
  );
};
