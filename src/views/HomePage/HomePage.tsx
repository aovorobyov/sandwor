import { Link } from '@/shared/ui/Link';
import { getTranslations } from 'next-intl/server';
import { PostList } from '@/widgets/PostList';
import { getTelegramPosts } from '@/entities/post/api/telegram';
import { JsonLd, buildPerson, buildWebSite } from '@/shared/lib/jsonLd';
import { CourseBanner } from './components/CourseBanner/CourseBanner';
import { ServiceShowcase } from './components/ServiceShowcase';
import s from './HomePage.module.css';

export const HomePage = async () => {
  const [t, posts] = await Promise.all([getTranslations(), getTelegramPosts()]);

  const personData = buildPerson({ name: t('home.name'), bio: t('home.bio') });
  const siteData = buildWebSite({ name: t('home.name') });

  return (
    <>
      <JsonLd data={personData} />

      <JsonLd data={siteData} />

      <main className={s.root}>
        <ServiceShowcase />

        {/* Курс — сразу под витриной, в спокойном оформлении: акцент главной на услуге */}
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
      </main>
    </>
  );
};
