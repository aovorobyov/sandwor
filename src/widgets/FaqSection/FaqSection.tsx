import { getTranslations } from 'next-intl/server';
import { Accordion } from '@sw/components/Accordion';
import { Button } from '@sw/components/Button';
import { TELEGRAM_URL } from '@/shared/config/contacts';
import { Section } from '@/shared/ui/Section';
import { byPositioning } from '@/shared/config/positioning';
import s from './FaqSection.module.css';

export interface FaqItem {
  q: string;
  a: string;
}

/** Ключ общего FAQ для текущего позиционирования. */
export const GENERAL_FAQ_KEY = byPositioning({
  sites: 'faq.items-sites',
  studio: 'faq.items-studio',
});

interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
  tone?: 'default' | 'sunken';
}

/** FAQ по образцу дизайн-системы: интро с кнопкой Telegram слева, аккордеон справа. */
export const FaqSection = async ({ items, title, tone = 'default' }: FaqSectionProps) => {
  const t = await getTranslations('faq');

  return (
    <Section tone={tone} aria-labelledby="faq-title">
      <div className={s.grid}>
        <div className={s.intro}>
          <span className={s.meta}>{t('meta')}</span>

          <h2 id="faq-title" className={s.title}>
            {title ?? t('title')}
          </h2>

          <p className={s.lead}>{t('lead')}</p>

          <Button
            variant="secondary"
            icon="brand-telegram"
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('telegram')}
          </Button>
        </div>

        <Accordion
          items={items.map((item, index) => ({
            id: `faq-${index}`,
            question: item.q,
            answer: item.a,
          }))}
          defaultOpen={['faq-0']}
        />
      </div>
    </Section>
  );
};
