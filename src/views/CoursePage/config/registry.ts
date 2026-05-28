import { aiBasicsCourse } from './courses/ai-basics';
import type { CourseConfig } from './CourseConfig.types';

export const COURSES_REGISTRY: Record<string, CourseConfig> = {
  [aiBasicsCourse.id]: aiBasicsCourse,
};
