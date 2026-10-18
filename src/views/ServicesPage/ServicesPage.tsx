import { getLocale, getTranslations } from 'next-intl/server';
import { Button } from '@sw/components/Button';
import { BriefButton } from '@/features/brief';
import { FaqSection, type FaqItem } from '@/widgets/FaqSection';
import { PriceCalculator } from '@/widgets/PriceCalculator';
import { ProcessSection } from '@/widgets/ProcessSection';
import { ServicesGrid } from '@/widgets/ServicesGrid';
import { JsonLd, buildBreadcrumbs } from '@/shared/lib/jsonLd';
import { localizeHref } from '@/shared/ui/Link';
import { PageHero } from '@/shared/ui/PageHero';
import { Section } from '@/shared/ui/Section';
import { SectionIntro } from '@/shared/ui/SectionIntro';

export const ServicesPage = async () => {
  const locale = await getLocale();
  const t = await getTranslations();

  return (
    <>
      <JsonLd
        data={buildBreadcrumbs([
          { name: t('nav.home'), path: localizeHref('/', locale) },
          { name: t('services.title'), path: localizeHref('/services', locale) },
        ])}
      />

      <PageHero
        breadcrumbs={[
          { label: t('nav.home'), href: localizeHref('/', locale) },
          { label: t('services.title') },
        ]}
        meta={t('services.hero-meta')}
        title={t('services.hero-title')}
        lead={t('services.hero-lead')}
        actions={
          <>
            <BriefButton size="l">{t('services.cta')}</BriefButton>

            <Button variant="secondary" size="l" href="#calculator">
              {t('services.calc-link')}
            </Button>
          </>
        }
      />

      <Section spacing="s" aria-label={t('services.title')}>
        <ServicesGrid variant="default" headingLevel={2} />
      </Section>

      <ProcessSection />

      <Section tone="sunken" id="calculator" aria-labelledby="calc-title">
        <SectionIntro
          meta={t('home.calc-meta')}
          title={t('services.calc-title')}
          titleId="calc-title"
          lead={t('services.calc-lead')}
        />

        <PriceCalculator />
      </Section>

      <FaqSection items={t.raw('faq.items') as FaqItem[]} />
    </>
  );
};
