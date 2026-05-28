import type { CourseState } from '../types';

export const COURSE_STORAGE_KEY = 'ai-course-v1';

/** Type-guard, защищающий от мусора в localStorage между версиями схемы. */
const isCourseStateShape = (value: unknown): value is CourseState => {
    if (!value || typeof value !== 'object') { return false; }

    const candidate = value as Partial<CourseState>;
    return typeof candidate.name === 'string'
        && typeof candidate.currentLesson === 'number'
        && Array.isArray(candidate.completedLessons);
};

export const loadCourseState = (): CourseState | null => {
    try {
        const raw = localStorage.getItem(COURSE_STORAGE_KEY);
        if (!raw) { return null; }

        const parsed = JSON.parse(raw);
        if (isCourseStateShape(parsed)) { return parsed; }
    } catch {}

    return null;
};

export const saveCourseState = (state: CourseState) => {
    try {
        localStorage.setItem(COURSE_STORAGE_KEY, JSON.stringify(state));
    } catch {}
};

export const clearCourseState = () => {
    try {
        localStorage.removeItem(COURSE_STORAGE_KEY);
    } catch {}
};
