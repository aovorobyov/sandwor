import { cache } from 'react';
import { parse } from 'node-html-parser';
import type { Post } from '../model/types';

export const TELEGRAM_CACHE_TAG = 'telegram-posts';

const CHANNEL = process.env.TELEGRAM_CHANNEL_USERNAME ?? '';

interface RawPost {
  id: string;
  textHtml: string;
  textPlain: string;
  datetime: string;
  image: string;
}

// cache() deduplicates calls within a single render pass —
// HomePage and BlogPage can both call getTelegramPosts without double-fetching
const fetchRawPosts = cache(async (): Promise<RawPost[]> => {
  const res = await fetch(`https://t.me/s/${CHANNEL}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NextJS)' },
    next: { tags: [TELEGRAM_CACHE_TAG], revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Telegram channel fetch failed: ${res.status}`);
  }

  const html = await res.text();
  const root = parse(html);

  return root
    .querySelectorAll('.tgme_widget_message_wrap')
    .map((wrap) => {
      const msg = wrap.querySelector('[data-post]');
      const textEl = wrap.querySelector('.tgme_widget_message_text');
      const timeEl = wrap.querySelector('time');

      const dataPost = msg?.getAttribute('data-post') ?? '';
      const id = dataPost.split('/').at(-1) ?? '';
      const datetime = timeEl?.getAttribute('datetime') ?? '';

      // Extract photo from background-image style on the photo wrap element
      const photoWrap = wrap.querySelector('.tgme_widget_message_photo_wrap');
      const bgStyle = photoWrap?.getAttribute('style') ?? '';
      const imageMatch = bgStyle.match(/background-image:\s*url\(['"](.*?)['"]\)/);
      const image = imageMatch ? imageMatch[1] : '';

      return {
        id,
        textHtml: textEl?.innerHTML ?? '',
        textPlain: textEl?.text ?? '',
        datetime,
        image,
      };
    })
    .filter((p): p is RawPost => Boolean(p.id && p.datetime && p.textPlain.trim()));
});

// Regex matching emoji unicode ranges
const EMOJI_RE =
  /[\u{1F300}-\u{1FFFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}]/gu;

// Service messages Telegram adds automatically — not real articles
const SERVICE_PATTERNS = [
  /обновлено фото канала/i,
  /изменено фото канала/i,
  /канал создан/i,
  /channel photo/i,
  /channel was created/i,
];

function isRealArticle(text: string): boolean {
  if (text.length < 100) return false;
  return !SERVICE_PATTERNS.some((re) => re.test(text));
}

function stripEmoji(text: string): string {
  return text
    .replace(EMOJI_RE, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function stripEmojiHtml(html: string): string {
  // Remove <img> emoji elements Telegram inlines, then strip unicode emoji
  return html.replace(/<img[^>]*class="emoji"[^>]*>/gi, '').replace(EMOJI_RE, '');
}

function extractBoldTitle(html: string): { title: string; bodyHtml: string } {
  // Match a leading <b>...</b> block (optionally preceded by whitespace/newline)
  const boldMatch = html.match(/^\s*<b>([\s\S]*?)<\/b>([\s\S]*)$/i);
  if (boldMatch) {
    const title = parse(boldMatch[1]).text.trim();
    // Drop the leading line break that typically follows the title
    const bodyHtml = boldMatch[2].replace(/^\s*<br\s*\/?>\s*/i, '').trim();
    return { title: title.slice(0, 120), bodyHtml };
  }
  return { title: '', bodyHtml: html };
}

function mapToPost(raw: RawPost): Post {
  const cleanHtml = stripEmojiHtml(raw.textHtml);
  const { title: boldTitle, bodyHtml } = extractBoldTitle(cleanHtml);

  const rawText = raw.textPlain.trim();
  const text = stripEmoji(rawText);
  const words = text.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(words / 200));

  const hashtagMatch = text.match(/#([а-яёa-z\w]+)/i);
  const tag = hashtagMatch ? hashtagMatch[1] : 'ТГ Канал';

  // Prefer bold title; fall back to first plain-text line
  const firstLine = text.split('\n')[0].replace(/#\S+/g, '').trim();
  const title = (boldTitle || firstLine).slice(0, 120) || `Post #${raw.id}`;

  const bodyText = boldTitle
    ? text.replace(boldTitle, '').replace(/#\S+/g, '').trim()
    : text.replace(/#\S+/g, '').trim();
  const excerpt = bodyText.slice(0, 150);

  return {
    slug: raw.id,
    title,
    date: raw.datetime.slice(0, 10),
    tag,
    excerpt,
    body: bodyHtml,
    readTime,
    ...(raw.image ? { image: raw.image } : {}),
  };
}

export async function getTelegramPosts(): Promise<Post[]> {
  try {
    const raw = await fetchRawPosts();
    return raw
      .filter((p) => isRealArticle(p.textPlain))
      .map(mapToPost)
      .reverse();
  } catch {
    return [];
  }
}

export async function getTelegramPost(slug: string): Promise<Post | undefined> {
  const posts = await getTelegramPosts();
  return posts.find((p) => p.slug === slug);
}

/**
 * Возвращает похожие посты: сначала с тем же тегом (новейшие первыми), затем добивает
 * самыми свежими из остальных, пока не наберётся `limit`. Текущий пост исключается.
 */
export async function getRelatedPosts(slug: string, limit = 3): Promise<Post[]> {
  const posts = await getTelegramPosts();
  const current = posts.find((p) => p.slug === slug);
  if (!current) {
    return [];
  }

  const others = posts.filter((p) => p.slug !== slug);
  const sameTag = others.filter((p) => p.tag === current.tag);
  const otherTag = others.filter((p) => p.tag !== current.tag);

  return [...sameTag, ...otherTag].slice(0, limit);
}
