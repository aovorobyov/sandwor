import type { Metadata } from 'next';
import { buildOfferOgImage } from '@/shared/lib/seo/ogImage';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { WebsitesPage } from '@/views/WebsitesPage';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';

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
    openGraph: {
      title: t('websites.meta-title'),
      description: t('websites.meta-description'),
      images: [buildOfferOgImage(locale)],
    },
    twitter: {
      title: t('websites.meta-title'),
      description: t('websites.meta-description'),
      images: [buildOfferOgImage(locale).url],
    },
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <WebsitesPage />;
}
