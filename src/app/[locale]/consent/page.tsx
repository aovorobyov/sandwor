import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ConsentPage } from '@/views/PrivacyPage';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';
import { buildSocialMeta } from '@/shared/lib/seo/buildSocialMeta';
import { buildPageOgImage } from '@/shared/lib/seo/ogImage';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: '' });
  const title = t('consent.title');
  return {
    title,
    description: t('consent.intro'),
    alternates: buildPageAlternates(locale, '/consent'),
    ...buildSocialMeta({
      title,
      description: t('consent.intro'),
      image: buildPageOgImage({
        locale,
        tag: t('consent.breadcrumb'),
        title,
      }),
    }),
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <ConsentPage />;
}
