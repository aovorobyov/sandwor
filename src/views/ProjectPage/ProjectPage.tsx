import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, getLocale } from 'next-intl/server';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { getProject } from '@/entities/project';
import { JsonLd, buildBreadcrumbs, buildProjectWork } from '@/shared/lib/jsonLd';
import type { ProjectPageProps } from './ProjectPage.types';
import s from './ProjectPage.module.css';

export const ProjectPage = async (props: ProjectPageProps) => {
  const { slug } = props;
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations();
  const locale = await getLocale();

  /** Формат: «апрель 2025» — без дня */
  const formattedDate = new Date(`${project.date}-01`).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
  });

  const title = project.title[locale as 'en' | 'ru'] ?? project.title.en;

  const projectWorkData = buildProjectWork({
    title,
    description: project.description[locale as 'en' | 'ru'] ?? project.description.en,
    date: project.date,
    slug: project.slug,
    locale,
    authorName: t('home.name'),
    repoUrl: project.repoUrl,
    siteUrl: project.siteUrl,
  });

  const breadcrumbsData = buildBreadcrumbs([
    { name: t('nav.projects'), path: '/projects' },
    { name: title, path: `/projects/${project.slug}` },
  ]);

  return (
    <main className={s.root}>
      <JsonLd data={projectWorkData} />

      <JsonLd data={breadcrumbsData} />

      <div className={s.container}>
        <Link href="/projects" className={s.back}>
          ← {t('nav.projects')}
        </Link>

        <article>
          <div className={s.hero}>
            {project.image && (
              <div className={s.imageWrap}>
                <Image
                  src={project.image}
                  alt={project.title[locale as 'en' | 'ru'] ?? project.title.en}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={s.image}
                  priority
                />
              </div>
            )}

            <div className={s.sidebar}>
              <time className={s.date} dateTime={project.date}>
                {formattedDate}
              </time>

              <h1 className={s.title}>
                {project.title[locale as 'en' | 'ru'] ?? project.title.en}
              </h1>

              <p className={s.description}>
                {project.description[locale as 'en' | 'ru'] ?? project.description.en}
              </p>

              <ul className={s.tags}>
                {project.tags.map((tag) => (
                  <li key={tag} className={s.tagItem}>
                    <Badge variant="neutral">{tag}</Badge>
                  </li>
                ))}
              </ul>

              <div className={s.links}>
                {project.repoUrl && (
                  <span className={s.linkItem}>
                    <Button
                      href={project.repoUrl}
                      variant="secondary"
                      size="sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('projects.repo')}
                    </Button>
                  </span>
                )}

                {project.siteUrl && (
                  <span className={s.linkItem}>
                    <Button
                      href={project.siteUrl}
                      variant="primary"
                      size="sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('projects.site')}
                    </Button>
                  </span>
                )}
              </div>
            </div>
          </div>

          {project.body && (
            <div
              className={s.body}
              dangerouslySetInnerHTML={{
                __html: project.body[locale as 'en' | 'ru'] ?? project.body.en,
              }}
            />
          )}
        </article>
      </div>
    </main>
  );
};
