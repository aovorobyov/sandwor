import type { FC } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Badge } from '@/shared/ui/Badge';
import { Card } from '@/shared/ui/Card';
import type { ProjectCardProps } from './ProjectCard.types';
import s from './ProjectCard.module.css';

export const ProjectCard: FC<ProjectCardProps> = (props) => {
    const { project } = props;
    const t = useTranslations();
    const locale = useLocale();

    /** Формат: «апрель 2025» — без дня */
    const formattedDate = new Date(`${project.date}-01`).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
    });

    return (
        <Card href={`/projects/${project.slug}`}>
            <article>
                {project.image && (
                    <div className={s.imageWrap}>
                        <Image
                            src={project.image}
                            alt={project.title[locale as 'en' | 'ru'] ?? project.title.en}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className={s.image}
                        />
                    </div>
                )}

                <div className={s.meta}>
                    <time className={s.date} dateTime={project.date}>
                        {formattedDate}
                    </time>
                </div>

                <h2 className={s.title}>{project.title[locale as 'en' | 'ru'] ?? project.title.en}</h2>

                <p className={s.description}>{project.description[locale as 'en' | 'ru'] ?? project.description.en}</p>

                <div className={s.footer}>
                    <ul className={s.tags}>
                        {project.tags.map((tag) => (
                            <li key={tag} className={s.tagItem}>
                                <Badge variant="neutral">{tag}</Badge>
                            </li>
                        ))}
                    </ul>

                    <span className={s.readMore}>{t('projects.view')}</span>
                </div>
            </article>
        </Card>
    );
};
