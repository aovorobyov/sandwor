import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { CoursePage } from '@/views/CoursePage';
import { COURSES_REGISTRY } from '@/views/CoursePage/config/registry';
import { JsonLd, buildCourse } from '@/shared/lib/jsonLd';

interface Props {
    params: { courseId: string; locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { courseId, locale } = params;
    const course = COURSES_REGISTRY[courseId];
    if (!course) { return {}; }

    const content = course.content[locale] || course.content['en'];
    return {
        title: content?.title,
        description: content?.tagline,
    };
}

export default async function Page({ params }: Props) {
    const { courseId, locale } = params;
    const course = COURSES_REGISTRY[courseId];
    if (!course) { notFound(); }

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
