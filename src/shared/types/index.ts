/** Generic paginated response wrapper */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
}

/** Common SEO metadata */
export interface SeoMeta {
  title: string;
  description?: string;
  ogImage?: string;
}
