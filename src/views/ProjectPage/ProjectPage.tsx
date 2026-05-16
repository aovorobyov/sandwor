import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, getLocale } from 'next-intl/server';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { getProject } from '@/entities/project';
import styles from './ProjectPage.module.css';

interface ProjectPageProps {
  slug: string;
}

export async function ProjectPage({ slug }: ProjectPageProps) {
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations();
  const locale = await getLocale();

  const formattedDate = new Date(`${project.date}-01`).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
  });

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <Link href="/projects" className={styles.back}>
          ← {t('nav.projects')}
        </Link>

        <article>
          {/* Hero: image + meta side-by-side on desktop */}
          <div className={styles.hero}>
            {project.image && (
              <div className={styles.imageWrap}>
                <Image
                  src={project.image}
                  alt={project.title[locale as 'en' | 'ru'] ?? project.title.en}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.image}
                  priority
                />
              </div>
            )}

            <div className={styles.sidebar}>
              <time className={styles.date} dateTime={project.date}>
                {formattedDate}
              </time>
              <h1 className={styles.title}>{project.title[locale as 'en' | 'ru'] ?? project.title.en}</h1>
              <p className={styles.description}>{project.description[locale as 'en' | 'ru'] ?? project.description.en}</p>

              <ul className={styles.tags}>
                {project.tags.map((tag) => (
                  <li key={tag}>
                    <Badge variant="neutral">{tag}</Badge>
                  </li>
                ))}
              </ul>

              <div className={styles.links}>
                {project.repoUrl && (
                  <Button
                    href={project.repoUrl}
                    variant="secondary"
                    size="sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('projects.repo')}
                  </Button>
                )}
                {project.siteUrl && (
                  <Button
                    href={project.siteUrl}
                    variant="primary"
                    size="sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('projects.site')}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Body */}
          {project.body && (
            <div className={styles.body} dangerouslySetInnerHTML={{ __html: project.body[locale as 'en' | 'ru'] ?? project.body.en }} />
          )}
        </article>
      </div>
    </main>
  );
}
