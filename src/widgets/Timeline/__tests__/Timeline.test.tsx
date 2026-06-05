import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { Note } from '@/entities/note';
import type { Post } from '@/entities/post';
import type { Project } from '@/entities/project';
import { Timeline } from '../Timeline';
import { buildTimelineItems, groupAdjacentReleases } from '../lib/timelineItems';

const messages = require('messages/ru.json') as Record<string, string>;

const POST: Post = {
  slug: 'first-post',
  title: 'Пост о коде',
  date: '2026-05-20',
  tag: 'dev',
  excerpt: 'Короткое описание поста.',
  body: '',
  readTime: 3,
};

const PROJECT: Project = {
  slug: 'side-project',
  title: { ru: 'Пет-проект', en: 'Side project' },
  date: '2026-04',
  description: { ru: 'Описание проекта.', en: 'Project description.' },
  image: null,
  tags: [],
  repoUrl: null,
  siteUrl: null,
  body: { ru: '', en: '' },
};

const RELEASE: Note = {
  id: 'v9.9.9',
  version: '9.9.9',
  date: '2026-06-01',
  text: 'Запуск sandwor.ru. Стек: Next.js 14 + App Router.',
};

const renderTimeline = () => {
  const items = buildTimelineItems({ posts: [POST], projects: [PROJECT], releases: [RELEASE] });

  return render(
    <NextIntlClientProvider locale="ru" messages={messages}>
      <Timeline items={items} />
    </NextIntlClientProvider>,
  );
};

describe('buildTimelineItems', () => {
  it('sorts mixed items by date, newest first', () => {
    const items = buildTimelineItems({ posts: [POST], projects: [PROJECT], releases: [RELEASE] });

    expect(
      items.map((item) => {
        return item.type;
      }),
    ).toEqual(['release', 'post', 'project']);
  });
});

describe('groupAdjacentReleases', () => {
  const buildRelease = (version: string, date: string): Note => {
    return { id: `v${version}`, version, date, text: `Релиз ${version}.` };
  };

  it('merges adjacent same-day releases into one item, newest first', () => {
    const items = buildTimelineItems({
      posts: [],
      projects: [],
      releases: [
        buildRelease('1.4.2', '2026-05-28'),
        buildRelease('1.4.1', '2026-05-28'),
        buildRelease('1.4.0', '2026-05-28'),
      ],
    });

    const grouped = groupAdjacentReleases(items);

    expect(grouped).toHaveLength(1);
    expect(grouped[0].type === 'release' && grouped[0].notes.map((n) => n.version)).toEqual([
      '1.4.2',
      '1.4.1',
      '1.4.0',
    ]);
  });

  it('does not merge releases from different days', () => {
    const items = buildTimelineItems({
      posts: [],
      projects: [],
      releases: [buildRelease('1.5.0', '2026-05-29'), buildRelease('1.4.0', '2026-05-28')],
    });

    expect(groupAdjacentReleases(items)).toHaveLength(2);
  });

  it('keeps a post between releases ungrouped', () => {
    const items = buildTimelineItems({
      posts: [{ ...POST, date: '2026-05-28' }],
      projects: [],
      releases: [buildRelease('1.5.0', '2026-05-28'), buildRelease('1.4.0', '2026-05-28')],
    });

    // пост с тем же днём встаёт между релизами при стабильной сортировке — группа не склеивается через него
    const grouped = groupAdjacentReleases(items);
    const releaseItems = grouped.filter((item) => {
      return item.type === 'release';
    });

    expect(grouped.length).toBeGreaterThanOrEqual(2);
    expect(releaseItems.length + 1).toBe(grouped.length);
  });
});

describe('Timeline', () => {
  it('renders nothing for empty list', () => {
    const { container } = render(
      <NextIntlClientProvider locale="ru" messages={messages}>
        <Timeline items={[]} />
      </NextIntlClientProvider>,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders post entry with link and excerpt', () => {
    renderTimeline();

    const link = screen.getByRole('link', { name: /Пост о коде/ });

    expect(link).toHaveAttribute('href', '/blog/first-post');
    expect(screen.getByText('Короткое описание поста.')).toBeInTheDocument();
    expect(screen.getByText('Статья')).toBeInTheDocument();
  });

  it('renders localized project entry', () => {
    renderTimeline();

    const link = screen.getByRole('link', { name: /Пет-проект/ });

    expect(link).toHaveAttribute('href', '/projects/side-project');
    expect(screen.getByText('Проект')).toBeInTheDocument();
  });

  it('renders release entry with version badge and first sentence as title', () => {
    renderTimeline();

    // точка внутри домена не должна обрезать заголовок — регулярка ждёт точку перед пробелом
    const link = screen.getByRole('link', { name: /Запуск sandwor\.ru\./ });

    expect(link).toHaveAttribute('href', '/news');
    expect(screen.getByText('v9.9.9')).toBeInTheDocument();
    expect(screen.queryByText(/Стек: Next\.js/)).not.toBeInTheDocument();
  });

  it('renders grouped releases with version range and counter', () => {
    const releases: Note[] = [
      { id: 'v1.4.2', version: '1.4.2', date: '2026-05-28', text: 'Новейший релиз группы.' },
      { id: 'v1.4.1', version: '1.4.1', date: '2026-05-28', text: 'Средний релиз.' },
      { id: 'v1.4.0', version: '1.4.0', date: '2026-05-28', text: 'Старший релиз.' },
    ];

    const items = groupAdjacentReleases(buildTimelineItems({ posts: [], projects: [], releases }));

    render(
      <NextIntlClientProvider locale="ru" messages={messages}>
        <Timeline items={items} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText('v1.4.0 – v1.4.2')).toBeInTheDocument();
    expect(screen.getByText('Новейший релиз группы.')).toBeInTheDocument();
    expect(screen.getByText('и ещё 2 релиза')).toBeInTheDocument();
  });
});
