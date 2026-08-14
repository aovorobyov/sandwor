import { notFound } from 'next/navigation';
import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/shared/ui/Link';
import { Mono } from '@/shared/ui/Mono';
import { Eyebrow } from '@/shared/ui/Eyebrow';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { getPost, getRelatedPosts } from '@/entities/post/api/posts';
import { PostRow } from '@/entities/post/ui/PostRow';
import { JsonLd, buildBlogPosting, buildBreadcrumbs } from '@/shared/lib/jsonLd';
import type { ArticlePageProps } from './ArticlePage.types';
import s from './ArticlePage.module.css';

export const ArticlePage = async (props: ArticlePageProps) => {
  const { slug } = props;
  const locale = await getLocale();
  const [post, relatedPosts, t] = await Promise.all([
    getPost(slug, locale),
    getRelatedPosts(slug, locale, 3),
    getTranslations(),
  ]);

  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const readTimeLabel = t('blog.min-read', { count: post.readTime });

  const blogPostingData = buildBlogPosting({
    title: post.title,
    description: post.description || post.excerpt,
    date: post.date,
    slug: post.slug,
    locale,
    authorName: t('home.name'),
    image: post.image,
  });

  const breadcrumbsData = buildBreadcrumbs([
    { name: t('nav.blog'), path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <JsonLd data={blogPostingData} />

      <JsonLd data={breadcrumbsData} />

      <main>
        <article>
          <header className={s.header}>
            <Breadcrumbs
              className={s.breadcrumbs}
              items={[
                { label: t('nav.home'), href: '/' },
                { label: t('nav.blog'), href: '/blog' },
                { label: post.title },
              ]}
            />

            <div className={s.meta}>
              <span className={s.tag}>{post.tag}</span>

              <time dateTime={post.date}>{formattedDate}</time>

              <span>{readTimeLabel}</span>
            </div>

            <h1 className={s.title}>{post.title}</h1>
          </header>

          <div className={s.coverWrap}>
            {post.image ? (
              // Доверенный источник обложек; next/image не нужен для одной картинки статьи
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.image} alt={post.title} className={s.cover} />
            ) : (
              <div className={s.coverPlaceholder} aria-hidden />
            )}
          </div>

          <div className={s.bodyWrap}>
            {/* Доверенный HTML только из своей CMS */}
            <div className={s.body} dangerouslySetInnerHTML={{ __html: post.body }} />

            <div className={s.cta}>
              <div>
                <div className={s.ctaTitle}>{t('blog.cta-title')}</div>

                <div className={s.ctaLead}>{t('blog.cta-lead')}</div>
              </div>

              <Link href="/contact" className={s.ctaButton}>
                {t('blog.cta-btn')}
                <Mono>→</Mono>
              </Link>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <section className={s.related}>
              <div className={s.relatedInner}>
                <Eyebrow className={s.relatedTitle} as="h2">
                  {t('blog.read-next')}
                </Eyebrow>

                <div className={s.relatedList}>
                  {relatedPosts.map((related) => (
                    <PostRow key={related.slug} post={related} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </article>
      </main>
    </>
  );
};
