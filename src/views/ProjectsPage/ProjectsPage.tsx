import { getTranslations } from 'next-intl/server';
import { ProjectList } from '@/widgets/ProjectList';
import { getProjects } from '@/entities/project';
import styles from './ProjectsPage.module.css';

export async function ProjectsPage() {
  const [t, projects] = await Promise.all([getTranslations(), Promise.resolve(getProjects())]);

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('projects.title')}</h1>
        <ProjectList projects={projects} />
      </div>
    </main>
  );
}
