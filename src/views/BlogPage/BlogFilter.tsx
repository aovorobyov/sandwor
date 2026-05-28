'use client';

import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { PostList } from '@/widgets/PostList';
import type { BlogFilterProps } from './BlogFilter.types';
import s from './BlogFilter.module.css';

export const BlogFilter: FC<BlogFilterProps> = (props) => {
  const { posts } = props;
  const t = useTranslations();
  const tags = useMemo(() => ['all', ...Array.from(new Set(posts.map((p) => p.tag)))], [posts]);
  const [active, setActive] = useState('all');

  const filtered = useMemo(
    () => (active === 'all' ? posts : posts.filter((p) => p.tag === active)),
    [active, posts],
  );

  const createTagHandler = (tag: string) => {
    return () => setActive(tag);
  };

  return (
    <div>
      <nav className={s.filters} aria-label="Filter by tag">
        {tags.map((tag) => (
          <button
            key={tag}
            className={tag === active ? s.tagActive : s.tag}
            onClick={createTagHandler(tag)}
            aria-pressed={tag === active}
          >
            {tag === 'all' ? t('blog.filter-all') : tag}
          </button>
        ))}
      </nav>

      <PostList posts={filtered} />
    </div>
  );
};
