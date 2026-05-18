import type { FC } from 'react';
import { NoteItem } from '@/entities/note';
import type { NoteListProps } from './NoteList.types';
import s from './NoteList.module.css';

export const NoteList: FC<NoteListProps> = (props) => {
    const { notes } = props;

    if (notes.length === 0) {
        return null;
    }

    return (
        <ul className={s.list}>
            {notes.map((note) => (
                <li key={note.id} className={s.item}>
                    <NoteItem note={note} />
                </li>
            ))}
        </ul>
    );
};
