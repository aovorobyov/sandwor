import { CONTACT_EMAIL } from '@/shared/config/contacts';
import { buildLocaleUrl } from '@/shared/lib/seo/buildLocaleUrl';
import { SAME_AS, SITE_URL } from './config';
import type {
  BlogPostingInput,
  BreadcrumbInput,
  OrganizationInput,
  ServiceInput,
  WebSiteInput,
} from './builders.types';

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
    // Картинки статей лежат у нас (/blog/…) — в разметке нужен абсолютный адрес.
    image: image ? (image.startsWith('/') ? `${SITE_URL}${image}` : image) : ogFallback,
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
        // Главная — без хвостового слэша, как в canonical и hreflang.
        item: `${SITE_URL}${item.path === '/' ? '' : item.path}`,
      };
    }),
  };
};

/** Студия как организация с каналами связи (без адреса — поэтому не LocalBusiness). */
export const buildOrganization = (input: OrganizationInput) => {
  const { description } = input;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
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
    provider: { '@type': 'Organization', name: 'sandwor', url: SITE_URL },
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

/** FAQ: вопросы и ответы для FAQPage (Яндекс и Google показывают их в выдаче). */
export const buildFaqPage = (items: { question: string; answer: string }[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
};
