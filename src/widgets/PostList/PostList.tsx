import type { FC } from 'react';
import { PostCard } from '@/entities/post';
import type { PostListProps } from './PostList.types';
import s from './PostList.module.css';

export const PostList: FC<PostListProps> = (props) => {
    const { posts } = props;

    if (posts.length === 0) {
        return null;
    }

    return (
        <ul className={s.grid}>
            {posts.map((post) => (
                <li key={post.slug}>
                    <PostCard post={post} />
                </li>
            ))}
        </ul>
    );
};
