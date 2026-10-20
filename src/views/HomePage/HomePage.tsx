import { getLocale, getTranslations } from 'next-intl/server';
import { Button } from '@sw/components/Button';
import { FlowDiagram } from '@sw/components/FlowDiagram';
import type { FlowDiagramNode } from '@sw/components/FlowDiagram';
import { Stats } from '@sw/components/Stats';
import type { StatsItem } from '@sw/components/Stats';
import { getPosts } from '@/entities/post/api/posts';
import { SERVICE_PRICES } from '@/entities/service';
import { BriefButton } from '@/features/brief';
import { CaseCards } from '@/widgets/CaseCards';
import { FaqSection, GENERAL_FAQ_KEY, type FaqItem } from '@/widgets/FaqSection';
import { FounderSection } from '@/widgets/FounderSection';
import { HeroActivity } from '@/widgets/HeroActivity';
import { PostsGrid } from '@/widgets/PostsGrid';
import { PriceCalculator } from '@/widgets/PriceCalculator';
import { ProcessSection } from '@/widgets/ProcessSection';
import { ServicesGrid } from '@/widgets/ServicesGrid';
import { SocialProof } from '@/widgets/SocialProof';
import { JsonLd, buildOrganization, buildWebSite } from '@/shared/lib/jsonLd';
import { FEATURES, POSITIONING, byPositioning } from '@/shared/config/positioning';
import { formatPrice } from '@/shared/lib/format';
import { localizeHref } from '@/shared/ui/Link';
import { PageHero } from '@/shared/ui/PageHero';
import { Section } from '@/shared/ui/Section';
import { SectionIntro } from '@/shared/ui/SectionIntro';
import s from './HomePage.module.css';

/** Иконки узлов схемы «Путь заявки» — по порядку `home.flow.nodes`. */
const FLOW_ICONS = ['browser', 'cpu', 'layout-kanban', 'brand-telegram'];

const BLOG_LIMIT = 3;

export const HomePage = async () => {
  const locale = await getLocale();
  const [t, posts] = await Promise.all([getTranslations(), getPosts(locale)]);
  const href = (path: string) => localizeHref(path, locale);

  const hero = `home.hero-${POSITIONING}`;
  const stats = (t.raw(`home.stats-${POSITIONING}`) as StatsItem[]).map((item, index) => {
    // Главная цифра блока — цена старта у сайтов; берём её из прайса, а не из переводов.
    const isPrice = POSITIONING === 'sites' && index === 0;

    return {
      ...item,
      ...(isPrice ? { value: formatPrice(SERVICE_PRICES.sites, t('common.from')) } : {}),
      accent: isPrice,
    };
  });
  const flowNodes = (t.raw('home.flow.nodes') as FlowDiagramNode[]).map((node, index, all) => ({
    ...node,
    icon: FLOW_ICONS[index],
    state: index === all.length - 1 ? ('live' as const) : ('done' as const),
  }));

  return (
    <>
      <JsonLd
        data={buildOrganization({
          description: t(
            byPositioning({ sites: 'meta.description', studio: 'meta.description-studio' }),
          ),
        })}
      />

      <JsonLd data={buildWebSite({ name: t('brand.name') })} />

      <PageHero
        size="l"
        aside={<HeroActivity />}
        meta={t(`${hero}.meta`)}
        title={t(`${hero}.title`)}
        lead={t(`${hero}.lead`)}
        actions={
          <>
            <BriefButton size="l" iconEnd="arrow-right">
              {t('home.hero-cta')}
            </BriefButton>

            <Button
              variant="secondary"
              size="l"
              href={FEATURES.calculator ? '#calculator' : href('/services/sites#plans')}
            >
              {t(`home.hero-secondary-${POSITIONING}`)}
            </Button>
          </>
        }
      />

      <div className={`sw-container ${s.flow}`}>
        {FEATURES.leadFlow && (
          <FlowDiagram
            size="hero"
            title={t('home.flow.title')}
            nodes={flowNodes}
            edges={['', '', '']}
            branch={{ afterIndex: 1, icon: 'git-branch', label: t('home.flow.branch') }}
            listLabel={t('home.flow.list-label')}
          />
        )}

        <Stats items={stats} label={t('home.stats-label')} className={s.stats} />
      </div>

      <Section aria-labelledby="services-title">
        <SectionIntro
          layout="row"
          meta={t('home.services-meta')}
          title={t('home.services-title')}
          titleId="services-title"
          lead={t(`home.services-lead-${POSITIONING}`)}
          actions={
            <Button variant="ghost" iconEnd="arrow-right" href={href('/services')}>
              {t('home.services-all')}
            </Button>
          }
        />

        <ServicesGrid variant="compact" />
      </Section>

      <ProcessSection />

      <Section aria-labelledby="cases-title">
        <SectionIntro
          layout="row"
          meta={t('home.cases-meta')}
          title={t('home.cases-title')}
          titleId="cases-title"
          lead={t('home.cases-lead')}
          actions={
            <Button variant="ghost" iconEnd="arrow-right" href={href('/cases')}>
              {t('home.cases-all')}
            </Button>
          }
        />

        <CaseCards layout="stacked" />
      </Section>

      {FEATURES.calculator && (
        <Section tone="sunken" id="calculator" aria-labelledby="calc-title">
          <SectionIntro
            meta={t('home.calc-meta')}
            title={t('home.calc-title')}
            titleId="calc-title"
            lead={t('home.calc-lead')}
          />

          <PriceCalculator />
        </Section>
      )}

      <SocialProof />

      <FounderSection />

      {posts.length > 0 && (
        <Section tone="sunken" aria-labelledby="blog-title">
          <SectionIntro
            layout="row"
            meta={t('home.blog-meta')}
            title={t('home.blog-title')}
            titleId="blog-title"
            lead={t('home.blog-lead')}
            actions={
              <Button variant="ghost" iconEnd="arrow-right" href={href('/blog')}>
                {t('home.blog-all')}
              </Button>
            }
          />

          <PostsGrid posts={posts.slice(0, BLOG_LIMIT)} teaser />
        </Section>
      )}

      <FaqSection items={t.raw(GENERAL_FAQ_KEY) as FaqItem[]} />
    </>
  );
};
