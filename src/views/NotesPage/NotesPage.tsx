import { getTranslations } from 'next-intl/server';
import { NoteList } from '@/widgets/NoteList';
import { MOCK_NOTES } from './mocks';
import styles from './NotesPage.module.css';

export async function NotesPage() {
  const t = await getTranslations();

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('notes.title')}</h1>
        <NoteList notes={MOCK_NOTES} />
      </div>
    </main>
  );
}
