import { ProjectCard } from '@/entities/project';
import type { Project } from '@/entities/project';
import styles from './ProjectList.module.css';

export interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <ul className={styles.grid}>
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
