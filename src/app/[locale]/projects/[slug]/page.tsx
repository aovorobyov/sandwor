import type { Metadata } from 'next';
import { OG_DEFAULT_IMAGE } from '@/shared/lib/seo/ogImage';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProjectPage } from '@/views/ProjectPage';
import { getProjects, getProject } from '@/entities/project';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';

interface Props {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  const project = getProject(slug);
  const t = await getTranslations({ locale, namespace: '' });

  if (!project) {
    return { title: t('projects.title') };
  }

  return {
    title: project.title[locale as 'en' | 'ru'] ?? project.title.en,
    description: project.description[locale as 'en' | 'ru'] ?? project.description.en,
    alternates: buildPageAlternates(`/projects/${project.slug}`),
    openGraph: {
      title: project.title[locale as 'en' | 'ru'] ?? project.title.en,
      description: project.description[locale as 'en' | 'ru'] ?? project.description.en,
      type: 'article',
      images: [OG_DEFAULT_IMAGE],
    },
  };
}

export default function Page({ params: { slug, locale } }: Props) {
  setRequestLocale(locale);
  return <ProjectPage slug={slug} />;
}
