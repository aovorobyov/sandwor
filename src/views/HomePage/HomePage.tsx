import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { PostList } from '@/widgets/PostList';
import { ProjectList } from '@/widgets/ProjectList';
import { getTelegramPosts } from '@/entities/post/api/telegram';
import { getProjects } from '@/entities/project';
import styles from './HomePage.module.css';

export async function HomePage() {
  const [t, posts, projects] = await Promise.all([
    getTranslations(),
    getTelegramPosts(),
    Promise.resolve(getProjects()),
  ]);

  return (
    <main className={styles.root}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.name}>{t('home.name')}</h1>
          <p className={styles.bio}>{t('home.bio')}</p>
        </div>
      </section>

      {/* Latest posts */}
      {posts.length > 0 && (
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t('home.latest-posts')}</h2>
              <Link href="/blog" className={styles.seeAll}>
                {t('home.all-posts')}
              </Link>
            </div>
            <PostList posts={posts.slice(0, 3)} />
          </div>
        </section>
      )}

      {/* Latest projects */}
      {projects.length > 0 && (
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t('home.projects')}</h2>
              <Link href="/projects" className={styles.seeAll}>
                {t('home.all-projects')}
              </Link>
            </div>
            <ProjectList projects={projects.slice(0, 3)} />
          </div>
        </section>
      )}
    </main>
  );
}
