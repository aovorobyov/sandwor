import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { CoursePage } from '@/views/CoursePage';
import { COURSES_REGISTRY } from '@/views/CoursePage/config/registry';
import { JsonLd, buildCourse } from '@/shared/lib/jsonLd';
import { buildPageAlternates } from '@/shared/lib/seo/buildPageAlternates';
import { buildSocialMeta } from '@/shared/lib/seo/buildSocialMeta';
import { buildPageOgImage } from '@/shared/lib/seo/ogImage';

interface Props {
  params: { courseId: string; locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseId, locale } = params;
  const course = COURSES_REGISTRY[courseId];
  if (!course) {
    return {};
  }

  const content = course.content[locale] || course.content['en'];

  if (!content) {
    return { alternates: buildPageAlternates(locale, `/course/${courseId}`) };
  }

  const t = await getTranslations({ locale, namespace: '' });

  return {
    title: content.title,
    description: content.tagline,
    alternates: buildPageAlternates(locale, `/course/${courseId}`),
    ...buildSocialMeta({
      title: content.title,
      description: content.tagline,
      image: buildPageOgImage({
        locale,
        tag: t('nav.course'),
        title: content.title,
        lead: content.tagline,
      }),
    }),
  };
}

export default async function Page({ params }: Props) {
  const { courseId, locale } = params;
  const course = COURSES_REGISTRY[courseId];
  if (!course) {
    notFound();
  }

  const content = course.content[locale] || course.content['en'];
  const t = await getTranslations({ locale, namespace: '' });

  const courseData = buildCourse({
    title: content.title,
    description: content.tagline,
    courseId,
    locale,
    authorName: t('home.name'),
  });

  return (
    <>
      <JsonLd data={courseData} />

      <CoursePage courseId={courseId} />
    </>
  );
}
