import { getTelegramPosts } from '@/entities/post/api/telegram';

/** Минимальная проекция поста для поиска в командной палитре — без HTML-тела. */
export const GET = async () => {
  const posts = await getTelegramPosts();

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
