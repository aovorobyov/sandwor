'use client';

import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { COURSES_REGISTRY } from './config/registry';
import type { CourseScreen, CourseState } from './types';
import { CourseLanding } from './components/CourseLanding';
import { CourseTopbar } from './components/CourseTopbar';
import { CourseSidebar } from './components/CourseSidebar';
import { LessonContent } from './components/LessonContent';
import { CourseCompletion } from './components/CourseCompletion';
import { clearCourseState, loadCourseState, saveCourseState } from './lib/courseStorage';
import s from './CoursePage.module.css';

const LESSON_QUERY_PARAM = 'lesson';

interface CoursePageProps {
    courseId: string;
}

const DEFAULT_STATE: CourseState = {
    name: '',
    currentLesson: 0,
    completedLessons: [],
};

export const CoursePage: FC<CoursePageProps> = ({ courseId }) => {
    const locale = useLocale();
    const t = useTranslations('course');
    const course = COURSES_REGISTRY[courseId];
    const content = course?.content[locale] || course?.content['en'] || course?.content[Object.keys(course.content)[0]];

    const [screen, setScreen] = useState<CourseScreen>('landing');
    const [courseState, setCourseState] = useState<CourseState>(DEFAULT_STATE);
    const [isMounted, setIsMounted] = useState(false);

    const lessons = content?.lessons || [];

    useEffect(() => {
        const saved = loadCourseState() ?? { ...DEFAULT_STATE };

        // Deep-link `?lesson=N` (1-индексация) — переопределяет позицию, чтобы можно было
        // расшарить конкретный урок. Игнорируется при невалидном/выходящем за границы значении.
        const params = new URLSearchParams(window.location.search);
        const lessonParam = params.get(LESSON_QUERY_PARAM);
        if (lessonParam) {
            const idx = Number(lessonParam) - 1;
            if (Number.isInteger(idx) && idx >= 0 && idx < lessons.length) {
                saved.currentLesson = idx;
                saveCourseState(saved);
            }
        }

        setCourseState(saved);
        if (saved.name) {
            setScreen(saved.completedLessons.length === lessons.length ? 'completion' : 'course');
        }
        setIsMounted(true);
    }, [lessons.length]);

    const updateState = useCallback((next: Partial<CourseState>) => {
        setCourseState((prev) => {
            const merged = { ...prev, ...next };
            saveCourseState(merged);
            return merged;
        });
    }, []);

    const handleStart = (name: string) => {
        updateState({ name });
        setScreen('course');
    };

    const handleSelectLesson = (index: number) => {
        updateState({ currentLesson: index });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCompleteLesson = () => {
        const { currentLesson, completedLessons } = courseState;
        const nextCompleted = completedLessons.includes(currentLesson)
            ? completedLessons
            : [...completedLessons, currentLesson];

        const isLast = currentLesson + 1 >= lessons.length;

        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (isLast) {
            updateState({ completedLessons: nextCompleted });
            setScreen('completion');
        } else {
            updateState({
                completedLessons: nextCompleted,
                currentLesson: currentLesson + 1,
            });
        }
    };

    const handleViewResults = () => {
        setScreen('completion');
    };

    const handleBackToCourse = () => {
        setScreen('course');
    };

    const handleReset = () => {
        if (!window.confirm(t('confirmReset'))) { return; }

        clearCourseState();
        setCourseState(DEFAULT_STATE);
        setScreen('landing');

        const url = new URL(window.location.href);
        url.searchParams.delete(LESSON_QUERY_PARAM);
        window.history.replaceState({}, '', url);
    };

    if (!isMounted || !content) { return null; }

    const isAllCompleted = courseState.completedLessons.length === lessons.length;

    switch (screen) {
        case 'landing':
            return (
                <main className={s.landing}>
                    <CourseLanding
                        content={content}
                        initialName={courseState.name}
                        onStart={handleStart}
                    />
                </main>
            );

        case 'course':
            return (
                <div className={s.courseWrap}>
                    <CourseTopbar
                        courseTitle={content.title}
                        currentLesson={courseState.currentLesson}
                        totalLessons={lessons.length}
                        completedCount={courseState.completedLessons.length}
                        isAllCompleted={isAllCompleted}
                        onViewResults={handleViewResults}
                        onReset={handleReset}
                    />

                    <div className={s.courseBody}>
                        <aside className={s.sidebar}>
                            <CourseSidebar
                                lessons={lessons}
                                currentLesson={courseState.currentLesson}
                                completedLessons={courseState.completedLessons}
                                onSelect={handleSelectLesson}
                            />
                        </aside>

                        <main className={s.content}>
                            <LessonContent
                                key={courseState.currentLesson}
                                lesson={lessons[courseState.currentLesson]}
                                lessonIndex={courseState.currentLesson}
                                totalLessons={lessons.length}
                                isCompleted={courseState.completedLessons.includes(courseState.currentLesson)}
                                onComplete={handleCompleteLesson}
                            />
                        </main>
                    </div>
                </div>
            );

        case 'completion':
            return (
                <main className={s.completion}>
                    <CourseCompletion
                        name={courseState.name}
                        courseTitle={content.title}
                        lessons={lessons}
                        onBackToCourse={handleBackToCourse}
                    />
                </main>
            );
    }
};
