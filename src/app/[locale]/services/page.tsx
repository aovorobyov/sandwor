import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ServicesPage } from '@/views/ServicesPage';
import { byPositioning } from '@/shared/config/positioning';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';
import { buildSocialMeta } from '@/shared/lib/seo/buildSocialMeta';
import { buildPageOgImage, withStaticOg } from '@/shared/lib/seo/ogImage';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'services' });

  return {
    title: t(byPositioning({ sites: 'meta-title', studio: 'meta-title-studio' })),
    description: t(byPositioning({ sites: 'meta-description', studio: 'meta-description-studio' })),
    alternates: buildPageAlternates(locale, '/services'),
    ...buildSocialMeta({
      locale,
      path: '/services',
      title: t(byPositioning({ sites: 'meta-title', studio: 'meta-title-studio' })),
      description: t(
        byPositioning({ sites: 'meta-description', studio: 'meta-description-studio' }),
      ),
      image: withStaticOg(
        'services',
        locale,
        buildPageOgImage({
          locale,
          tag: t('title'),
          title: t('hero-title'),
          lead: t('hero-lead'),
        }),
      ),
    }),
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <ServicesPage />;
}
