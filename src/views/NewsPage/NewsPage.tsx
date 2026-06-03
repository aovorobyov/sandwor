import { getTranslations } from 'next-intl/server';
import { NoteList } from '@/widgets/NoteList';
import type { Note } from '@/entities/note';
import s from './NewsPage.module.css';

/**
 * Курируемая лента релизов. Версии — условный semver:
 *   MAJOR (2.x.x) — переломные изменения архитектуры/URL
 *   MINOR (x.N.x) — новый раздел или крупный функциональный пласт
 *   PATCH (x.x.N) — точечный фикс / улучшение / инфраструктура
 *
 * Дата хранится полная (для семантики и сортировки), но в UI рендерится только
 * месяц + год — это changelog, не дневник.
 */
const RELEASES = [
  { version: '1.8.0', date: '2026-06-04' },
  { version: '1.7.0', date: '2026-05-29' },
  { version: '1.6.2', date: '2026-05-29' },
  { version: '1.6.1', date: '2026-05-29' },
  { version: '1.6.0', date: '2026-05-29' },
  { version: '1.5.3', date: '2026-05-29' },
  { version: '1.5.2', date: '2026-05-28' },
  { version: '1.5.1', date: '2026-05-28' },
  { version: '1.5.0', date: '2026-05-28' },
  { version: '1.4.5', date: '2026-05-28' },
  { version: '1.4.4', date: '2026-05-28' },
  { version: '1.4.3', date: '2026-05-28' },
  { version: '1.4.2', date: '2026-05-28' },
  { version: '1.4.1', date: '2026-05-28' },
  { version: '1.4.0', date: '2026-05-28' },
  { version: '1.3.0', date: '2026-05-24' },
  { version: '1.2.0', date: '2026-05-17' },
  { version: '1.1.0', date: '2026-05-16' },
  { version: '1.0.2', date: '2026-05-15' },
  { version: '1.0.1', date: '2026-05-10' },
  { version: '1.0.0', date: '2026-05-01' },
] as const;

export const NewsPage = async () => {
  const t = await getTranslations('news');

  const entries: Note[] = RELEASES.map((release) => {
    return {
      id: `v${release.version}`,
      version: release.version,
      date: release.date,
      text: t(`entries.v${release.version.replace(/\./g, '-')}`),
    };
  });

  return (
    <main className={s.root}>
      <div className={s.container}>
        <h1 className={s.title}>{t('title')}</h1>

        <p className={s.subtitle}>{t('subtitle')}</p>

        <NoteList notes={entries} />
      </div>
    </main>
  );
};
