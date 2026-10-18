import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ServicePage } from '@/views/ServicePage';
import { SERVICE_IDS, isServiceId } from '@/entities/service';
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
  return <ServicePage service={service} />;
}
