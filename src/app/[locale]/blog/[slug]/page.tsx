import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArticlePage } from '@/views/ArticlePage';
import { MOCK_POSTS } from '@/views/BlogPage';

interface Props {
  params: { locale: string; slug: string };
}

// Generate static paths for all posts at build time
export function generateStaticParams() {
  return MOCK_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  const post = MOCK_POSTS.find((p) => p.slug === slug);
  const t = await getTranslations({ locale, namespace: '' });

  if (!post) {
    return { title: t('blog.title') };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default function Page({ params: { slug, locale } }: Props) {
  setRequestLocale(locale);
  return <ArticlePage slug={slug} />;
}
