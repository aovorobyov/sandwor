import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArticlePage } from '@/views/ArticlePage';
import { getPosts, getPost } from '@/entities/post/api/posts';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';
import { buildSocialMeta } from '@/shared/lib/seo/buildSocialMeta';
import { buildContentOgImage } from '@/shared/lib/seo/ogImage';

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

  const description = post.description || post.excerpt;

  return {
    title: post.title,
    description,
    alternates: buildPageAlternates(locale, `/blog/${post.slug}`),
    ...buildSocialMeta({
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.date,
      image: buildContentOgImage({
        locale,
        tag: post.tag,
        title: post.title,
        meta: t('blog.min-read', { count: post.readTime }),
      }),
    }),
  };
}

export default function Page({ params: { slug, locale } }: Props) {
  setRequestLocale(locale);
  return <ArticlePage slug={slug} />;
}
