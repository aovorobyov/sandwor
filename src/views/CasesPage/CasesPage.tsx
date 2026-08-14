import { getTranslations } from 'next-intl/server';
import { Button } from '@/shared/ui/Button';
import { Mono } from '@/shared/ui/Mono';
import { Section } from '@/shared/ui/Section';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { JsonLd, buildBreadcrumbs } from '@/shared/lib/jsonLd';
import type { CaseItem, CaseMetric } from '@/entities/case/model/types';
import { CasesFilter } from './CasesFilter';
import s from './CasesPage.module.css';

export const CasesPage = async () => {
  const t = await getTranslations();

  const items = t.raw('cases.items') as CaseItem[];
  const metrics = t.raw('cases.metrics') as CaseMetric[];

  const breadcrumbs = buildBreadcrumbs([
    { name: t('nav.home'), path: '/' },
    { name: t('nav.cases'), path: '/cases' },
  ]);

  return (
    <main>
      <JsonLd data={breadcrumbs} />

      {/* ── Герой ── */}
      <section className={s.hero}>
        <div className={s.heroGlow} aria-hidden />

        <div className={s.heroInner}>
          <Breadcrumbs
            className={s.breadcrumbs}
            items={[{ label: t('nav.home'), href: '/' }, { label: t('cases.breadcrumb') }]}
          />

          <div className={s.heroCols}>
            <div className={s.heroMain}>
              <h1 className={s.heroTitle}>{t('cases.hero-title')}</h1>

              <p className={s.heroLead}>{t('cases.hero-lead')}</p>
            </div>

            <div className={s.metrics}>
              {metrics.map((metric, index) => (
                <div key={metric.label} className={s.metric} data-first={index === 0}>
                  <div className={s.metricValue}>{metric.value}</div>

                  <div className={s.metricLabel}>{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Фильтр + сетка ── */}
      <Section>
        <CasesFilter
          items={items}
          allLabel={t('cases.filter-all')}
          ctaLabel={t('cases.card-cta')}
        />
      </Section>

      {/* ── CTA ── */}
      <section className={s.cta}>
        <div className={s.ctaInner}>
          <h2 className={s.ctaTitle}>{t('cases.cta-title')}</h2>

          <p className={s.ctaLead}>{t('cases.cta-lead')}</p>

          <Button href="/contact" variant="primary">
            {t('cases.cta-btn')}
            <Mono>→</Mono>
          </Button>
        </div>
      </section>
    </main>
  );
};
