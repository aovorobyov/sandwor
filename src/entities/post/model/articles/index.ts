import type { Post } from '../types';
import type { ArticleDraft, ArticleLocale } from './articles.types';
import { priceCafeWebsite } from './price-cafe-website';
import { tildaVsCustom } from './tilda-vs-custom';
import { choosingWebDeveloper } from './choosing-web-developer';

const WORDS_PER_MINUTE = 200;

/** Считает время чтения по объёму текста тела статьи (теги вырезаются). */
const calcReadTime = (html: string): number => {
  const plain = html.replace(/<[^>]+>/g, ' ');
  const words = plain.split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
};

/** Разворачивает черновик в готовый `Post` под конкретную локаль. */
const toPost = (draft: ArticleDraft, locale: ArticleLocale): Post => {
  const { slug, date, image, translations } = draft;
  const content = translations[locale];

  return { slug, date, image, ...content, readTime: calcReadTime(content.body) };
};

/** Новые статьи добавляются сюда — по файлу на статью в этой же директории. */
const DRAFTS: ArticleDraft[] = [priceCafeWebsite, tildaVsCustom, choosingWebDeveloper];

/** Все статьи под локаль, новейшие первыми. */
export const getArticlesForLocale = (locale: ArticleLocale): Post[] => {
  return DRAFTS.map((draft) => toPost(draft, locale)).sort((a, b) => {
    return b.date.localeCompare(a.date);
  });
};
