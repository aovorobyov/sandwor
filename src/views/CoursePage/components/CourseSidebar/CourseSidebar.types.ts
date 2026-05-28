import type { Lesson } from '../../config/CourseConfig.types';

export interface CourseSidebarProps {
  lessons: Lesson[];
  currentLesson: number;
  completedLessons: number[];
  onSelect: (index: number) => void;
}
