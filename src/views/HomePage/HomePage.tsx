import Image from 'next/image';
import { Link } from 'next-view-transitions';
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
            <div className={s.heroLayout}>
              <div className={s.heroText}>
                <h1 className={s.name}>{t('home.name')}</h1>

                <p className={s.bio}>{t('home.bio')}</p>
              </div>

              {/* Персонаж разрезан на два слоя: тело и ладонь — ладонь машет CSS-анимацией.
                  PNG как источник: оптимизатор next/image сам отдаст webp/avif по Accept. */}
              <div className={s.heroImageWrap} aria-hidden>
                <Image
                  src="/img/sandwor-body.png"
                  alt=""
                  width={853}
                  height={1280}
                  priority
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 230px, 255px"
                  className={s.heroBody}
                />

                <Image
                  src="/img/sandwor-hand.png"
                  alt=""
                  width={853}
                  height={1280}
                  priority
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 230px, 255px"
                  className={s.heroHand}
                />
              </div>
            </div>
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
