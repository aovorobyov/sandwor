'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/cn';
import { useCourseProgress } from '@/views/CoursePage';
import type { CourseBannerViewProps } from './CourseBannerView.types';
import s from './CourseBanner.module.css';

export const CourseBannerView: FC<CourseBannerViewProps> = (props) => {
    const { courseId, courseTitle, tagline, shortTitles } = props;
    const t = useTranslations('home');
    const progress = useCourseProgress();

    const completedSet = new Set(progress?.completedLessons || []);
    const completedCount = completedSet.size;
    const totalLessons = shortTitles.length;
    const hasProgress = completedCount > 0;
    const isCompleted = totalLessons > 0 && completedCount === totalLessons;

    const badge = hasProgress ? t('course-continue-badge') : t('course-badge');

    const cta = isCompleted
        ? t('course-results-cta')
        : hasProgress
            ? t('course-continue-cta')
            : t('course-cta');

    return (
        <div className={s.root}>
            <div className={s.left}>
                <span className={s.badge}>{badge}</span>

                <h2 className={s.title}>{courseTitle}</h2>

                <p className={s.tagline}>{tagline}</p>

                {hasProgress && !isCompleted && (
                    <p className={s.progress}>
                        {t('course-progress', { done: completedCount, total: totalLessons })}
                    </p>
                )}

                <Link href={`/course/${courseId}`} className={s.cta}>
                    {cta}
                </Link>
            </div>

            <div className={s.dots} aria-hidden="true">
                {shortTitles.map((shortTitle, i) => {
                    const isDone = completedSet.has(i);

                    return (
                        <div key={i} className={cn(s.dot, isDone && s.dotDone)}>
                            <span className={s.dotNum}>{isDone ? '✓' : i + 1}</span>

                            <span className={s.dotLabel}>{shortTitle}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
