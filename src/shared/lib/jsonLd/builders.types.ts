export interface PersonInput {
  name: string;
  bio?: string;
}

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

export interface CourseInput {
  title: string;
  description: string;
  courseId: string;
  locale: string;
  authorName: string;
}

export interface ProjectWorkInput {
  title: string;
  description: string;
  /** ISO месяц-год: '2025-04'. */
  date: string;
  slug: string;
  locale: string;
  authorName: string;
  repoUrl?: string | null;
  siteUrl?: string | null;
}

export interface BreadcrumbInput {
  name: string;
  /** Путь от корня сайта, например '/blog'. */
  path: string;
}
