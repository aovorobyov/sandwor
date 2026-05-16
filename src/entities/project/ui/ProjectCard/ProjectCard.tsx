import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Badge } from '@/shared/ui/Badge';
import { Card } from '@/shared/ui/Card';
import type { Project } from '../../model/types';
import styles from './ProjectCard.module.css';

export interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations();
  const locale = useLocale();

  // Format as "April 2025" / "апрель 2025" (no day)
  const formattedDate = new Date(`${project.date}-01`).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
  });

  return (
    <Card href={`/projects/${project.slug}`}>
      <article>
        {project.image && (
          <div className={styles.imageWrap}>
            <Image
              src={project.image}
              alt={project.title[locale as 'en' | 'ru'] ?? project.title.en}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className={styles.image}
            />
          </div>
        )}
        <div className={styles.meta}>
          <time className={styles.date} dateTime={project.date}>
            {formattedDate}
          </time>
        </div>
        <h2 className={styles.title}>{project.title[locale as 'en' | 'ru'] ?? project.title.en}</h2>
        <p className={styles.description}>{project.description[locale as 'en' | 'ru'] ?? project.description.en}</p>
        <div className={styles.footer}>
          <ul className={styles.tags}>
            {project.tags.map((tag) => (
              <li key={tag}>
                <Badge variant="neutral">{tag}</Badge>
              </li>
            ))}
          </ul>
          <span className={styles.readMore}>{t('projects.view')}</span>
        </div>
      </article>
    </Card>
  );
}
