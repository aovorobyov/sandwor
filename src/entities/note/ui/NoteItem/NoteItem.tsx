import type { FC } from 'react';
import { useLocale } from 'next-intl';
import type { NoteItemProps } from './NoteItem.types';
import s from './NoteItem.module.css';

export const NoteItem: FC<NoteItemProps> = (props) => {
    const { note } = props;
    const locale = useLocale();

    const formattedDate = new Date(note.date).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <article className={s.root}>
            <p className={s.text}>{note.text}</p>

            <div className={s.separator} />

            <time className={s.date} dateTime={note.date}>
                {formattedDate}
            </time>
        </article>
    );
};
