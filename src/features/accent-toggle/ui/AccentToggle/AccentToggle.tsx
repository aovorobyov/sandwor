'use client';

import type { FC } from 'react';
import { cycleAccent } from '../../lib/cycleAccent';
import s from './AccentToggle.module.css';

export const AccentToggle: FC = () => {
    const handleClick = () => {
        cycleAccent();
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
