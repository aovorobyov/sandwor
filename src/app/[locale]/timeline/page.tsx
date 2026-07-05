import type { Metadata } from 'next';
import { OG_DEFAULT_IMAGE } from '@/shared/lib/seo/ogImage';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TimelinePage } from '@/views/TimelinePage';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'timeline' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: buildPageAlternates(locale, '/timeline'),
    openGraph: { title: t('title'), description: t('subtitle'), images: [OG_DEFAULT_IMAGE] },
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <TimelinePage />;
}
