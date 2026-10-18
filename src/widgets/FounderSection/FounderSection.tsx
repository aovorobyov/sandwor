import { getTranslations } from 'next-intl/server';
import { TeamCard } from '@sw/components/TeamCard';
import { TELEGRAM_URL } from '@/shared/config/contacts';
import { Section } from '@/shared/ui/Section';
import { SectionIntro } from '@/shared/ui/SectionIntro';

/**
 * Кто отвечает за проект: карточка основателя (TeamCard founder). Остальная
 * команда (`member`) появится здесь списком TeamCardList, когда будут данные.
 */
export const FounderSection = async () => {
  const t = await getTranslations('founder');

  return (
    <Section aria-labelledby="founder-title">
      <SectionIntro meta={t('meta')} title={t('title')} titleId="founder-title" />

      <TeamCard
        variant="founder"
        name={t('name')}
        role={t('role')}
        quote={t('quote')}
        meta={t('meta-line')}
        contact={{
          label: t('contact'),
          href: TELEGRAM_URL,
          target: '_blank',
          rel: 'noopener noreferrer',
        }}
      />
    </Section>
  );
};
