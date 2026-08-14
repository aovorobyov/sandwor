'use client';

import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Chip } from '@/shared/ui/Chip';
import { PostRow } from '@/entities/post/ui/PostRow';
import type { BlogFilterProps } from './BlogFilter.types';
import s from './BlogFilter.module.css';

const ALL = 'all';

export const BlogFilter: FC<BlogFilterProps> = (props) => {
  const { posts } = props;
  const t = useTranslations();
  const tags = useMemo(() => [ALL, ...Array.from(new Set(posts.map((p) => p.tag)))], [posts]);
  const [active, setActive] = useState(ALL);

  const filtered = useMemo(
    () => (active === ALL ? posts : posts.filter((p) => p.tag === active)),
    [active, posts],
  );

  const handleSelect = (value: string) => {
    setActive(value);
  };

  return (
    <div>
      <div className={s.filters} role="group" aria-label="Filter by tag">
        {tags.map((tag) => (
          <Chip
            key={tag}
            value={tag}
            label={tag === ALL ? t('blog.filter-all') : tag}
            isActive={tag === active}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <div className={s.list}>
        {filtered.map((post) => (
          <PostRow key={post.slug} post={post} isLarge hasExcerpt hasReadLink />
        ))}
      </div>
    </div>
  );
};
