import { useLocale, useTranslations } from 'next-intl';
import { defaultLocale } from '@/i18n-routing';
import { Badge } from '@/shared/ui/Badge';
import { Card } from '@/shared/ui/Card';
import type { Post } from '../../model/types';
import styles from './PostCard.module.css';

export interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const t = useTranslations();
  const locale = useLocale();
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;

  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card href={`${localePrefix}/blog/${post.slug}`}>
      <article>
        <div className={styles.meta}>
          <time className={styles.date} dateTime={post.date}>
            {formattedDate}
          </time>
          <Badge variant="neutral">{post.tag}</Badge>
        </div>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <div className={styles.footer}>
          <span className={styles.readTime}>
            {t('blog.min-read', { count: post.readTime })}
          </span>
          <span className={styles.readMore}>{t('blog.read-more')}</span>
        </div>
      </article>
    </Card>
  );
}
