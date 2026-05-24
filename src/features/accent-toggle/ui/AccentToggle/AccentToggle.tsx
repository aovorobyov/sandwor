'use client';

import type { FC } from 'react';
import s from './AccentToggle.module.css';

const ACCENT_COLORS = [
    '#fe752b',
    '#3b82f6',
    '#22c55e',
    '#ef4444',
    '#a855f7',
    '#06b6d4',
    '#eab308',
    '#ec4899',
    '#f43f5e',
    '#14b8a6',
];

let lastColor = '';

export const AccentToggle: FC = () => {
    const handleClick = () => {
        const candidates = ACCENT_COLORS.filter((c) => c !== lastColor);
        const next = candidates[Math.floor(Math.random() * candidates.length)];
        lastColor = next;
        document.documentElement.style.setProperty('--accent', next);
    };

    return (
        <button
            className={s.root}
            onClick={handleClick}
            aria-label="Change accent color"
        >
            <span className={s.icon} />
        </button>
    );
};
