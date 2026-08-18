import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CasesPage } from '@/views/CasesPage';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';
import { buildSocialMeta } from '@/shared/lib/seo/buildSocialMeta';
import { buildPageOgImage } from '@/shared/lib/seo/ogImage';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'cases' });
  return {
    title: t('title'),
    description: t('hero-lead'),
    alternates: buildPageAlternates(locale, '/cases'),
    ...buildSocialMeta({
      title: t('title'),
      description: t('hero-lead'),
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
  return <CasesPage />;
}
