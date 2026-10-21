import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ConsentDocPage, type ConsentSection } from '@/views/PrivacyPage';
import { CONSENT_DOCS, consentPath, isConsentDoc } from '@/shared/config/legal';
import { toMetaDescription } from '@/shared/lib/seo/metaDescription';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';
import { buildSocialMeta } from '@/shared/lib/seo/buildSocialMeta';
import { buildPageOgImage } from '@/shared/lib/seo/ogImage';

interface Props {
  params: { locale: string; doc: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return CONSENT_DOCS.map((doc) => ({ doc }));
}

export async function generateMetadata({ params: { locale, doc } }: Props): Promise<Metadata> {
  if (!isConsentDoc(doc)) return {};

  const t = await getTranslations({ locale, namespace: '' });
  const section = (t.raw('consent.sections') as ConsentSection[]).find((item) => item.id === doc);
  if (!section) return {};

  const path = consentPath(doc);
  const description = toMetaDescription(section.summary);

  return {
    title: section.title,
    description,
    alternates: buildPageAlternates(locale, path),
    ...buildSocialMeta({
      locale,
      path,
      title: section.title,
      description,
      image: buildPageOgImage({ locale, tag: t('consent.breadcrumb'), title: section.title }),
    }),
  };
}

export default function Page({ params: { locale, doc } }: Props) {
  if (!isConsentDoc(doc)) notFound();

  setRequestLocale(locale);
  return <ConsentDocPage id={doc} />;
}
