import type { FC } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Badge } from '@/shared/ui/Badge';
import { Card } from '@/shared/ui/Card';
import type { PostCardProps } from './PostCard.types';
import s from './PostCard.module.css';

export const PostCard: FC<PostCardProps> = (props) => {
  const { post } = props;
  const t = useTranslations();
  const locale = useLocale();

  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card href={`/blog/${post.slug}`}>
      <article>
        {post.image && (
          <div className={s.imageWrap}>
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className={s.image}
            />
          </div>
        )}

        <div className={s.meta}>
          <time className={s.date} dateTime={post.date}>
            {formattedDate}
          </time>

          <Badge variant="neutral">{post.tag}</Badge>
        </div>

        <h2 className={s.title}>{post.title}</h2>

        <p className={s.excerpt}>{post.excerpt}</p>

        <div className={s.footer}>
          <span className={s.readTime}>{t('blog.min-read', { count: post.readTime })}</span>

          <span className={s.readMore}>{t('blog.read-more')}</span>
        </div>
      </article>
    </Card>
  );
};
