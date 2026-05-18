import type { FC } from 'react';
import { cn } from '@/shared/lib/cn';
import type { BadgeProps } from './Badge.types';
import s from './Badge.module.css';

export const Badge: FC<BadgeProps> = (props) => {
    const { children, variant = 'neutral', className } = props;

    return (
        <span className={cn(s.root, s[variant], className)}>
            {children}
        </span>
    );
};
