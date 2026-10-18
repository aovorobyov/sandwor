import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ServicesPage } from '@/views/ServicesPage';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';
import { buildSocialMeta } from '@/shared/lib/seo/buildSocialMeta';
import { buildPageOgImage } from '@/shared/lib/seo/ogImage';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'services' });

  return {
    title: t('meta-title'),
    description: t('meta-description'),
    alternates: buildPageAlternates(locale, '/services'),
    ...buildSocialMeta({
      title: t('meta-title'),
      description: t('meta-description'),
      image: buildPageOgImage({
        locale,
        tag: t('title'),
        title: t('hero-title'),
        lead: t('hero-lead'),
      }),
    }),
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <ServicesPage />;
}
