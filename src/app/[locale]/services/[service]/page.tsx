import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ServicePage } from '@/views/ServicePage';
import { ServiceSoonPage } from '@/views/ServiceSoonPage';
import { SERVICE_IDS, isServiceActive, isServiceId } from '@/entities/service';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';
import { buildSocialMeta } from '@/shared/lib/seo/buildSocialMeta';
import { buildPageOgImage } from '@/shared/lib/seo/ogImage';

interface Props {
  params: { locale: string; service: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_IDS.map((service) => ({ service }));
}

export async function generateMetadata({ params: { locale, service } }: Props): Promise<Metadata> {
  if (!isServiceId(service)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: `services.items.${service}` });

  // «Скоро»: страница есть, но в поиск не отдаём — направление ещё не работает.
  if (!isServiceActive(service)) {
    const tServices = await getTranslations({ locale, namespace: 'services' });

    return {
      title: tServices('soon-page-title', { title: t('title') }),
      description: tServices('soon-lead'),
      robots: { index: false, follow: true },
    };
  }

  return {
    title: t('meta-title'),
    description: t('meta-description'),
    alternates: buildPageAlternates(locale, `/services/${service}`),
    ...buildSocialMeta({
      title: t('meta-title'),
      description: t('meta-description'),
      image: buildPageOgImage({
        locale,
        tag: t('title'),
        title: t('hero-title'),
        lead: t('text'),
      }),
    }),
  };
}

export default function Page({ params: { locale, service } }: Props) {
  if (!isServiceId(service)) {
    notFound();
  }

  setRequestLocale(locale);

  if (!isServiceActive(service)) {
    return <ServiceSoonPage service={service} />;
  }

  return <ServicePage service={service} />;
}
