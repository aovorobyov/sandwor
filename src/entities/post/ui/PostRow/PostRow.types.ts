import type { Post } from '@/entities/post/model/types';

export interface PostRowProps {
  post: Post;
  /** Показывать лид-абзац (список блога и «Из блога» — да, «Читать дальше» — нет). */
  hasExcerpt?: boolean;
  /** Показывать ссылку «Читать →» под текстом. */
  hasReadLink?: boolean;
  /** Крупный вариант заголовка для страницы блога. */
  isLarge?: boolean;
}
