import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PrivacyPage } from '@/views/PrivacyPage';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return {
    title: t('title'),
    description: t('intro'),
    alternates: buildPageAlternates(locale, '/privacy'),
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <PrivacyPage />;
}
