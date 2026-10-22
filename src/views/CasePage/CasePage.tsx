import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { Badge } from '@sw/components/Badge';
import { Button } from '@sw/components/Button';
import { Canvas } from '@sw/components/Canvas';
import { ArticleFigure } from '@sw/components/Article';
import { Stats } from '@sw/components/Stats';
import {
  CASE_COVERS,
  CASE_LINKS,
  CASE_SERVICES,
  CASE_SHOTS,
  CaseShot,
  PUBLISHED_CASE_SLUGS,
  SiteCover,
  isPublishedCase,
  type CaseDetail,
  type CaseItem,
  type CaseLinkKind,
  type CaseSlug,
} from '@/entities/case';
import { BriefButton } from '@/features/brief';
import { CaseCards } from '@/widgets/CaseCards';
import { JsonLd, buildBreadcrumbs } from '@/shared/lib/jsonLd';
import { localizeHref } from '@/shared/ui/Link';
import { PageHero } from '@/shared/ui/PageHero';
import { Section } from '@/shared/ui/Section';
import { SectionIntro } from '@/shared/ui/SectionIntro';
import s from './CasePage.module.css';

interface CasePageProps {
  slug: string;
}

const LINK_ICONS: Record<CaseLinkKind, string> = {
  site: 'external-link',
  repo: 'brand-github',
};

export const CasePage = async ({ slug }: CasePageProps) => {
  const locale = await getLocale();
  const t = await getTranslations();
  const href = (path: string) => localizeHref(path, locale);

  const items = t.raw('cases.items') as CaseItem[];
  const details = t.raw('cases.details') as Record<string, CaseDetail>;
  const item = items.find((i) => i.slug === slug);
  const detail = details[slug];

  if (!item || !detail || !isPublishedCase(slug)) notFound();

  const caseSlug = slug as CaseSlug;
  const services = CASE_SERVICES[caseSlug];
  const links = CASE_LINKS[caseSlug] ?? [];
  const others = PUBLISHED_CASE_SLUGS.filter((other) => other !== caseSlug);
  const shots = CASE_SHOTS[caseSlug];
  // Подписи из переводов, устройство — из CASE_SHOTS; кадры без записи там не показываем.
  const gallery = (detail.gallery ?? []).filter((shot) => shots?.shots[shot.id]);
  const desktopShots = gallery.filter((shot) => shots?.shots[shot.id].device === 'desktop');
  const mobileShots = gallery.filter((shot) => shots?.shots[shot.id].device === 'mobile');

  return (
    <>
      <JsonLd
        data={buildBreadcrumbs([
          { name: t('nav.home'), path: href('/') },
          { name: t('nav.cases'), path: href('/cases') },
          { name: item.title, path: href(`/cases/${slug}`) },
        ])}
      />

      <PageHero
        breadcrumbs={[
          { label: t('nav.home'), href: href('/') },
          { label: t('nav.cases'), href: href('/cases') },
          { label: item.title },
        ]}
        meta={
          <>
            {services.map((service) => (
              <Badge key={service} service={service}>
                {t(`service-labels.${service}`)}
              </Badge>
            ))}

            <Badge variant="tag">{item.type}</Badge>
          </>
        }
        title={item.title}
        lead={detail.lead}
        actions={
          links.length > 0 ? (
            <>
              {links.map((link) => (
                <Button
                  key={link.href}
                  variant="secondary"
                  icon={LINK_ICONS[link.kind]}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(link.kind === 'site' ? 'cases.link-site' : 'cases.link-repo')}
                </Button>
              ))}
            </>
          ) : undefined
        }
        aside={
          <Canvas bordered className={s.cover}>
            {shots ? (
              <div className={s.coverShot}>
                <CaseShot
                  slug={caseSlug}
                  id={shots.cover}
                  device={shots.shots[shots.cover].device}
                  domain={shots.domain}
                  alt={t('cases-page.cover-shot-label', { title: item.title })}
                  sizes="(max-width: 1100px) 92vw, 560px"
                  isPriority
                />
              </div>
            ) : (
              <SiteCover spec={CASE_COVERS[caseSlug]} label={item.type} size="l" />
            )}
          </Canvas>
        }
      >
        {detail.metrics && detail.metrics.length > 0 && (
          <Stats
            className={s.metrics}
            label={t('cases-page.metrics-label')}
            items={detail.metrics.map((metric, index) => ({ ...metric, accent: index === 0 }))}
          />
        )}
      </PageHero>

      <Section spacing="s" aria-labelledby="case-facts-title">
        <div className={s.layout}>
          <aside className={s.facts}>
            <h2 id="case-facts-title" className={s.factsTitle}>
              {t('cases-page.facts-title')}
            </h2>

            <dl className={s.factsList}>
              {detail.facts.map((fact) => (
                <div key={fact.k} className={s.fact}>
                  <dt>{fact.k}</dt>
                  <dd>{fact.v}</dd>
                </div>
              ))}
            </dl>

            <BriefButton variant="secondary" block services={[...services]} placement="case">
              {t('services.cta')}
            </BriefButton>
          </aside>

          <div className={s.story}>
            {detail.blocks.map((block) => (
              <section key={block.title} className={s.block}>
                <h2 className={s.blockTitle}>{block.title}</h2>

                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </Section>

      {shots && gallery.length > 0 && (
        <Section tone="canvas" aria-labelledby="case-gallery-title">
          <SectionIntro
            meta={t('cases-page.gallery-meta')}
            title={t('cases-page.gallery-title')}
            titleId="case-gallery-title"
          />

          {desktopShots.length > 0 && (
            <div className={s.galleryDesktop}>
              {desktopShots.map((shot) => (
                <ArticleFigure key={shot.id} caption={shot.caption} className={s.figure}>
                  <CaseShot
                    slug={caseSlug}
                    id={shot.id}
                    device="desktop"
                    domain={shots.domain}
                    alt={shot.caption}
                    sizes="(max-width: 900px) 92vw, 540px"
                  />
                </ArticleFigure>
              ))}
            </div>
          )}

          {mobileShots.length > 0 && (
            <div className={s.galleryMobile}>
              {mobileShots.map((shot) => (
                <ArticleFigure key={shot.id} caption={shot.caption} className={s.figure}>
                  <CaseShot slug={caseSlug} id={shot.id} device="mobile" alt={shot.caption} />
                </ArticleFigure>
              ))}
            </div>
          )}
        </Section>
      )}

      {others.length > 0 && (
        <Section tone="sunken" aria-labelledby="other-cases-title">
          <SectionIntro title={t('cases-page.other-title')} titleId="other-cases-title" />

          <CaseCards slugs={others} layout="stacked" />
        </Section>
      )}
    </>
  );
};
