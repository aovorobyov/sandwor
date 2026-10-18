import { CONTACT_EMAIL } from '@/shared/config/contacts';
import { buildLocaleUrl } from '@/shared/lib/seo/buildLocaleUrl';
import { SAME_AS, SITE_URL } from './config';
import type {
  BlogPostingInput,
  BreadcrumbInput,
  OrganizationInput,
  PersonInput,
  ServiceInput,
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

  const articleUrl = buildLocaleUrl(locale, `/blog/${slug}`);
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

/** Студия как организация: ProfessionalService с каналами связи. */
export const buildOrganization = (input: OrganizationInput) => {
  const { description } = input;

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'sandwor',
    url: SITE_URL,
    description,
    email: CONTACT_EMAIL,
    areaServed: 'RU',
    sameAs: SAME_AS,
  };
};

/** Направление услуг: название, описание, цена «от» в рублях. */
export const buildService = (input: ServiceInput) => {
  const { name, description, path, locale, price } = input;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: buildLocaleUrl(locale, path),
    provider: { '@type': 'ProfessionalService', name: 'sandwor', url: SITE_URL },
    areaServed: 'RU',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'RUB',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: price,
        priceCurrency: 'RUB',
      },
    },
  };
};
