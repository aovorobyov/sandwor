import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArticlePage } from '@/views/ArticlePage';
import { getTelegramPosts, getTelegramPost } from '@/entities/post/api/telegram';

interface Props {
  params: { locale: string; slug: string };
}

// Generate static paths for known posts at build time; new posts are ISR-rendered on demand
export async function generateStaticParams() {
  const posts = await getTelegramPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  const post = await getTelegramPost(slug);
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
