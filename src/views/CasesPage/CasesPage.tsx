import { getLocale, getTranslations } from 'next-intl/server';
import { Tabs } from '@sw/components/Tabs';
import { CASE_SERVICES, PUBLISHED_CASE_SLUGS } from '@/entities/case';
import { SERVICE_IDS } from '@/entities/service';
import { CaseCards } from '@/widgets/CaseCards';
import { JsonLd, buildBreadcrumbs } from '@/shared/lib/jsonLd';
import { localizeHref } from '@/shared/ui/Link';
import { PageHero } from '@/shared/ui/PageHero';
import { Section } from '@/shared/ui/Section';

const ALL = 'all';

export const CasesPage = async () => {
  const locale = await getLocale();
  const t = await getTranslations();
  const href = (path: string) => localizeHref(path, locale);

  // Табы по направлениям — только по тем, где есть кейсы; при одном направлении
  // фильтр ничего не меняет, и табов нет.
  const groups = SERVICE_IDS.map((id) => ({
    id,
    slugs: PUBLISHED_CASE_SLUGS.filter((slug) => CASE_SERVICES[slug].includes(id)),
  })).filter((group) => group.slugs.length > 0);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbs([
          { name: t('nav.home'), path: href('/') },
          { name: t('nav.cases'), path: href('/cases') },
        ])}
      />

      <PageHero
        breadcrumbs={[{ label: t('nav.home'), href: href('/') }, { label: t('nav.cases') }]}
        meta={t('cases-page.meta')}
        title={t('cases-page.title')}
        lead={t('cases-page.lead')}
      />

      <Section spacing="s" aria-label={t('cases-page.title')}>
        {groups.length > 1 ? (
          <Tabs
            label={t('cases-page.filter-label')}
            items={[
              { id: ALL, label: t('cases-page.filter-all'), count: PUBLISHED_CASE_SLUGS.length },
              ...groups.map((group) => ({
                id: group.id,
                label: t(`service-labels.${group.id}`),
                count: group.slugs.length,
              })),
            ]}
            panels={Object.fromEntries([
              [ALL, <CaseCards key={ALL} layout="stacked" headingLevel={2} />],
              ...groups.map((group) => [
                group.id,
                <CaseCards key={group.id} slugs={group.slugs} layout="stacked" headingLevel={2} />,
              ]),
            ])}
          />
        ) : (
          <CaseCards layout="stacked" headingLevel={2} />
        )}
      </Section>
    </>
  );
};
