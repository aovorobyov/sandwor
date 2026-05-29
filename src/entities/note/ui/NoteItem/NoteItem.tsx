import type { FC } from 'react';
import { useLocale } from 'next-intl';
import type { NoteItemProps } from './NoteItem.types';
import s from './NoteItem.module.css';

export const NoteItem: FC<NoteItemProps> = (props) => {
  const { note } = props;
  const locale = useLocale();

  /** Релизные заметки (с version) пишем по месяцам — это changelog, а не дневник. */
  const dateOptions: Intl.DateTimeFormatOptions = note.version
    ? { year: 'numeric', month: 'long', timeZone: 'UTC' }
    : { year: 'numeric', month: 'short', day: 'numeric' };

  const formattedDate = new Date(note.date).toLocaleDateString(locale, dateOptions);

  return (
    <article className={s.root}>
      <p className={s.text}>{note.text}</p>

      <div className={s.separator} />

      <div className={s.meta}>
        <time className={s.date} dateTime={note.date}>
          {formattedDate}
        </time>

        {note.version && <span className={s.version}>v{note.version}</span>}
      </div>
    </article>
  );
};
