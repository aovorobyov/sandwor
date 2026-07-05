import type { FC } from 'react';
import { Link } from '@/shared/ui/Link';
import { useLocale, useTranslations } from 'next-intl';
import { Badge } from '@/shared/ui/Badge';
import type { TimelineEntryProps, TimelineEntryView } from './TimelineEntry.types';
import s from './TimelineEntry.module.css';

const FULL_DATE: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
};

const MONTH_DATE: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  timeZone: 'UTC',
};

/** Первое предложение текста релиза — компактный заголовок для ленты. */
const getReleaseHeadline = (text: string): string => {
  const match = text.match(/^.*?\.(?=\s|$)/);

  return match ? match[0] : text;
};

export const TimelineEntry: FC<TimelineEntryProps> = (props) => {
  const { item } = props;
  const t = useTranslations('home');
  const locale = useLocale();

  const getView = (): TimelineEntryView => {
    switch (item.type) {
      case 'post':
        return {
          href: `/blog/${item.post.slug}`,
          dateValue: item.post.date,
          dateOptions: FULL_DATE,
          badge: t('timeline-type-post'),
          isAccentBadge: false,
          title: item.post.title,
          text: item.post.excerpt,
        };
      case 'project':
        return {
          href: `/projects/${item.project.slug}`,
          dateValue: item.project.date,
          dateOptions: MONTH_DATE,
          badge: t('timeline-type-project'),
          isAccentBadge: false,
          title: item.project.title[locale as 'en' | 'ru'],
          text: item.project.description[locale as 'en' | 'ru'],
        };
      case 'release': {
        const newest = item.notes[0];
        const oldest = item.notes[item.notes.length - 1];
        const isGroup = item.notes.length > 1;

        return {
          href: '/news',
          dateValue: newest.date,
          dateOptions: FULL_DATE,
          badge: isGroup ? `v${oldest.version} – v${newest.version}` : `v${newest.version}`,
          isAccentBadge: true,
          title: getReleaseHeadline(newest.text),
          text: isGroup ? t('timeline-more-releases', { count: item.notes.length - 1 }) : '',
        };
      }
      default:
        throw new Error('Unknown timeline item type');
    }
  };

  const view = getView();
  const formattedDate = new Date(view.dateValue).toLocaleDateString(locale, view.dateOptions);

  return (
    <Link href={view.href} className={s.root}>
      <span className={s.dot} aria-hidden />

      <div className={s.meta}>
        <time className={s.date} dateTime={view.dateValue}>
          {formattedDate}
        </time>

        <Badge variant={view.isAccentBadge ? 'accent' : 'neutral'}>{view.badge}</Badge>
      </div>

      <h3 className={s.title}>{view.title}</h3>

      {view.text && <p className={s.text}>{view.text}</p>}
    </Link>
  );
};
