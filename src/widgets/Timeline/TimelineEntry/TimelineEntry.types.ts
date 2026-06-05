import type { TimelineItem } from '../Timeline.types';

export interface TimelineEntryProps {
  item: TimelineItem;
}

/** Подготовленные к рендеру данные записи. */
export interface TimelineEntryView {
  href: string;
  dateValue: string;
  dateOptions: Intl.DateTimeFormatOptions;
  badge: string;
  isAccentBadge: boolean;
  title: string;
  text: string;
}
