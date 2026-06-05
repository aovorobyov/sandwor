import { getTranslations } from 'next-intl/server';
import { NoteList } from '@/widgets/NoteList';
import { buildReleaseNotes } from '@/entities/note';
import s from './NewsPage.module.css';

export const NewsPage = async () => {
  const t = await getTranslations('news');

  const entries = buildReleaseNotes(t);

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
