import { getTranslations } from 'next-intl/server';
import { MOCK_POSTS } from './mocks';
import { BlogFilter } from './BlogFilter';
import styles from './BlogPage.module.css';

export async function BlogPage() {
  const t = await getTranslations();

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('blog.title')}</h1>
        {/* BlogFilter is 'use client' — handles interactivity, renders PostList */}
        <BlogFilter posts={MOCK_POSTS} />
      </div>
    </main>
  );
}
