import { SAME_AS, SITE_URL } from './config';
import type { BlogPostingInput, CourseInput, PersonInput, WebSiteInput } from './builders.types';

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

  const articleUrl = `${SITE_URL}/${locale}/blog/${slug}`;
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

export const buildCourse = (input: CourseInput) => {
  const { title, description, courseId, locale, authorName } = input;

  const courseUrl = `${SITE_URL}/${locale}/course/${courseId}`;

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
