import { getTranslations } from 'next-intl/server';
import { ProcessSteps } from '@sw/components/ProcessSteps';
import type { ProcessStep } from '@sw/components/ProcessSteps';
import { Section } from '@/shared/ui/Section';
import { SectionIntro } from '@/shared/ui/SectionIntro';
import { byPositioning } from '@/shared/config/positioning';
import s from './ProcessSection.module.css';

interface ProcessSectionProps {
  tone?: 'default' | 'sunken';
}

/** «Как мы работаем»: пять этапов ProcessSteps узлами на точечной канве (onCanvas). */
export const ProcessSection = async ({ tone = 'default' }: ProcessSectionProps) => {
  const t = await getTranslations('process');
  const steps = t.raw(
    byPositioning({ sites: 'steps-sites', studio: 'steps-studio' }),
  ) as ProcessStep[];
  const lead = t(byPositioning({ sites: 'lead-sites', studio: 'lead-studio' }));
  const labels = { list: t('list-label'), done: t('done'), current: t('current') };

  return (
    <Section tone={tone} aria-labelledby="process-title">
      <SectionIntro meta={t('meta')} title={t('title')} titleId="process-title" lead={lead} />

      {/* Пять этапов в ряд читаются только с ~960px; ProcessSteps в режиме auto
          переходит в столбец лишь с 760px, поэтому рендерим обе раскладки и
          показываем нужную по ширине (скрытая убрана и от скринридера). */}
      <div className={s.row}>
        <ProcessSteps
          steps={steps}
          onCanvas
          orientation="horizontal"
          labels={labels}
          padNumbers={false}
        />
      </div>

      <div className={s.column}>
        <ProcessSteps
          steps={steps}
          onCanvas
          orientation="vertical"
          labels={labels}
          padNumbers={false}
        />
      </div>
    </Section>
  );
};
