import type { Post } from '../model/types';
import type { ArticleLocale } from '../model/articles/articles.types';
import { getArticlesForLocale } from '../model/articles';

const DEFAULT_LOCALE: ArticleLocale = 'ru';

/** Приводит произвольную строку локали к поддерживаемой (иначе — дефолт). */
const normalizeLocale = (locale: string): ArticleLocale => {
  return locale === 'en' ? 'en' : 'ru';
};

/** Все статьи (локальный контент), новейшие первыми. */
export const getArticles = async (locale: string = DEFAULT_LOCALE): Promise<Post[]> => {
  return getArticlesForLocale(normalizeLocale(locale));
};

/** Одна статья по slug. */
export const getArticle = async (
  slug: string,
  locale: string = DEFAULT_LOCALE,
): Promise<Post | undefined> => {
  return getArticlesForLocale(normalizeLocale(locale)).find((post) => post.slug === slug);
};

/**
 * Похожие статьи: сначала с тем же тегом (новейшие первыми), затем добираем
 * самыми свежими из остальных, пока не наберётся `limit`. Текущая статья исключается.
 */
export const getRelatedArticles = async (
  slug: string,
  locale: string = DEFAULT_LOCALE,
  limit = 3,
): Promise<Post[]> => {
  const all = getArticlesForLocale(normalizeLocale(locale));
  const current = all.find((post) => post.slug === slug);
  if (!current) {
    return [];
  }

  const others = all.filter((post) => post.slug !== slug);
  const sameTag = others.filter((post) => post.tag === current.tag);
  const otherTag = others.filter((post) => post.tag !== current.tag);

  return [...sameTag, ...otherTag].slice(0, limit);
};
