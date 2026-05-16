import { getTranslations } from 'next-intl/server';
import { getTelegramPosts } from '@/entities/post/api/telegram';
import { BlogFilter } from './BlogFilter';
import styles from './BlogPage.module.css';

export async function BlogPage() {
  const [t, posts] = await Promise.all([getTranslations(), getTelegramPosts()]);

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('blog.title')}</h1>
        {/* BlogFilter is 'use client' — handles interactivity, renders PostList */}
        <BlogFilter posts={posts} />
      </div>
    </main>
  );
}
