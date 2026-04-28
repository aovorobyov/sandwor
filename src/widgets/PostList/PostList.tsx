import { PostCard } from '@/entities/post';
import type { Post } from '@/entities/post';
import styles from './PostList.module.css';

export interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <ul className={styles.grid}>
      {posts.map((post) => (
        <li key={post.slug}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
