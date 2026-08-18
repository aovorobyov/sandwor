import type { OgImage } from './ogImage.types';

/** Тип OG-объекта: обычная страница или материал (статья, кейс, проект). */
export type SocialMetaType = 'website' | 'article';

/** Параметры сборки соцсетевых блоков метаданных страницы. */
export interface SocialMetaOptions {
  title: string;
  description: string;
  image: OgImage;
  type?: SocialMetaType;
  /** ISO-дата публикации — только для `type: 'article'`. */
  publishedTime?: string;
}
