import { getTranslations } from 'next-intl/server';
import { NoteList } from '@/widgets/NoteList';
import { MOCK_NOTES } from './mocks';
import s from './NotesPage.module.css';

export const NotesPage = async () => {
  const t = await getTranslations();

  return (
    <main className={s.root}>
      <div className={s.container}>
        <h1 className={s.title}>{t('notes.title')}</h1>

        <NoteList notes={MOCK_NOTES} />
      </div>
    </main>
  );
};
