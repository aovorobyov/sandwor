import { getTranslations } from 'next-intl/server';
import { getTelegramPosts } from '@/entities/post/api/telegram';
import { SITE_URL } from '@/shared/config/site';

/** Контент тг-канала — на русском, поэтому фид одноязычный, без префикса локали в путях. */
const FEED_LOCALE = 'ru';

const escapeXml = (value: string) => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

/** Post.date — это `YYYY-MM-DD`. Atom требует полноценный RFC3339 timestamp. */
const toIsoDateTime = (date: string) => {
  return `${date}T00:00:00Z`;
};

export const GET = async () => {
  const [posts, t] = await Promise.all([
    getTelegramPosts(),
    getTranslations({ locale: FEED_LOCALE, namespace: '' }),
  ]);

  const authorName = t('home.name');
  const subtitle = t('home.bio');
  const feedTitle = `${authorName} — ${t('blog.title')}`;

  const updated = posts.length > 0 ? toIsoDateTime(posts[0].date) : new Date().toISOString();

  const entries = posts
    .map((post) => {
      const url = `${SITE_URL}/${FEED_LOCALE}/blog/${post.slug}`;
      const isoDate = toIsoDateTime(post.date);

      return [
        '  <entry>',
        `    <id>${url}</id>`,
        `    <title>${escapeXml(post.title)}</title>`,
        `    <link href="${url}"/>`,
        `    <updated>${isoDate}</updated>`,
        `    <published>${isoDate}</published>`,
        `    <category term="${escapeXml(post.tag)}"/>`,
        `    <summary type="text">${escapeXml(post.excerpt)}</summary>`,
        `    <content type="html">${escapeXml(post.body)}</content>`,
        '  </entry>',
      ].join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${FEED_LOCALE}">
  <id>${SITE_URL}/</id>
  <title>${escapeXml(feedTitle)}</title>
  <subtitle>${escapeXml(subtitle)}</subtitle>
  <link href="${SITE_URL}/${FEED_LOCALE}/blog"/>
  <link rel="self" href="${SITE_URL}/feed.xml" type="application/atom+xml"/>
  <updated>${updated}</updated>
  <author>
    <name>${escapeXml(authorName)}</name>
    <uri>${SITE_URL}</uri>
  </author>
${entries}
</feed>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
};
