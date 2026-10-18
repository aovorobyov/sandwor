import { getLocale, getTranslations } from 'next-intl/server';
import { TestimonialCard } from '@sw/components/TestimonialCard';
import { ClientLogos } from '@sw/components/ClientLogos';
import { CLIENT_LOGOS, TESTIMONIALS } from '@/entities/testimonial';
import { Section } from '@/shared/ui/Section';
import { SectionIntro } from '@/shared/ui/SectionIntro';
import s from './SocialProof.module.css';

/**
 * Отзывы и стена клиентов. Рендерится, только когда есть настоящие данные
 * (`entities/testimonial`) — без них секции на странице нет вовсе.
 */
export const SocialProof = async () => {
  if (TESTIMONIALS.length === 0 && CLIENT_LOGOS.length === 0) {
    return null;
  }

  const locale = await getLocale();
  const t = await getTranslations('home');

  return (
    <Section aria-labelledby="testimonials-title">
      <SectionIntro
        meta={t('testimonials-meta')}
        title={t('testimonials-title')}
        titleId="testimonials-title"
      />

      {TESTIMONIALS.length > 0 && (
        <div className={s.grid}>
          {TESTIMONIALS.map(({ id, quote, quoteEn, ...rest }) => (
            <TestimonialCard
              key={id}
              {...rest}
              quote={locale === 'en' && quoteEn ? quoteEn : quote}
            />
          ))}
        </div>
      )}

      {CLIENT_LOGOS.length > 0 && (
        <ClientLogos items={[...CLIENT_LOGOS]} caption={t('clients-caption')} className={s.logos} />
      )}
    </Section>
  );
};
