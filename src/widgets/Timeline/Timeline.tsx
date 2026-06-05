import type { FC } from 'react';
import { TimelineEntry } from './TimelineEntry/TimelineEntry';
import { getTimelineItemKey } from './lib/timelineItems';
import type { TimelineProps } from './Timeline.types';
import s from './Timeline.module.css';

export const Timeline: FC<TimelineProps> = (props) => {
  const { items } = props;

  if (items.length === 0) {
    return null;
  }

  return (
    <ol className={s.list}>
      {items.map((item) => (
        <li key={getTimelineItemKey(item)} className={s.item}>
          <TimelineEntry item={item} />
        </li>
      ))}
    </ol>
  );
};
