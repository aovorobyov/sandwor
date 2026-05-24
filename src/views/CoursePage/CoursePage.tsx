'use client';

import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { COURSES_REGISTRY } from './config/registry';
import type { CourseScreen, CourseState } from './types';
import { CourseLanding } from './components/CourseLanding';
import { CourseTopbar } from './components/CourseTopbar';
import { CourseSidebar } from './components/CourseSidebar';
import { LessonContent } from './components/LessonContent';
import { CourseCompletion } from './components/CourseCompletion';
import s from './CoursePage.module.css';

interface CoursePageProps {
    courseId: string;
}

const STORAGE_KEY = 'ai-course-v1';

const DEFAULT_STATE: CourseState = {
    name: '',
    currentLesson: 0,
    completedLessons: [],
};

const loadState = (): CourseState => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) { return { ...DEFAULT_STATE, ...JSON.parse(raw) }; }
    } catch {}
    return DEFAULT_STATE;
};

const saveState = (state: CourseState) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
};

export const CoursePage: FC<CoursePageProps> = ({ courseId }) => {
    const locale = useLocale();
    const course = COURSES_REGISTRY[courseId];
    const content = course?.content[locale] || course?.content['en'] || course?.content[Object.keys(course.content)[0]];

    const [screen, setScreen] = useState<CourseScreen>('landing');
    const [courseState, setCourseState] = useState<CourseState>(DEFAULT_STATE);
    const [isMounted, setIsMounted] = useState(false);

    const lessons = content?.lessons || [];

    useEffect(() => {
        const saved = loadState();
        setCourseState(saved);
        if (saved.name) {
            setScreen(saved.completedLessons.length === lessons.length ? 'completion' : 'course');
        }
        setIsMounted(true);
    }, [lessons.length]);

    const updateState = useCallback((next: Partial<CourseState>) => {
        setCourseState((prev) => {
            const merged = { ...prev, ...next };
            saveState(merged);
            return merged;
        });
    }, []);

    const handleStart = (name: string) => {
        updateState({ name });
        setScreen('course');
    };

    const handleSelectLesson = (index: number) => {
        updateState({ currentLesson: index });
    };

    const handleCompleteLesson = () => {
        const { currentLesson, completedLessons } = courseState;
        const nextCompleted = completedLessons.includes(currentLesson)
            ? completedLessons
            : [...completedLessons, currentLesson];

        const isLast = currentLesson + 1 >= lessons.length;

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
