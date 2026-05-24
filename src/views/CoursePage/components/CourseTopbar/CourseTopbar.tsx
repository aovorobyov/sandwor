'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/Button';
import { ProgressBar } from '@/shared/ui/ProgressBar';
import type { CourseTopbarProps } from './CourseTopbar.types';
import s from './CourseTopbar.module.css';

export const CourseTopbar: FC<CourseTopbarProps> = ({
    courseTitle,
    currentLesson,
    totalLessons,
    completedCount,
    isAllCompleted,
    onViewResults,
}) => {
    const t = useTranslations('course');

    const label = completedCount > 0
        ? t('lessonProgress', { current: currentLesson + 1, total: totalLessons, done: completedCount })
        : t('lessonOf', { current: currentLesson + 1, total: totalLessons });

    return (
        <div className={s.root}>
            <div className={s.inner}>
                <span className={s.logo}>{courseTitle}</span>

                <div className={s.progressWrap}>
                    <p className={s.progressLabel}>{label}</p>

                    <ProgressBar value={completedCount} max={totalLessons} />
                </div>

                {isAllCompleted && (
                    <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        className={s.resultsBtn}
                        onClick={onViewResults}
                    >
                        {t('viewResults')}
                    </Button>
                )}
            </div>
        </div>
    );
};
