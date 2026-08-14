import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArticlePage } from '@/views/ArticlePage';
import { getPosts, getPost } from '@/entities/post/api/posts';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';

interface Props {
  params: { locale: string; slug: string };
}

// Generate static paths for known posts at build time; new posts are ISR-rendered on demand
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  const post = await getPost(slug, locale);
  const t = await getTranslations({ locale, namespace: '' });

  if (!post) {
    return { title: t('blog.title') };
  }

  const ogImage = `/api/og?title=${encodeURIComponent(post.title)}${
    post.tag ? `&tag=${encodeURIComponent(post.tag)}` : ''
  }`;

  const description = post.description || post.excerpt;

  return {
    title: post.title,
    description,
    alternates: buildPageAlternates(locale, `/blog/${post.slug}`),
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [ogImage],
    },
  };
}

export default function Page({ params: { slug, locale } }: Props) {
  setRequestLocale(locale);
  return <ArticlePage slug={slug} />;
}
