import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CoursePage } from '@/views/CoursePage';
import { COURSES_REGISTRY } from '@/views/CoursePage/config/registry';

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

export default function Page({ params }: Props) {
    const { courseId } = params;
    if (!COURSES_REGISTRY[courseId]) { notFound(); }

    return <CoursePage courseId={courseId} />;
}
