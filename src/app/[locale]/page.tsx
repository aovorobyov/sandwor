import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HomePage } from '@/views/HomePage';
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
    description: t('home.bio'),
    alternates: buildPageAlternates(locale, ''),
    ...buildSocialMeta({
      // В превью уходит позиционирование из героя, а не био: ссылку чаще всего
      // отправляют потенциальному заказчику.
      title: t('home.hero-title'),
      description: t('home.hero-lead'),
      image: buildOfferOgImage(locale),
    }),
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <HomePage />;
}
