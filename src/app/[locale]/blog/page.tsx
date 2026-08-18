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
    title: t('blog.title'),
    description: t('blog.subtitle'),
    alternates: buildPageAlternates(locale, '/blog'),
    ...buildSocialMeta({
      title: t('blog.title'),
      description: t('blog.subtitle'),
      image: buildPageOgImage({
        locale,
        tag: t('nav.blog'),
        title: t('blog.title'),
        lead: t('blog.subtitle'),
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
