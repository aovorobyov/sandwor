'use client';

import Link from 'next/link';
import styles from './Header.module.css';

const ACCENT_COLORS = [
  '#fe752b', // orange (default)
  '#3b82f6', // blue
  '#22c55e', // green
  '#ef4444', // red
  '#a855f7', // purple
  '#06b6d4', // cyan
  '#eab308', // yellow
  '#ec4899', // pink
  '#f43f5e', // rose
  '#14b8a6', // teal
];

let lastColor = '';

export function LogoLink() {
  const handleClick = () => {
    const candidates = ACCENT_COLORS.filter((c) => c !== lastColor);
    const next = candidates[Math.floor(Math.random() * candidates.length)];
    lastColor = next;
    document.documentElement.style.setProperty('--accent', next);
  };

  return (
    <Link href="/" className={styles.logo} onClick={handleClick}>
      <span className={styles.logoMask} role="img" aria-label="sandwor" />
    </Link>
  );
}
