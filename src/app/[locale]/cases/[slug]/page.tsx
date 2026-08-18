import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CasePage } from '@/views/CasePage';
import { CASE_SLUGS } from '@/entities/case';
import type { CaseDetail, CaseItem } from '@/entities/case/model/types';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';
import { buildSocialMeta } from '@/shared/lib/seo/buildSocialMeta';
import { buildContentOgImage } from '@/shared/lib/seo/ogImage';

interface Props {
  params: { locale: string; slug: string };
}

/** Сколько пунктов состава работ уходит в моно-строку обложки. */
const OG_SCOPE_LIMIT = 2;

export function generateStaticParams() {
  return CASE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: '' });
  const items = t.raw('cases.items') as CaseItem[];
  const details = t.raw('cases.details') as Record<string, CaseDetail>;

  const item = items.find((i) => i.slug === slug);
  const detail = details[slug];

  if (!item || !detail) {
    return { title: t('cases.title') };
  }

  return {
    title: item.title,
    description: detail.lead,
    alternates: buildPageAlternates(locale, `/cases/${slug}`),
    ...buildSocialMeta({
      title: item.title,
      description: detail.lead,
      type: 'article',
      image: buildContentOgImage({
        locale,
        tag: item.type,
        title: item.title,
        meta: item.scope.slice(0, OG_SCOPE_LIMIT).join(' · '),
      }),
    }),
  };
}

export default function Page({ params: { slug, locale } }: Props) {
  setRequestLocale(locale);
  return <CasePage slug={slug} />;
}
