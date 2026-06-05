import type { Note } from '@/entities/note';
import type { Post } from '@/entities/post';
import type { Project } from '@/entities/project';

export interface TimelinePostItem {
  type: 'post';
  post: Post;
}

export interface TimelineProjectItem {
  type: 'project';
  project: Project;
}

export interface TimelineReleaseItem {
  type: 'release';
  /** Релизы записи, новейший первым; одиночный релиз — массив из одного элемента. */
  notes: Note[];
}

export type TimelineItem = TimelinePostItem | TimelineProjectItem | TimelineReleaseItem;

export interface TimelineProps {
  items: TimelineItem[];
}

export interface BuildTimelineItemsInput {
  posts: Post[];
  projects: Project[];
  releases: Note[];
}
