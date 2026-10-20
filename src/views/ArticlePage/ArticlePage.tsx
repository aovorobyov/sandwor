import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { Article, ArticleCallout, ArticleProse } from '@sw/components/Article';
import { getPost, getRelatedPosts } from '@/entities/post/api/posts';
import { withHeadingIds } from '@/entities/post';
import { BriefButton } from '@/features/brief';
import { PostsGrid } from '@/widgets/PostsGrid';
import { formatDate } from '@/shared/lib/format';
import { JsonLd, buildBlogPosting, buildBreadcrumbs } from '@/shared/lib/jsonLd';
import { localizeHref } from '@/shared/ui/Link';
import { Section } from '@/shared/ui/Section';
import { SectionIntro } from '@/shared/ui/SectionIntro';
import s from './ArticlePage.module.css';

interface ArticlePageProps {
  slug: string;
}

const RELATED_LIMIT = 3;

/** Статья на Article дизайн-системы: крошки, автор, дата, текст 17/28 и оглавление с 1100px. */
export const ArticlePage = async ({ slug }: ArticlePageProps) => {
  const locale = await getLocale();
  const [post, related, t] = await Promise.all([
    getPost(slug, locale),
    getRelatedPosts(slug, locale, RELATED_LIMIT),
    getTranslations(),
  ]);

  if (!post) notFound();

  const href = (path: string) => localizeHref(path, locale);
  const { html, headings } = withHeadingIds(post.body);

  return (
    <>
      <JsonLd
        data={buildBlogPosting({
          title: post.title,
          description: post.description || post.excerpt,
          date: post.date,
          slug: post.slug,
          locale,
          authorName: t('blog-page.author'),
          image: post.image,
        })}
      />

      <JsonLd
        data={buildBreadcrumbs([
          { name: t('nav.home'), path: href('/') },
          { name: t('nav.blog'), path: href('/blog') },
          { name: post.title, path: href(`/blog/${post.slug}`) },
        ])}
      />

      <div className={`sw-container ${s.wrap}`}>
        <Article
          breadcrumbs={[
            { label: t('nav.home'), href: href('/') },
            { label: t('nav.blog'), href: href('/blog') },
            { label: post.title },
          ]}
          breadcrumbsLabel={t('nav.breadcrumbs')}
          title={post.title}
          lead={post.excerpt}
          author={{ name: t('blog-page.author'), tone: 'founder' }}
          date={formatDate(post.date, locale)}
          dateTime={post.date}
          readingTime={t('blog-page.min-read', { count: post.readTime })}
          toc={headings}
          tocLabel={t('blog-page.toc')}
          prose={false}
        >
          {/* Доверенный HTML только из своих статей (entities/post/model/articles). */}
          <ArticleProse html={html} />

          <ArticleCallout title={t('blog-page.cta-title')} icon="message-circle" className={s.cta}>
            <p>{t('blog-page.cta-text')}</p>

            <BriefButton variant="secondary" className={s.ctaButton}>
              {t('blog-page.cta')}
            </BriefButton>
          </ArticleCallout>
        </Article>
      </div>

      {related.length > 0 && (
        <Section tone="sunken" aria-labelledby="related-title">
          <SectionIntro title={t('blog-page.related-title')} titleId="related-title" />

          <PostsGrid posts={related} teaser />
        </Section>
      )}
    </>
  );
};
