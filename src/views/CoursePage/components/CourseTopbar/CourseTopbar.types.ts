export interface CourseTopbarProps {
    courseTitle: string;
    currentLesson: number;
    totalLessons: number;
    completedCount: number;
    isAllCompleted: boolean;
    onViewResults: () => void;
    onReset: () => void;
}
