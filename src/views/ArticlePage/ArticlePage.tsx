import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations, getLocale } from 'next-intl/server';
import { getTelegramPost, getRelatedPosts } from '@/entities/post/api/telegram';
import { PostList } from '@/widgets/PostList';
import { JsonLd, buildBlogPosting } from '@/shared/lib/jsonLd';
import type { ArticlePageProps } from './ArticlePage.types';
import s from './ArticlePage.module.css';

export const ArticlePage = async (props: ArticlePageProps) => {
  const { slug } = props;
  const [post, relatedPosts, t, locale] = await Promise.all([
    getTelegramPost(slug),
    getRelatedPosts(slug, 3),
    getTranslations(),
    getLocale(),
  ]);

  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const blogPostingData = buildBlogPosting({
    title: post.title,
    description: post.excerpt,
    date: post.date,
    slug: post.slug,
    locale,
    authorName: t('home.name'),
    image: post.image,
  });

  return (
    <>
      <JsonLd data={blogPostingData} />

      <main className={s.root}>
        <div className={s.container}>
          <Link href="/blog" className={s.back}>
            ← {t('nav.blog')}
          </Link>

          <article>
            <header className={s.header}>
              <span className={s.tag}>{post.tag}</span>

              <h1 className={s.title}>{post.title}</h1>

              <div className={s.meta}>
                <time className={s.metaDate} dateTime={post.date}>
                  {formattedDate}
                </time>

                <span>{t('blog.min-read', { count: post.readTime })}</span>
              </div>
            </header>

            {post.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.image} alt={post.title} className={s.cover} />
            )}

            {/* Доверенный HTML только из своей CMS */}
            <div className={s.body} dangerouslySetInnerHTML={{ __html: post.body }} />
          </article>

          {relatedPosts.length > 0 && (
            <section className={s.related} aria-labelledby="related-title">
              <h2 id="related-title" className={s.relatedTitle}>
                {t('blog.related-posts')}
              </h2>

              <PostList posts={relatedPosts} />
            </section>
          )}
        </div>
      </main>
    </>
  );
};
