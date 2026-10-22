import { getLocale, getTranslations } from 'next-intl/server';
import { Badge } from '@sw/components/Badge';
import { Button } from '@sw/components/Button';
import { Stats } from '@sw/components/Stats';
import { CASE_SERVICES, PUBLISHED_CASE_SLUGS } from '@/entities/case';
import { MONTHLY_SERVICES, SERVICE_PRICES, type ServiceId } from '@/entities/service';
import { BriefButton } from '@/features/brief';
import { LeadMagnet } from '@/features/lead-magnet';
import { CaseCards } from '@/widgets/CaseCards';
import { FaqSection, type FaqItem } from '@/widgets/FaqSection';
import { FeatureGrid, type FeatureItem } from '@/widgets/FeatureGrid';
import { PriceCalculator } from '@/widgets/PriceCalculator';
import { ProcessSection } from '@/widgets/ProcessSection';
import { ServicesGrid } from '@/widgets/ServicesGrid';
import { SitePlans } from '@/widgets/SitePlans';
import { formatPrice } from '@/shared/lib/format';
import { JsonLd, buildBreadcrumbs, buildService } from '@/shared/lib/jsonLd';
import { FEATURES } from '@/shared/config/positioning';
import { localizeHref } from '@/shared/ui/Link';
import { PlansPanel } from '@/widgets/PlansPanel';
import { PageHero } from '@/shared/ui/PageHero';
import { Section } from '@/shared/ui/Section';
import { SectionIntro } from '@/shared/ui/SectionIntro';
import s from './ServicePage.module.css';

interface ServicePageProps {
  service: ServiceId;
}

/** Страница направления: герой с ценой и сроком, состав, тарифы (сайты), кейсы, калькулятор, FAQ. */
export const ServicePage = async ({ service }: ServicePageProps) => {
  const locale = await getLocale();
  const t = await getTranslations();
  const item = `services.items.${service}`;
  const href = (path: string) => localizeHref(path, locale);

  const features = t.raw(`${item}.features`) as FeatureItem[];
  const faq = t.raw(`${item}.faq`) as FaqItem[];
  const cases = PUBLISHED_CASE_SLUGS.filter((slug) => CASE_SERVICES[slug].includes(service));
  const isMonthly = MONTHLY_SERVICES.includes(service);

  return (
    <>
      <JsonLd
        data={buildService({
          name: t(`${item}.title`),
          description: t(`${item}.meta-description`),
          path: `/services/${service}`,
          locale,
          price: SERVICE_PRICES[service],
        })}
      />

      <JsonLd
        data={buildBreadcrumbs([
          { name: t('nav.home'), path: href('/') },
          { name: t('services.title'), path: href('/services') },
          { name: t(`${item}.title`), path: href(`/services/${service}`) },
        ])}
      />

      <PageHero
        aside={service === 'sites' ? <PlansPanel href="#plans" /> : undefined}
        breadcrumbs={[
          { label: t('nav.home'), href: href('/') },
          { label: t('services.title'), href: href('/services') },
          { label: t(`${item}.title`) },
        ]}
        meta={<Badge service={service}>{t(`service-labels.${service}`)}</Badge>}
        title={t(`${item}.hero-title`)}
        lead={t(`${item}.hero-lead`)}
        actions={
          <>
            <BriefButton size="l" services={[service]} placement="service">
              {t('services.cta')}
            </BriefButton>

            {service === 'sites' ? (
              <Button variant="secondary" size="l" href="#plans">
                {t('services.plans-link')}
              </Button>
            ) : (
              FEATURES.calculator && (
                <Button variant="secondary" size="l" href="#calculator">
                  {t('services.calc-link')}
                </Button>
              )
            )}
          </>
        }
      >
        <Stats
          className={s.stats}
          columns={2}
          label={t('services.stats-label')}
          items={[
            {
              value: formatPrice(SERVICE_PRICES[service], t('common.from')),
              label: isMonthly ? t('services.price-label-month') : t('services.price-label'),
              accent: true,
            },
            { value: t(`calculator.terms.${service}`), label: t('services.term-label') },
          ]}
        />
      </PageHero>

      <Section spacing="s" aria-labelledby="features-title">
        <SectionIntro
          meta={t('services.features-meta')}
          title={t(`${item}.features-title`)}
          titleId="features-title"
        />

        <FeatureGrid items={features} />
      </Section>

      {service === 'sites' && (
        <Section id="plans" aria-labelledby="plans-title">
          <SectionIntro
            meta={t('services.plans-meta')}
            title={t('services.plans-title')}
            titleId="plans-title"
            lead={t('services.plans-lead')}
          />

          <SitePlans />
        </Section>
      )}

      {cases.length > 0 && (
        <Section aria-labelledby="service-cases-title">
          <SectionIntro
            layout="row"
            meta={t('home.cases-meta')}
            title={t('services.cases-title')}
            titleId="service-cases-title"
            actions={
              <Button variant="ghost" iconEnd="arrow-right" href={href('/cases')}>
                {t('home.cases-all')}
              </Button>
            }
          />

          <CaseCards slugs={cases} layout="stacked" />
        </Section>
      )}

      <ProcessSection />

      {FEATURES.calculator && (
        <Section tone="sunken" id="calculator" aria-labelledby="calc-title">
          <SectionIntro
            meta={t('home.calc-meta')}
            title={t('services.calc-title')}
            titleId="calc-title"
            lead={t('services.calc-lead')}
          />

          <PriceCalculator services={[service]} />
        </Section>
      )}

      {service === 'sites' && (
        <Section spacing="s" aria-label={t('materials.kicker')}>
          <LeadMagnet placement="services" />
        </Section>
      )}

      <FaqSection items={faq} title={t('services.faq-title')} />

      <Section tone="sunken" aria-labelledby="other-services-title">
        <SectionIntro title={t('services.other-title')} titleId="other-services-title" />

        <ServicesGrid variant="compact" exclude={service} />
      </Section>
    </>
  );
};
