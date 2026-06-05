import type { Metadata } from 'next';
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
    alternates: buildPageAlternates('/blog'),
    openGraph: { title: t('blog.title'), description: t('blog.subtitle') },
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
