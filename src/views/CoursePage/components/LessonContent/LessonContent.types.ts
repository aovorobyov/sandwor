import type { Lesson } from '../../config/CourseConfig.types';

export interface LessonContentProps {
    lesson: Lesson;
    lessonIndex: number;
    totalLessons: number;
    isCompleted: boolean;
    onComplete: () => void;
}
