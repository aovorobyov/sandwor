export interface Post {
  slug: string;
  title: string;
  date: string; // ISO: '2025-04-10'
  tag: string;
  excerpt: string; // короткая подводка для карточки (≈150 символов)
  body: string; // HTML
  readTime: number; // минуты
  image?: string; // cover image URL
  description?: string; // мета-описание для SEO; если нет — используется excerpt
}
