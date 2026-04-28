import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations, getLocale } from 'next-intl/server';
import { MOCK_POSTS } from '@/views/BlogPage';
import styles from './ArticlePage.module.css';
import { defaultLocale } from '@/i18n-routing';

interface ArticlePageProps {
  slug: string;
}

export async function ArticlePage({ slug }: ArticlePageProps) {
  const post = MOCK_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const t = await getTranslations();
  const locale = await getLocale();
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;

  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <Link href={`${localePrefix}/blog`} className={styles.back}>
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

          {/* Trusted HTML from own CMS only — escape-safe */}
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </article>
      </div>
    </main>
  );
}
