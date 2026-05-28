import type { CourseContent } from '../../config/CourseConfig.types';

export interface CourseLandingProps {
  content: CourseContent;
  initialName?: string;
  onStart: (name: string) => void;
}
