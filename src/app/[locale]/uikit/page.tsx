import type { Metadata } from 'next';
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
    alternates: buildPageAlternates('/uikit'),
    openGraph: { title: t('title'), description: t('description') },
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <UIKitPage />;
}
