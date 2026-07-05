import type { Metadata } from 'next';
import { OG_DEFAULT_IMAGE } from '@/shared/lib/seo/ogImage';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { UIKitPage } from '@/views/UIKitPage';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'uikit' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildPageAlternates(locale, '/uikit'),
    openGraph: { title: t('title'), description: t('description'), images: [OG_DEFAULT_IMAGE] },
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <UIKitPage />;
}
