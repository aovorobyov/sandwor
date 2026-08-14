import { getTranslations, getLocale } from 'next-intl/server';
import { Section } from '@/shared/ui/Section';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { getPosts } from '@/entities/post/api/posts';
import { BlogFilter } from './BlogFilter';
import s from './BlogPage.module.css';

export const BlogPage = async () => {
  const locale = await getLocale();
  const [t, posts] = await Promise.all([getTranslations(), getPosts(locale)]);

  return (
    <main>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <Breadcrumbs
            className={s.breadcrumbs}
            items={[{ label: t('nav.home'), href: '/' }, { label: t('nav.blog') }]}
          />

          <h1 className={s.title}>{t('blog.title')}</h1>

          <p className={s.lead}>{t('blog.subtitle')}</p>
        </div>
      </section>

      <Section>
        <BlogFilter posts={posts} />
      </Section>
    </main>
  );
};
