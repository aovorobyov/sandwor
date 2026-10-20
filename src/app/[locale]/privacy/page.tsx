import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PrivacyPage } from '@/views/PrivacyPage';
import { toMetaDescription } from '@/shared/lib/seo/metaDescription';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';
import { buildSocialMeta } from '@/shared/lib/seo/buildSocialMeta';
import { buildPageOgImage } from '@/shared/lib/seo/ogImage';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: '' });
  // В заголовке страницы — мягкий перенос для узких экранов; в мета он не нужен.
  const title = t('privacy.title').replace(/\u00ad/g, '');
  return {
    title,
    description: toMetaDescription(t('privacy.intro')),
    alternates: buildPageAlternates(locale, '/privacy'),
    ...buildSocialMeta({
      locale,
      path: '/privacy',
      title,
      description: toMetaDescription(t('privacy.intro')),
      image: buildPageOgImage({
        locale,
        tag: t('privacy.breadcrumb'),
        title,
      }),
    }),
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <PrivacyPage />;
}
