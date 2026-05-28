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
