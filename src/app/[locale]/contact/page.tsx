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
    title: t('contact-page.meta'),
    description: t('contact-page.lead'),
    alternates: buildPageAlternates(locale, '/contact'),
    ...buildSocialMeta({
      locale,
      path: '/contact',
      title: t('contact-page.meta'),
      description: t('contact-page.lead'),
      image: buildPageOgImage({
        locale,
        tag: t('contact-page.meta'),
        title: t('contact-page.title'),
        lead: t('contact-page.lead'),
      }),
    }),
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <ContactPage />;
}
