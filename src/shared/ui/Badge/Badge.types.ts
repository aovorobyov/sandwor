import type { ReactNode } from 'react';

export type BadgeVariant = 'neutral' | 'accent';

export interface BadgeProps {
    children: ReactNode;
    variant?: BadgeVariant;
    className?: string;
}
