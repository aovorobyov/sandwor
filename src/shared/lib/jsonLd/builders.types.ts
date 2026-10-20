export interface WebSiteInput {
  name: string;
}

export interface BlogPostingInput {
  title: string;
  description: string;
  date: string;
  slug: string;
  locale: string;
  authorName: string;
  image?: string;
}

export interface OrganizationInput {
  description: string;
}

export interface ServiceInput {
  name: string;
  description: string;
  /** Путь страницы без префикса локали: '/services/crm'. */
  path: string;
  locale: string;
  /** Цена «от», ₽. */
  price: number;
}

export interface BreadcrumbInput {
  name: string;
  /** Путь от корня сайта, например '/blog'. */
  path: string;
}
