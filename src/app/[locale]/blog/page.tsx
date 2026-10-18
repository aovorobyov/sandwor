import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BlogPage } from '@/views/BlogPage';
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
    title: t('blog-page.title'),
    description: t('blog-page.lead'),
    alternates: buildPageAlternates(locale, '/blog'),
    ...buildSocialMeta({
      title: t('blog-page.title'),
      description: t('blog-page.lead'),
      image: buildPageOgImage({
        locale,
        tag: t('nav.blog'),
        title: t('blog-page.title'),
        lead: t('blog-page.lead'),
      }),
    }),
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string; slug?: string };
}) {
  setRequestLocale(locale);
  return <BlogPage />;
}
