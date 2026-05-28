export type CourseScreen = 'landing' | 'course' | 'completion';

export interface CourseState {
  name: string;
  currentLesson: number;
  completedLessons: number[];
}
