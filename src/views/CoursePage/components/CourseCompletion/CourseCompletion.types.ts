import type { Lesson } from '../../config/CourseConfig.types';

export interface CourseCompletionProps {
    name: string;
    courseTitle: string;
    lessons: Lesson[];
    onBackToCourse: () => void;
}
