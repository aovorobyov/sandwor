import { getTranslations } from 'next-intl/server';
import { ProjectList } from '@/widgets/ProjectList';
import { getProjects } from '@/entities/project';
import s from './ProjectsPage.module.css';

export const ProjectsPage = async () => {
  const [t, projects] = await Promise.all([getTranslations(), Promise.resolve(getProjects())]);

  return (
    <main className={s.root}>
      <div className={s.container}>
        <h1 className={s.title}>{t('projects.title')}</h1>

        <ProjectList projects={projects} />
      </div>
    </main>
  );
};
