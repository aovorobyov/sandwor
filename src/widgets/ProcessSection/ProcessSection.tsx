import { getTranslations } from 'next-intl/server';
import { ProcessSteps } from '@sw/components/ProcessSteps';
import type { ProcessStep } from '@sw/components/ProcessSteps';
import { Section } from '@/shared/ui/Section';
import { SectionIntro } from '@/shared/ui/SectionIntro';

interface ProcessSectionProps {
  tone?: 'default' | 'sunken';
}

/** «Как мы работаем»: пять этапов ProcessSteps узлами на точечной канве (onCanvas). */
export const ProcessSection = async ({ tone = 'default' }: ProcessSectionProps) => {
  const t = await getTranslations('process');
  const steps = t.raw('steps') as ProcessStep[];

  return (
    <Section tone={tone} aria-labelledby="process-title">
      <SectionIntro meta={t('meta')} title={t('title')} titleId="process-title" lead={t('lead')} />

      <ProcessSteps
        steps={steps}
        onCanvas
        labels={{ list: t('list-label'), done: t('done'), current: t('current') }}
      />
    </Section>
  );
};
