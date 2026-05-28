import type { FC } from 'react';
import { ProjectCard } from '@/entities/project';
import type { ProjectListProps } from './ProjectList.types';
import s from './ProjectList.module.css';

export const ProjectList: FC<ProjectListProps> = (props) => {
  const { projects } = props;

  if (projects.length === 0) {
    return null;
  }

  return (
    <ul className={s.grid}>
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
};
