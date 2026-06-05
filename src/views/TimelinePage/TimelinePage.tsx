import { getTranslations } from 'next-intl/server';
import { Timeline, buildTimelineItems, groupAdjacentReleases } from '@/widgets/Timeline';
import { getTelegramPosts } from '@/entities/post/api/telegram';
import { getProjects } from '@/entities/project';
import { buildReleaseNotes } from '@/entities/note';
import s from './TimelinePage.module.css';

export const TimelinePage = async () => {
  const [t, posts, projects] = await Promise.all([
    getTranslations(),
    getTelegramPosts(),
    Promise.resolve(getProjects()),
  ]);

  const releaseNotes = buildReleaseNotes((key) => {
    return t(`news.${key}`);
  });

  // Полная лента — в отличие от главной, без квот и обрезок
  const items = groupAdjacentReleases(
    buildTimelineItems({ posts, projects, releases: releaseNotes }),
  );

  return (
    <main className={s.root}>
      <div className={s.container}>
        <h1 className={s.title}>{t('timeline.title')}</h1>

        <p className={s.subtitle}>{t('timeline.subtitle')}</p>

        <Timeline items={items} />
      </div>
    </main>
  );
};
