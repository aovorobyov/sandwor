import { getTranslations } from 'next-intl/server';
import { getTelegramPosts } from '@/entities/post/api/telegram';
import { BlogFilter } from './BlogFilter';
import s from './BlogPage.module.css';

export const BlogPage = async () => {
  const [t, posts] = await Promise.all([getTranslations(), getTelegramPosts()]);

  return (
    <main className={s.root}>
      <div className={s.container}>
        <h1 className={s.title}>{t('blog.title')}</h1>

        <BlogFilter posts={posts} />
      </div>
    </main>
  );
};
