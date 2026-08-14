'use client';

import type { FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/shared/ui/Link';
import { cn } from '@/shared/lib/cn';
import type { PostRowProps } from './PostRow.types';
import s from './PostRow.module.css';

/** Строка статьи в редакционном списке: метаданные, заголовок, лид и ссылка «Читать». */
export const PostRow: FC<PostRowProps> = (props) => {
  const { post, hasExcerpt = false, hasReadLink = false, isLarge = false } = props;
  const t = useTranslations();
  const locale = useLocale();

  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className={cn(s.root, isLarge && s.largeRoot)}>
      <div className={s.meta}>
        <span className={s.tag}>{post.tag}</span>

        <time dateTime={post.date}>{formattedDate}</time>

        <span>{t('blog.min-read', { count: post.readTime })}</span>
      </div>

      <h3 className={cn(s.title, isLarge && s.largeTitle)}>{post.title}</h3>

      {hasExcerpt && <p className={s.excerpt}>{post.excerpt}</p>}

      {hasReadLink && <span className={s.read}>{t('blog.read-more')}</span>}
    </Link>
  );
};
