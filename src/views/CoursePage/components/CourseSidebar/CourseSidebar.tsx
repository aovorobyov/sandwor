'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/cn';
import type { CourseSidebarProps } from './CourseSidebar.types';
import s from './CourseSidebar.module.css';

export const CourseSidebar: FC<CourseSidebarProps> = ({
  lessons,
  currentLesson,
  completedLessons,
  onSelect,
}) => {
  const t = useTranslations('course');

  const isUnlocked = (index: number): boolean => {
    if (index === 0) {
      return true;
    }
    return completedLessons.includes(index - 1) || completedLessons.includes(index);
  };

  return (
    <nav aria-label={t('lessons')}>
      <p className={s.heading}>{t('lessons')}</p>

      <ul className={s.list}>
        {lessons.map((lesson, index) => {
          const isDone = completedLessons.includes(index);
          const isActive = index === currentLesson;
          const isLocked = !isUnlocked(index);

          return (
            <li key={index} className={s.item}>
              <button
                type="button"
                disabled={isLocked}
                onClick={() => !isLocked && onSelect(index)}
                aria-current={isActive ? 'step' : undefined}
                className={cn(
                  s.btn,
                  isActive && s.btnActive,
                  isDone && s.btnDone,
                  isLocked && s.btnLocked,
                )}
              >
                <span className={cn(s.icon, isActive && s.iconActive, isDone && s.iconDone)}>
                  {isDone ? '✓' : index + 1}
                </span>

                <span className={s.label}>{lesson.shortTitle}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
