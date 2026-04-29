// import Link from 'next/link';
// import { getTranslations, getLocale } from 'next-intl/server';
// import { defaultLocale } from '@/i18n-routing';
// import { PostList } from '@/widgets/PostList';
// import { ProjectList } from '@/widgets/ProjectList';
// import { MOCK_POSTS, MOCK_PROJECTS } from './mocks';
import styles from './UIKitPage.module.css';

export async function UIKitPage() {
//   const t = await getTranslations();
//   const locale = await getLocale();
//   const localePrefix = locale === defaultLocale ? '' : `/${locale}`;

  return (
    <main className={styles.root}>
      {/* Hero */}
      {/* <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.name}>{t('home.name')}</h1>
          <p className={styles.bio}>{t('home.bio')}</p>
        </div>
      </section> */}

      {/* Latest posts */}
      {/* <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('home.latest-posts')}</h2>
            <Link href={`${localePrefix}/blog`} className={styles.seeAll}>
              {t('home.all-posts')}
            </Link>
          </div>
          <PostList posts={MOCK_POSTS.slice(0, 3)} />
        </div>
      </section> */}
    </main>
  );
}
