import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { NewsPage } from '@/views/NewsPage';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'news' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: buildPageAlternates('/news'),
    openGraph: { title: t('title'), description: t('subtitle') },
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <NewsPage />;
}
