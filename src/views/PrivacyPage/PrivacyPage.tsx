import { getTranslations } from 'next-intl/server';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { JsonLd, buildBreadcrumbs } from '@/shared/lib/jsonLd';
import type { PrivacySection } from './PrivacyPage.types';
import s from './PrivacyPage.module.css';

export const PrivacyPage = async () => {
  const t = await getTranslations();
  const sections = t.raw('privacy.sections') as PrivacySection[];

  const breadcrumbs = buildBreadcrumbs([
    { name: t('nav.home'), path: '/' },
    { name: t('privacy.breadcrumb'), path: '/privacy' },
  ]);

  return (
    <main className={s.root}>
      <JsonLd data={breadcrumbs} />

      <Breadcrumbs
        className={s.breadcrumbs}
        items={[{ label: t('nav.home'), href: '/' }, { label: t('privacy.breadcrumb') }]}
      />

      <h1 className={s.title}>{t('privacy.title')}</h1>

      <p className={s.updated}>{t('privacy.updated')}</p>

      <p className={s.intro}>{t('privacy.intro')}</p>

      <div className={s.sections}>
        {sections.map((section) => (
          <section key={section.heading} className={s.section}>
            <h2 className={s.heading}>{section.heading}</h2>

            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className={s.paragraph}>
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
};
