import { getArticles, getArticle, getRelatedArticles } from './articles';

/**
 * Единая точка входа за постами блога. Сейчас активен локальный источник статей.
 *
 * Telegram-посты временно отключены (движок `./telegram` сохранён и рабочий).
 * Чтобы вернуть Telegram — переключить делегирование ниже на `getTelegramPosts`
 * и т.п. или объединить оба источника.
 */
export const getPosts = getArticles;
export const getPost = getArticle;
export const getRelatedPosts = getRelatedArticles;
