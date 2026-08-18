import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PrivacyPage } from '@/views/PrivacyPage';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';
import { buildSocialMeta } from '@/shared/lib/seo/buildSocialMeta';
import { buildPageOgImage } from '@/shared/lib/seo/ogImage';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: '' });
  return {
    title: t('privacy.title'),
    description: t('privacy.intro'),
    alternates: buildPageAlternates(locale, '/privacy'),
    ...buildSocialMeta({
      title: t('privacy.title'),
      description: t('privacy.intro'),
      image: buildPageOgImage({
        locale,
        tag: t('privacy.breadcrumb'),
        title: t('privacy.title'),
      }),
    }),
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <PrivacyPage />;
}
