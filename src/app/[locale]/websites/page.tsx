import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { WebsitesPage } from '@/views/WebsitesPage';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';
import { buildSocialMeta } from '@/shared/lib/seo/buildSocialMeta';
import { buildOfferOgImage } from '@/shared/lib/seo/ogImage';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: '' });
  return {
    title: t('websites.meta-title'),
    description: t('websites.meta-description'),
    alternates: buildPageAlternates(locale, '/websites'),
    ...buildSocialMeta({
      title: t('websites.meta-title'),
      description: t('websites.meta-description'),
      image: buildOfferOgImage(locale),
    }),
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <WebsitesPage />;
}
