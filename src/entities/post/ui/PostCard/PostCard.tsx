import type { FC } from 'react';
import { Badge } from '@sw/components/Badge';
import { Icon } from '@sw/components/Icon';
import { cx } from '@sw/utils';
import type { Post } from '../../model/types';
import s from './PostCard.module.css';

interface PostCardProps {
  post: Post;
  /** Готовая ссылка с префиксом локали. */
  href: string;
  /** «Читать» — подпись ghost-ссылки в подвале. */
  readLabel: string;
  /** «6 мин» — время чтения. */
  readTime: string;
  /** Дата так, как её читают: «27 июня 2026». */
  date: string;
  headingLevel?: 2 | 3;
  className?: string;
}

/**
 * Карточка статьи по правилам карточек дизайн-системы (как ServiceCard):
 * surface, линия line, radius-lg; вся карточка — ссылка через растянутый
 * заголовок, внизу ghost «Читать →».
 */
export const PostCard: FC<PostCardProps> = (props) => {
  const { post, href, readLabel, readTime, date, headingLevel = 3, className } = props;
  const Heading = `h${headingLevel}` as const;

  return (
    <article className={cx(s.root, className)}>
      <div className={s.top}>
        <Badge variant="tag" size="s">
          {post.tag}
        </Badge>

        <span className={s.meta}>
          <time dateTime={post.date}>{date}</time> · {readTime}
        </span>
      </div>

      <Heading className={s.title}>
        <a href={href} className={s.link}>
          {post.title}
        </a>
      </Heading>

      <p className={s.excerpt}>{post.excerpt}</p>

      <span className={cx('sw-btn', 'sw-btn--ghost', 'sw-btn--s', s.more)} aria-hidden="true">
        <span>{readLabel}</span>
        <Icon name="arrow-right" size={15} className="sw-btn__icon sw-btn__icon--end" />
      </span>
    </article>
  );
};
