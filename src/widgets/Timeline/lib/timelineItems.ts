import type { BuildTimelineItemsInput, TimelineItem } from '../Timeline.types';

/** Дата записи — для хронологической сортировки. */
const getTimelineItemDate = (item: TimelineItem): string => {
  switch (item.type) {
    case 'post':
      return item.post.date;
    case 'project':
      return item.project.date;
    case 'release':
      return item.notes[0].date;
    default:
      throw new Error('Unknown timeline item type');
  }
};

/** Стабильный React-ключ записи; для группы релизов — id новейшего. */
export const getTimelineItemKey = (item: TimelineItem): string => {
  switch (item.type) {
    case 'post':
      return `post-${item.post.slug}`;
    case 'project':
      return `project-${item.project.slug}`;
    case 'release':
      return `release-${item.notes[0].id}`;
    default:
      throw new Error('Unknown timeline item type');
  }
};

/** Сливает статьи, проекты и релизы в одну хронологическую ленту (новейшие первыми). */
export const buildTimelineItems = (input: BuildTimelineItemsInput): TimelineItem[] => {
  const { posts, projects, releases } = input;

  const postItems = posts.map((post): TimelineItem => {
    return { type: 'post', post };
  });

  const projectItems = projects.map((project): TimelineItem => {
    return { type: 'project', project };
  });

  const releaseItems = releases.map((note): TimelineItem => {
    return { type: 'release', notes: [note] };
  });

  return [...postItems, ...projectItems, ...releaseItems].sort((a, b) => {
    return new Date(getTimelineItemDate(b)).getTime() - new Date(getTimelineItemDate(a)).getTime();
  });
};

/**
 * Сливает соседние релизы одного дня в одну запись-группу — плотные пачки версий
 * (по несколько релизов за день) не забивают ленту. Версии внутри группы
 * сохраняют порядок «новейший первым».
 */
export const groupAdjacentReleases = (items: TimelineItem[]): TimelineItem[] => {
  return items.reduce<TimelineItem[]>((acc, item) => {
    const prev = acc[acc.length - 1];

    if (
      item.type === 'release' &&
      prev?.type === 'release' &&
      prev.notes[0].date === item.notes[0].date
    ) {
      prev.notes.push(...item.notes);

      return acc;
    }

    if (item.type === 'release') {
      // копия — группировка не должна мутировать исходные записи
      acc.push({ type: 'release', notes: [...item.notes] });

      return acc;
    }

    acc.push(item);

    return acc;
  }, []);
};
