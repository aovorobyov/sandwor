import { NoteItem } from '@/entities/note';
import type { Note } from '@/entities/note';
import styles from './NoteList.module.css';

export interface NoteListProps {
  notes: Note[];
}

export function NoteList({ notes }: NoteListProps) {
  if (notes.length === 0) {
    return null;
  }

  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li key={note.id}>
          <NoteItem note={note} />
        </li>
      ))}
    </ul>
  );
}
