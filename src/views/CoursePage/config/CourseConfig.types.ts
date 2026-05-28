export interface Lesson {
  title: string;
  shortTitle: string;
  theory: string;
  chatUser: string;
  chatAI: string;
  taskTitle: string;
  taskText: string;
  taskPlaceholder: string;
  encouragement: string;
  skill: string;
  promptTemplate: string;
}

export interface CourseContent {
  title: string;
  tagline: string;
  durationBadge: string;
  benefits: string[];
  lessons: Lesson[];
}

export interface CourseConfig {
  id: string;
  content: Record<string, CourseContent>;
}
