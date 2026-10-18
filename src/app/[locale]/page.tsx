import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HomePage } from '@/views/HomePage';
import { POSITIONING, byPositioning } from '@/shared/config/positioning';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';
import { buildSocialMeta } from '@/shared/lib/seo/buildSocialMeta';
import { buildOfferOgImage } from '@/shared/lib/seo/ogImage';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: '' });
  return {
    description: t(byPositioning({ sites: 'meta.description', studio: 'meta.description-studio' })),
    alternates: buildPageAlternates(locale, ''),
    ...buildSocialMeta({
      // В превью уходит позиционирование из героя, а не био: ссылку чаще всего
      // отправляют потенциальному заказчику.
      title: t(`home.hero-${POSITIONING}.title`),
      description: t(`home.hero-${POSITIONING}.lead`),
      image: buildOfferOgImage(locale),
    }),
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <HomePage />;
}
