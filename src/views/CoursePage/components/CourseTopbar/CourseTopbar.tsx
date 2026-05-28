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
  onReset,
}) => {
  const t = useTranslations('course');

  const label =
    completedCount > 0
      ? t('lessonProgress', {
          current: currentLesson + 1,
          total: totalLessons,
          done: completedCount,
        })
      : t('lessonOf', { current: currentLesson + 1, total: totalLessons });

  const handleReset = () => {
    onReset();
  };

  const handleViewResults = () => {
    onViewResults();
  };

  return (
    <div className={s.root}>
      <div className={s.inner}>
        <span className={s.logo}>{courseTitle}</span>

        <div className={s.progressWrap}>
          <p className={s.progressLabel}>{label}</p>

          <ProgressBar value={completedCount} max={totalLessons} />
        </div>

        <button type="button" className={s.resetBtn} onClick={handleReset}>
          {t('reset')}
        </button>

        {isAllCompleted && (
          <Button
            type="button"
            variant="primary"
            size="sm"
            className={s.resultsBtn}
            onClick={handleViewResults}
          >
            {t('viewResults')}
          </Button>
        )}
      </div>
    </div>
  );
};
