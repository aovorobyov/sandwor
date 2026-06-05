import { SAME_AS, SITE_URL } from './config';
import type {
  BlogPostingInput,
  BreadcrumbInput,
  CourseInput,
  PersonInput,
  ProjectWorkInput,
  WebSiteInput,
} from './builders.types';

export const buildPerson = (input: PersonInput) => {
  const { name, bio } = input;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url: SITE_URL,
    ...(bio ? { description: bio } : {}),
    sameAs: SAME_AS,
  };
};

export const buildWebSite = (input: WebSiteInput) => {
  const { name } = input;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url: SITE_URL,
  };
};

export const buildBlogPosting = (input: BlogPostingInput) => {
  const { title, description, date, slug, locale, authorName, image } = input;

  // localePrefix: 'never' — реальные URL без префикса локали
  const articleUrl = `${SITE_URL}/blog/${slug}`;
  const ogFallback = `${SITE_URL}/api/og?title=${encodeURIComponent(title)}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: date,
    url: articleUrl,
    image: image || ogFallback,
    inLanguage: locale,
    author: {
      '@type': 'Person',
      name: authorName,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  };
};

export const buildProjectWork = (input: ProjectWorkInput) => {
  const { title, description, date, slug, locale, authorName, repoUrl, siteUrl } = input;

  // localePrefix: 'never' — реальные URL без префикса локали
  const projectUrl = `${SITE_URL}/projects/${slug}`;
  const externalLinks = [repoUrl, siteUrl].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    dateCreated: date,
    url: projectUrl,
    inLanguage: locale,
    ...(externalLinks.length > 0 ? { sameAs: externalLinks } : {}),
    author: {
      '@type': 'Person',
      name: authorName,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': projectUrl,
    },
  };
};

export const buildBreadcrumbs = (items: BreadcrumbInput[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
      };
    }),
  };
};

export const buildCourse = (input: CourseInput) => {
  const { title, description, courseId, locale, authorName } = input;

  // localePrefix: 'never' — реальные URL без префикса локали
  const courseUrl = `${SITE_URL}/course/${courseId}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: title,
    description,
    url: courseUrl,
    inLanguage: locale,
    provider: {
      '@type': 'Person',
      name: authorName,
      url: SITE_URL,
    },
  };
};
