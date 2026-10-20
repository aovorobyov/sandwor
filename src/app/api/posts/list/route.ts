import { getPosts } from '@/entities/post/api/posts';

/** Минимальная проекция поста для поиска в командной палитре — без HTML-тела. */
export const GET = async (req: Request) => {
  const locale = new URL(req.url).searchParams.get('locale') === 'en' ? 'en' : 'ru';
  const posts = await getPosts(locale);

  const slim = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    tag: post.tag,
  }));

  return Response.json(slim, {
    headers: {
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
};
