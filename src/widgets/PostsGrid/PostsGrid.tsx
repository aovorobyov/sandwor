import { getLocale, getTranslations } from 'next-intl/server';
import { PostCard, type Post } from '@/entities/post';
import { formatDate } from '@/shared/lib/format';
import { localizeHref } from '@/shared/ui/Link';
import s from './PostsGrid.module.css';

interface PostsGridProps {
  posts: Post[];
  headingLevel?: 2 | 3;
  /** Подборка (главная, «Читайте также»): на планшете без одинокой карточки в последнем ряду. */
  teaser?: boolean;
}

/** Сетка карточек статей: 3 в ряд, 2 на планшете, 1 на телефоне. */
export const PostsGrid = async ({ posts, headingLevel = 3, teaser = false }: PostsGridProps) => {
  const locale = await getLocale();
  const t = await getTranslations('blog-page');

  return (
    <div className={teaser ? `${s.grid} ${s.teaser}` : s.grid}>
      {posts.map((post) => (
        <PostCard
          key={post.slug}
          post={post}
          href={localizeHref(`/blog/${post.slug}`, locale)}
          readLabel={t('read')}
          readTime={t('min-read', { count: post.readTime })}
          date={formatDate(post.date, locale)}
          headingLevel={headingLevel}
        />
      ))}
    </div>
  );
};
