import { getTranslations } from 'next-intl/server';
import { ProjectList } from '@/widgets/ProjectList';
import { MOCK_PROJECTS } from './mocks';
import styles from './ProjectsPage.module.css';

export async function ProjectsPage() {
  const t = await getTranslations();

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('projects.title')}</h1>
        <ProjectList projects={MOCK_PROJECTS} />
      </div>
    </main>
  );
}
