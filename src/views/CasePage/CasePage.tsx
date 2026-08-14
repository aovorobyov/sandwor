import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/shared/ui/Link';
import { Mono } from '@/shared/ui/Mono';
import { Eyebrow } from '@/shared/ui/Eyebrow';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { CASE_LINKS } from '@/entities/case';
import type { CaseDetail, CaseItem } from '@/entities/case/model/types';
import { JsonLd, buildBreadcrumbs } from '@/shared/lib/jsonLd';
import type { CasePageProps } from './CasePage.types';
import s from './CasePage.module.css';

export const CasePage = async (props: CasePageProps) => {
  const { slug } = props;
  const t = await getTranslations();

  const items = t.raw('cases.items') as CaseItem[];
  const details = t.raw('cases.details') as Record<string, CaseDetail>;

  const item = items.find((i) => i.slug === slug);
  const detail = details[slug];

  if (!item || !detail) notFound();

  const otherCases = items.filter((i) => i.slug !== slug);
  const repoHref = CASE_LINKS[slug as keyof typeof CASE_LINKS];

  const breadcrumbs = buildBreadcrumbs([
    { name: t('nav.home'), path: '/' },
    { name: t('nav.cases'), path: '/cases' },
    { name: item.title, path: `/cases/${slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />

      <main>
        {/* ── Шапка кейса ── */}
        <section className={s.hero}>
          <div className={s.heroInner}>
            <Breadcrumbs
              className={s.breadcrumbs}
              items={[
                { label: t('nav.home'), href: '/' },
                { label: t('nav.cases'), href: '/cases' },
                { label: item.title },
              ]}
            />

            <Eyebrow tone="accent" className={s.type}>
              {item.type}
            </Eyebrow>

            <h1 className={s.title}>{item.title}</h1>

            <p className={s.lead}>{detail.lead}</p>

            {repoHref && (
              <a href={repoHref} target="_blank" rel="noopener noreferrer" className={s.repo}>
                {t('cases.repo')}: {repoHref.replace('https://', '')} ↗
              </a>
            )}
          </div>
        </section>

        {/* ── Главный экран ── */}
        <section className={s.coverSection}>
          <div className={s.cover} aria-hidden />
        </section>

        {/* ── Тело кейса ── */}
        <section className={s.bodySection}>
          <div className={s.bodyGrid}>
            <aside className={s.facts}>
              <Eyebrow className={s.factsTitle}>{t('cases.facts-label')}</Eyebrow>

              <div className={s.factsList}>
                {detail.facts.map((fact) => (
                  <div key={fact.k} className={s.fact}>
                    <div className={s.factKey}>{fact.k}</div>

                    <div className={s.factValue}>{fact.v}</div>
                  </div>
                ))}
              </div>
            </aside>

            <div className={s.blocks}>
              {detail.blocks.map((block) => (
                <div key={block.title} className={s.block}>
                  <h2 className={s.blockTitle}>{block.title}</h2>

                  <p className={s.blockText}>{block.p1}</p>

                  <p className={s.blockText}>{block.p2}</p>
                </div>
              ))}

              <div className={s.gallery}>
                <div className={s.shot} aria-hidden />

                <div className={s.shot} aria-hidden />
              </div>

              <div className={s.similar}>
                <div>
                  <div className={s.similarTitle}>{t('cases.similar-title')}</div>

                  <div className={s.similarLead}>{t('cases.similar-lead')}</div>
                </div>

                <Link href="/contact" className={s.similarButton}>
                  {t('cases.similar-btn')}
                  <Mono>→</Mono>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Другие кейсы ── */}
        <section className={s.other}>
          <div className={s.otherInner}>
            <Eyebrow className={s.otherTitle}>{t('cases.other-title')}</Eyebrow>

            <div className={s.otherList}>
              {otherCases.map((other) => (
                <Link key={other.slug} href={`/cases/${other.slug}`} className={s.otherRow}>
                  <span className={s.otherType}>{other.type}</span>

                  <span className={s.otherName}>{other.title}</span>

                  <span className={s.otherCta}>{t('cases.other-cta')}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
