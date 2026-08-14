import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HomePage } from '@/views/HomePage';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';
import { buildOfferOgImage } from '@/shared/lib/seo/ogImage';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: '' });
  return {
    description: t('home.bio'),
    alternates: buildPageAlternates(locale, ''),
    openGraph: {
      images: [buildOfferOgImage(locale)],
    },
    twitter: {
      images: [buildOfferOgImage(locale).url],
    },
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <HomePage />;
}
