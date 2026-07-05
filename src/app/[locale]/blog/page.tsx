import type { Metadata } from 'next';
import { OG_DEFAULT_IMAGE } from '@/shared/lib/seo/ogImage';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BlogPage } from '@/views/BlogPage';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';

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
    openGraph: {
      title: t('blog.title'),
      description: t('blog.subtitle'),
      images: [OG_DEFAULT_IMAGE],
    },
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
