/** Локали, на которых доступны статьи. */
export type ArticleLocale = 'ru' | 'en';

/**
 * Локализуемая часть статьи. Всё, что зависит от языка, живёт здесь;
 * локаль-независимые поля (slug, дата, обложка) — на уровне `ArticleDraft`.
 */
export interface ArticleContent {
  title: string;
  tag: string;
  excerpt: string; // короткая подводка для карточки (≈150 символов)
  description: string; // мета-описание для SEO
  body: string; // HTML
}

/**
 * Черновик статьи: локаль-независимые поля + переводы по локалям.
 * `readTime` не хранится — считается автоматически из объёма тела в `index.ts`,
 * отдельно под каждую локаль.
 */
export interface ArticleDraft {
  slug: string;
  date: string; // ISO: '2026-04-10'
  image?: string; // cover image URL
  translations: Record<ArticleLocale, ArticleContent>;
}
