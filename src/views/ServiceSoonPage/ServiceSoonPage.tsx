import { getLocale, getTranslations } from 'next-intl/server';
import { Badge } from '@sw/components/Badge';
import { Button } from '@sw/components/Button';
import type { ServiceId } from '@/entities/service';
import { ServicesGrid } from '@/widgets/ServicesGrid';
import { TELEGRAM_URL } from '@/shared/config/contacts';
import { localizeHref } from '@/shared/ui/Link';
import { PageHero } from '@/shared/ui/PageHero';
import { Section } from '@/shared/ui/Section';
import { SectionIntro } from '@/shared/ui/SectionIntro';

interface ServiceSoonPageProps {
  service: ServiceId;
}

/**
 * Заглушка направления со статусом `soon`: название, плашка «Скоро» и путь к тому,
 * что уже работает. Полная страница (ServicePage) остаётся в коде — включается
 * сменой статуса в `entities/service`.
 */
export const ServiceSoonPage = async ({ service }: ServiceSoonPageProps) => {
  const locale = await getLocale();
  const t = await getTranslations();
  const href = (path: string) => localizeHref(path, locale);
  const title = t(`services.items.${service}.title`);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: t('nav.home'), href: href('/') },
          { label: t('services.title'), href: href('/services') },
          { label: title },
        ]}
        meta={
          <>
            <Badge service={service}>{t(`service-labels.${service}`)}</Badge>
            <Badge variant="tag">{t('services.soon')}</Badge>
          </>
        }
        title={title}
        lead={t('services.soon-lead')}
        actions={
          <>
            <Button size="l" href={href('/services/sites')} iconEnd="arrow-right">
              {t('services.soon-sites')}
            </Button>

            <Button
              variant="secondary"
              size="l"
              icon="brand-telegram"
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('services.soon-telegram')}
            </Button>
          </>
        }
      />

      <Section spacing="s" aria-labelledby="other-services-title">
        <SectionIntro title={t('services.other-title')} titleId="other-services-title" />

        <ServicesGrid variant="compact" exclude={service} />
      </Section>
    </>
  );
};
