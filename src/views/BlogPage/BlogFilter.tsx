'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { PostList } from '@/widgets/PostList';
import type { Post } from '@/entities/post';
import styles from './BlogFilter.module.css';

interface BlogFilterProps {
  posts: Post[];
}

export function BlogFilter({ posts }: BlogFilterProps) {
  const t = useTranslations();
  const tags = ['all', ...Array.from(new Set(posts.map((p) => p.tag)))];
  const [active, setActive] = useState('all');

  const filtered = active === 'all' ? posts : posts.filter((p) => p.tag === active);

  return (
    <div>
      <nav className={styles.filters} aria-label="Filter by tag">
        {tags.map((tag) => (
          <button
            key={tag}
            className={tag === active ? styles.tagActive : styles.tag}
            onClick={() => setActive(tag)}
            aria-pressed={tag === active}
          >
            {tag === 'all' ? t('blog.filter-all') : tag}
          </button>
        ))}
      </nav>
      <PostList posts={filtered} />
    </div>
  );
}
