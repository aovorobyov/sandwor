import { useTranslations } from 'next-intl';
import { Badge } from '@/shared/ui/Badge';
import { Card } from '@/shared/ui/Card';
import type { Project } from '../../model/types';
import styles from './ProjectCard.module.css';

export interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations();

  return (
    <Card>
      <article className={styles.root}>
        <div className={styles.header}>
          <h2 className={styles.title}>{project.title}</h2>
          <span className={styles.year}>{project.year}</span>
        </div>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.footer}>
          <ul className={styles.tags}>
            {project.tags.map((tag) => (
              <li key={tag}>
                <Badge variant="neutral">{tag}</Badge>
              </li>
            ))}
          </ul>
          {project.url !== null && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {t('projects.open')}
            </a>
          )}
        </div>
      </article>
    </Card>
  );
}
