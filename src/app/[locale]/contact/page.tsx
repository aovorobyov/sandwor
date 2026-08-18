import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactPage } from '@/views/ContactPage';
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
    title: t('contact.title'),
    description: t('contact.subtitle'),
    alternates: buildPageAlternates(locale, '/contact'),
    ...buildSocialMeta({
      title: t('contact.title'),
      description: t('contact.subtitle'),
      image: buildPageOgImage({
        locale,
        tag: t('contact.title'),
        title: t('contact.hero-title'),
        lead: t('contact.subtitle'),
      }),
    }),
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <ContactPage />;
}
