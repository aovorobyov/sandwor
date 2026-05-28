import { getLocale } from 'next-intl/server';
import { COURSES_REGISTRY } from '@/views/CoursePage/config/registry';
import { CourseBannerView } from './CourseBannerView';

const COURSE_ID = 'ai-basics';

export const CourseBanner = async () => {
  const locale = await getLocale();

  const course = COURSES_REGISTRY[COURSE_ID];
  const content = course.content[locale] || course.content['en'];
  const shortTitles = content.lessons.map((lesson) => lesson.shortTitle);

  return (
    <CourseBannerView
      courseId={COURSE_ID}
      courseTitle={content.title}
      tagline={content.tagline}
      shortTitles={shortTitles}
    />
  );
};
