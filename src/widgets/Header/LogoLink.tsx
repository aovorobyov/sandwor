'use client';

import type { FC } from 'react';
import Link from 'next/link';
import s from './Header.module.css';

const ACCENT_COLORS = [
    '#fe752b', // оранжевый (по умолчанию)
    '#3b82f6', // синий
    '#22c55e', // зелёный
    '#ef4444', // красный
    '#a855f7', // фиолетовый
    '#06b6d4', // голубой
    '#eab308', // жёлтый
    '#ec4899', // розовый
    '#f43f5e', // малиновый
    '#14b8a6', // бирюзовый
];

let lastColor = '';

export const LogoLink: FC = () => {
    const handleLogoClick = () => {
        const candidates = ACCENT_COLORS.filter((c) => c !== lastColor);
        const next = candidates[Math.floor(Math.random() * candidates.length)];
        lastColor = next;
        document.documentElement.style.setProperty('--accent', next);
    };

    return (
        <Link href="/" className={s.logo} onClick={handleLogoClick}>
            <span className={s.logoMask} role="img" aria-label="sandwor" />
        </Link>
    );
};
