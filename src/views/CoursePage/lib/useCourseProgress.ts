'use client';

import { useEffect, useState } from 'react';
import type { CourseState } from '../types';
import { loadCourseState } from './courseStorage';

/**
 * Возвращает прогресс курса из localStorage. До гидратации (и при SSR) — null,
 * чтобы UI стартовал в дефолтном состоянии без mismatch.
 */
export const useCourseProgress = (): CourseState | null => {
  const [state, setState] = useState<CourseState | null>(null);

  useEffect(() => {
    setState(loadCourseState());
  }, []);

  return state;
};
