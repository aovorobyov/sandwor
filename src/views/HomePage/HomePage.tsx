import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { PostList } from '@/widgets/PostList';
import { ProjectList } from '@/widgets/ProjectList';
import { getTelegramPosts } from '@/entities/post/api/telegram';
import { getProjects } from '@/entities/project';
import { JsonLd, buildPerson, buildWebSite } from '@/shared/lib/jsonLd';
import { CourseBanner } from './components/CourseBanner/CourseBanner';
import s from './HomePage.module.css';

export const HomePage = async () => {
  const [t, posts, projects] = await Promise.all([
    getTranslations(),
    getTelegramPosts(),
    Promise.resolve(getProjects()),
  ]);

  const personData = buildPerson({ name: t('home.name'), bio: t('home.bio') });
  const siteData = buildWebSite({ name: t('home.name') });

  return (
    <>
      <JsonLd data={personData} />

      <JsonLd data={siteData} />

      <main className={s.root}>
        <section className={s.hero}>
          <div className={s.container}>
            <h1 className={s.name}>{t('home.name')}</h1>

            <p className={s.bio}>{t('home.bio')}</p>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.container}>
            <CourseBanner />
          </div>
        </section>

        {posts.length > 0 && (
          <section className={s.section}>
            <div className={s.container}>
              <div className={s.sectionHeader}>
                <h2 className={s.sectionTitle}>{t('home.latest-posts')}</h2>

                <Link href="/blog" className={s.seeAll}>
                  {t('home.all-posts')}
                </Link>
              </div>

              <PostList posts={posts.slice(0, 3)} />
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className={s.section}>
            <div className={s.container}>
              <div className={s.sectionHeader}>
                <h2 className={s.sectionTitle}>{t('home.projects')}</h2>

                <Link href="/projects" className={s.seeAll}>
                  {t('home.all-projects')}
                </Link>
              </div>

              <ProjectList projects={projects.slice(0, 3)} />
            </div>
          </section>
        )}
      </main>
    </>
  );
};
