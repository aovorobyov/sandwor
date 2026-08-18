/** Описание OG-картинки в формате, который ожидает `Metadata.openGraph.images`. */
export interface OgImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

/** Параметры контентной обложки (статья блога, кейс). */
export interface ContentOgImageOptions {
  title: string;
  /** Надзаголовок: тег статьи или тип кейса. */
  tag?: string;
  /** Моно-подпись в подвале: дата, время чтения, состав работ. */
  meta?: string;
  locale: string;
}

/** Параметры обложки раздела: заголовок страницы и подводка. */
export interface PageOgImageOptions {
  title: string;
  tag?: string;
  lead?: string;
  locale: string;
}
