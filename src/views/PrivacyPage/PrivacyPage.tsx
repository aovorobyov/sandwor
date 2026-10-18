import { Fragment } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Article } from '@sw/components/Article';
import { JsonLd, buildBreadcrumbs } from '@/shared/lib/jsonLd';
import { localizeHref } from '@/shared/ui/Link';
import s from './PrivacyPage.module.css';

interface PrivacySection {
  heading: string;
  paragraphs: string[];
}

/** Политика конфиденциальности — длинный текст на Article с оглавлением по разделам. */
export const PrivacyPage = async () => {
  const locale = await getLocale();
  const t = await getTranslations();
  const href = (path: string) => localizeHref(path, locale);
  const sections = t.raw('privacy.sections') as PrivacySection[];

  return (
    <>
      <JsonLd
        data={buildBreadcrumbs([
          { name: t('nav.home'), path: href('/') },
          { name: t('privacy.breadcrumb'), path: href('/privacy') },
        ])}
      />

      <div className={`sw-container ${s.wrap}`}>
        <Article
          breadcrumbs={[
            { label: t('nav.home'), href: href('/') },
            { label: t('privacy.breadcrumb') },
          ]}
          title={t('privacy.title')}
          lead={t('privacy.intro')}
          date={t('privacy.updated')}
          toc={sections.map((section, index) => ({
            id: `privacy-${index + 1}`,
            label: section.heading,
          }))}
          tocLabel={t('blog-page.toc')}
        >
          {/* Без обёрток: отступы ArticleProse считаются между прямыми детьми. */}
          {sections.map((section, index) => (
            <Fragment key={section.heading}>
              <h2 id={`privacy-${index + 1}`}>{section.heading}</h2>

              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Fragment>
          ))}
        </Article>
      </div>
    </>
  );
};
