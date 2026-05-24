import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { COURSES_REGISTRY } from '@/views/CoursePage/config/registry';
import s from './CourseBanner.module.css';

const COURSE_ID = 'ai-basics';

export const CourseBanner = async () => {
    const [t, locale] = await Promise.all([
        getTranslations('home'),
        getLocale(),
    ]);

    const course = COURSES_REGISTRY[COURSE_ID];
    const content = course.content[locale] || course.content['en'];

    return (
        <div className={s.root}>
            <div className={s.left}>
                <span className={s.badge}>{t('course-badge')}</span>

                <h2 className={s.title}>{content.title}</h2>

                <p className={s.tagline}>{content.tagline}</p>

                <Link href={`/course/${COURSE_ID}`} className={s.cta}>
                    {t('course-cta')}
                </Link>
            </div>

            <div className={s.dots} aria-hidden="true">
                {content.lessons.map((lesson, i) => (
                    <div key={i} className={s.dot}>
                        <span className={s.dotNum}>{i + 1}</span>
                        <span className={s.dotLabel}>{lesson.shortTitle}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
