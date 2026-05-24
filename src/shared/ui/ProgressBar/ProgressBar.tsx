import type { FC } from 'react';
import { cn } from '@/shared/lib/cn';
import type { ProgressBarProps } from './ProgressBar.types';
import s from './ProgressBar.module.css';

export const ProgressBar: FC<ProgressBarProps> = ({ value, max, className }) => {
    const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

    return (
        <div
            className={cn(s.track, className)}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
        >
            <div className={s.fill} style={{ width: `${pct}%` }} />
        </div>
    );
};
