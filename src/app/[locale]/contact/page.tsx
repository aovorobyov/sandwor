import type { Metadata } from 'next';
import { OG_DEFAULT_IMAGE } from '@/shared/lib/seo/ogImage';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactPage } from '@/views/ContactPage';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';

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
    openGraph: {
      title: t('contact.title'),
      description: t('contact.subtitle'),
      images: [OG_DEFAULT_IMAGE],
    },
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <ContactPage />;
}
