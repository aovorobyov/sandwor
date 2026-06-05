import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProjectsPage } from '@/views/ProjectsPage';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: '' });
  return {
    title: t('projects.title'),
    description: t('projects.subtitle'),
    alternates: buildPageAlternates('/projects'),
    openGraph: { title: t('projects.title'), description: t('projects.subtitle') },
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <ProjectsPage />;
}
