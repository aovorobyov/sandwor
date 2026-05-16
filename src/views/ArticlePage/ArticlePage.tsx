import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations, getLocale } from 'next-intl/server';
import { getTelegramPost } from '@/entities/post/api/telegram';
import styles from './ArticlePage.module.css';

interface ArticlePageProps {
  slug: string;
}

export async function ArticlePage({ slug }: ArticlePageProps) {
  const post = await getTelegramPost(slug);
  if (!post) notFound();

  const t = await getTranslations();
  const locale = await getLocale();

  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <Link href="/blog" className={styles.back}>
          ← {t('nav.blog')}
        </Link>

        <article>
          <header className={styles.header}>
            <span className={styles.tag}>{post.tag}</span>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              <time dateTime={post.date}>{formattedDate}</time>
              <span>{t('blog.min-read', { count: post.readTime })}</span>
            </div>
          </header>

          {post.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.image} alt={post.title} className={styles.cover} />
          )}

          {/* Trusted HTML from own CMS only — escape-safe */}
          <div className={styles.body} dangerouslySetInnerHTML={{ __html: post.body }} />
        </article>
      </div>
    </main>
  );
}
