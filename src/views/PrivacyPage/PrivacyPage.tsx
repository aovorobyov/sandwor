import { Fragment } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Article } from '@sw/components/Article';
import { fillLegal } from '@/shared/config/legal';
import { JsonLd, buildBreadcrumbs } from '@/shared/lib/jsonLd';
import { Link, localizeHref } from '@/shared/ui/Link';
import s from './PrivacyPage.module.css';

export interface LegalSection {
  id?: string;
  heading: string;
  paragraphs: string[];
}

interface LegalDocumentPageProps {
  /** Ключ документа в переводах: privacy или consent. */
  doc: 'privacy' | 'consent';
  path: string;
}

/**
 * Юридический документ на Article дизайн-системы: заголовок, редакция, вступление,
 * разделы с оглавлением. Реквизиты оператора подставляются из shared/config/legal.
 */
export const LegalDocumentPage = async ({ doc, path }: LegalDocumentPageProps) => {
  const locale = await getLocale();
  const t = await getTranslations();
  const href = (to: string) => localizeHref(to, locale);
  const fill = (text: string) => fillLegal(text, locale);
  const sections = t.raw(`${doc}.sections`) as LegalSection[];
  const sectionId = (section: LegalSection, index: number) => section.id ?? `${doc}-${index + 1}`;

  return (
    <>
      <JsonLd
        data={buildBreadcrumbs([
          { name: t('nav.home'), path: href('/') },
          { name: t(`${doc}.breadcrumb`), path: href(path) },
        ])}
      />

      <div className={`sw-container ${s.wrap}`}>
        <Article
          breadcrumbsLabel={t('nav.breadcrumbs')}
          breadcrumbs={[
            { label: t('nav.home'), href: href('/') },
            { label: t(`${doc}.breadcrumb`) },
          ]}
          title={t(`${doc}.title`)}
          lead={fill(t.raw(`${doc}.intro`) as string)}
          date={fill(t.raw(`${doc}.updated`) as string)}
          toc={sections.map((section, index) => ({
            id: sectionId(section, index),
            label: section.heading,
          }))}
          tocLabel={t('blog-page.toc')}
        >
          {/* Без обёрток: отступы ArticleProse считаются между прямыми детьми. */}
          {sections.map((section, index) => (
            <Fragment key={section.heading}>
              <h2 id={sectionId(section, index)}>{section.heading}</h2>

              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{fill(paragraph)}</p>
              ))}
            </Fragment>
          ))}

          {doc === 'consent' && (
            <p>
              <Link href="/privacy">{t('consent.policy-link')}</Link>
            </p>
          )}
        </Article>
      </div>
    </>
  );
};

/** Политика обработки персональных данных. */
export const PrivacyPage = () => <LegalDocumentPage doc="privacy" path="/privacy" />;

/** Согласия на обработку персональных данных: при заявке и на cookie. */
export const ConsentPage = () => <LegalDocumentPage doc="consent" path="/consent" />;
