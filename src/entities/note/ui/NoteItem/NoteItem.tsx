import { useLocale } from 'next-intl';
import type { Note } from '../../model/types';
import styles from './NoteItem.module.css';

export interface NoteItemProps {
  note: Note;
}

export function NoteItem({ note }: NoteItemProps) {
  const locale = useLocale();

  const formattedDate = new Date(note.date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article className={styles.root}>
      <p className={styles.text}>{note.text}</p>
      <time className={styles.date} dateTime={note.date}>
        {formattedDate}
      </time>
    </article>
  );
}
