import { Fragment } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Article } from '@sw/components/Article';
import { consentPath, fillLegal, type ConsentDocId } from '@/shared/config/legal';
import { JsonLd, buildBreadcrumbs } from '@/shared/lib/jsonLd';
import { Link, localizeHref } from '@/shared/ui/Link';
import s from './PrivacyPage.module.css';

/** Абзац или маркированный список (массив строк). */
export type LegalBlock = string | string[];

export interface LegalSection {
  id?: string;
  heading: string;
  paragraphs: LegalBlock[];
}

/** Согласие: своя страница /consent/<id> и строка в оглавлении /consent. */
export interface ConsentSection extends LegalSection {
  id: ConsentDocId;
  /** Короткая подпись для крошек. */
  breadcrumb: string;
  /** Заголовок страницы согласия. */
  title: string;
  /** Когда и как даётся это согласие — лид страницы и строка в оглавлении. */
  summary: string;
}

/** Абзацы и списки юридического текста с подставленными реквизитами оператора. */
const LegalBlocks = ({ blocks, fill }: { blocks: LegalBlock[]; fill: (text: string) => string }) =>
  blocks.map((block, index) =>
    Array.isArray(block) ? (
      <ul key={index}>
        {block.map((item) => (
          <li key={item}>{fill(item)}</li>
        ))}
      </ul>
    ) : (
      <p key={index}>{fill(block)}</p>
    ),
  );

const getLegalContext = async () => {
  const locale = await getLocale();
  const t = await getTranslations();
  return {
    t,
    href: (to: string) => localizeHref(to, locale),
    fill: (text: string) => fillLegal(text, locale),
  };
};

/**
 * Политика на Article дизайн-системы: заголовок, редакция, вступление,
 * разделы с оглавлением. Реквизиты оператора подставляются из shared/config/legal.
 */
export const PrivacyPage = async () => {
  const { t, href, fill } = await getLegalContext();
  const sections = t.raw('privacy.sections') as LegalSection[];
  const sectionId = (section: LegalSection, index: number) => section.id ?? `privacy-${index + 1}`;

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
          breadcrumbsLabel={t('nav.breadcrumbs')}
          breadcrumbs={[
            { label: t('nav.home'), href: href('/') },
            { label: t('privacy.breadcrumb') },
          ]}
          title={t('privacy.title')}
          lead={fill(t.raw('privacy.intro') as string)}
          date={fill(t.raw('privacy.updated') as string)}
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
              <LegalBlocks blocks={section.paragraphs} fill={fill} />
            </Fragment>
          ))}
        </Article>
      </div>
    </>
  );
};

/** Оглавление согласий: что, когда и где даётся, со ссылками на тексты. */
export const ConsentPage = async () => {
  const { t, href, fill } = await getLegalContext();
  const sections = t.raw('consent.sections') as ConsentSection[];

  return (
    <>
      <JsonLd
        data={buildBreadcrumbs([
          { name: t('nav.home'), path: href('/') },
          { name: t('consent.breadcrumb'), path: href('/consent') },
        ])}
      />

      <div className={`sw-container ${s.wrap}`}>
        <Article
          breadcrumbsLabel={t('nav.breadcrumbs')}
          breadcrumbs={[
            { label: t('nav.home'), href: href('/') },
            { label: t('consent.breadcrumb') },
          ]}
          title={t('consent.title')}
          lead={fill(t.raw('consent.intro') as string)}
          date={fill(t.raw('consent.updated') as string)}
          toc={false}
        >
          {/* Заголовок — ссылка на текст согласия: у каждой ссылки понятная своя цель. */}
          {sections.map((section) => (
            <Fragment key={section.id}>
              <h2 id={section.id}>
                <Link href={consentPath(section.id)}>{section.heading}</Link>
              </h2>
              <p>{fill(section.summary)}</p>
            </Fragment>
          ))}

          <p>
            <Link href="/privacy">{t('consent.policy-link')}</Link>
          </p>
        </Article>
      </div>
    </>
  );
};

/** Текст одного согласия — отдельный документ, на него ведёт чекбокс формы. */
export const ConsentDocPage = async ({ id }: { id: ConsentDocId }) => {
  const { t, href, fill } = await getLegalContext();
  const sections = t.raw('consent.sections') as ConsentSection[];
  const section = sections.find((item) => item.id === id);

  if (!section) return null;

  return (
    <>
      <JsonLd
        data={buildBreadcrumbs([
          { name: t('nav.home'), path: href('/') },
          { name: t('consent.breadcrumb'), path: href('/consent') },
          { name: section.breadcrumb, path: href(consentPath(id)) },
        ])}
      />

      <div className={`sw-container ${s.wrap}`}>
        <Article
          breadcrumbsLabel={t('nav.breadcrumbs')}
          breadcrumbs={[
            { label: t('nav.home'), href: href('/') },
            { label: t('consent.breadcrumb'), href: href('/consent') },
            { label: section.breadcrumb },
          ]}
          title={section.title}
          lead={fill(section.summary)}
          date={fill(t.raw('consent.updated') as string)}
          toc={false}
        >
          <LegalBlocks blocks={section.paragraphs} fill={fill} />

          <p>
            <Link href="/privacy">{t('consent.policy-link')}</Link>
          </p>
        </Article>
      </div>
    </>
  );
};
