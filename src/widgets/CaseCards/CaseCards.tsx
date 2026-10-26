import { getLocale, getTranslations } from 'next-intl/server';
import { CaseCard } from '@sw/components/CaseCard';
import { cx } from '@sw/utils';
import {
  CASE_COVERS,
  CASE_SERVICES,
  CASE_SHOTS,
  PUBLISHED_CASE_SLUGS,
  CaseShot,
  SiteCover,
  type CaseDetail,
  type CaseItem,
  type CaseSlug,
} from '@/entities/case';
import { SERVICE_IDS } from '@/entities/service';
import { localizeHref } from '@/shared/ui/Link';
import s from './CaseCards.module.css';

interface CaseCardsProps {
  /** Какие кейсы показать; по умолчанию — все опубликованные. */
  slugs?: readonly CaseSlug[];
  /**
   * stacked (по умолчанию) — обложка сверху, сетка 2 в ряд; split — обложка слева.
   * split на планшете сжимает текст в узкую колонку, поэтому на страницах — stacked.
   */
  layout?: 'split' | 'stacked';
  headingLevel?: 2 | 3;
}

/** Факт кейса по ключу из «Коротко»: задача и решение для карточки. */
const findFact = (detail: CaseDetail | undefined, index: number): string | undefined => {
  return detail?.facts[index]?.v;
};

/**
 * Карточки кейсов на CaseCard дизайн-системы. Обложка — схематичное окно сайта
 * (скриншот сайта или схематичный SiteCover), задача и решение — из фактов кейса.
 * Цифры — только о нашей работе («12 страниц», «800+ пар в словаре»): метрики
 * бизнеса клиенты не раскрывают, а выдумывать их мы не будем.
 */
export const CaseCards = async ({
  slugs,
  layout = 'stacked',
  headingLevel = 3,
}: CaseCardsProps) => {
  const locale = await getLocale();
  const t = await getTranslations();
  const items = t.raw('cases.items') as CaseItem[];
  const details = t.raw('cases.details') as Record<string, CaseDetail>;

  const list = (slugs ?? PUBLISHED_CASE_SLUGS)
    .map((slug) => items.find((item) => item.slug === slug))
    .filter((item): item is CaseItem => !!item);

  const serviceLabels = Object.fromEntries(
    SERVICE_IDS.map((id) => [id, t(`service-labels.${id}`)]),
  );

  return (
    <div className={cx(s.grid, s[layout], list.length === 1 && s.single)}>
      {list.map((item) => {
        const slug = item.slug as CaseSlug;
        const detail = details[slug];
        const shots = CASE_SHOTS[slug];
        const cover = shots ? (
          <div className={s.cover}>
            <CaseShot
              slug={slug}
              id={shots.cover}
              device={shots.shots[shots.cover].device}
              domain={shots.domain}
              alt=""
              variant="peek"
              sizes="(max-width: 900px) 92vw, 520px"
            />
          </div>
        ) : (
          <SiteCover spec={CASE_COVERS[slug]} label={item.type} />
        );

        return (
          <CaseCard
            key={slug}
            layout={layout}
            headingLevel={headingLevel}
            client={item.title}
            subtitle={item.type}
            services={[...CASE_SERVICES[slug]]}
            labels={{
              task: t('common.task'),
              solution: t('common.solution'),
              services: serviceLabels,
            }}
            cover={cover}
            coverLabel={t(shots ? 'cases-page.cover-shot-label' : 'cases-page.cover-label', {
              title: item.title,
            })}
            task={findFact(detail, 1) ?? item.summary}
            solution={findFact(detail, 2)}
            metrics={detail?.metrics?.slice(0, 2)}
            href={localizeHref(`/cases/${slug}`, locale)}
            cta={t('common.read-case')}
          />
        );
      })}
    </div>
  );
};
