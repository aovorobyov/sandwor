import { getTranslations } from 'next-intl/server';
import { getPosts } from '@/entities/post/api/posts';
import { buildLocaleUrl } from '@/shared/lib/seo/buildLocaleUrl';
import { SITE_URL } from '@/shared/config/site';

/** Статьи блога — на русском, поэтому фид одноязычный. */
const FEED_LOCALE = 'ru';

/** Раздел блога — источник ссылок фида. */
const BLOG_PATH = '/blog';

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
    getPosts(),
    getTranslations({ locale: FEED_LOCALE, namespace: '' }),
  ]);

  const authorName = t('blog-page.author');
  const subtitle = t('blog-page.lead');
  const feedTitle = `${t('brand.name')} — ${t('blog-page.title')}`;

  const updated = posts.length > 0 ? toIsoDateTime(posts[0].date) : new Date().toISOString();

  const entries = posts
    .map((post) => {
      const url = buildLocaleUrl(FEED_LOCALE, `${BLOG_PATH}/${post.slug}`);
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
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${FEED_LOCALE}" xml:base="${SITE_URL}/">
  <id>${SITE_URL}/</id>
  <title>${escapeXml(feedTitle)}</title>
  <subtitle>${escapeXml(subtitle)}</subtitle>
  <link href="${buildLocaleUrl(FEED_LOCALE, BLOG_PATH)}"/>
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
