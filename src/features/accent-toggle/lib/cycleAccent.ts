'use client';

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

/** Меняет CSS-переменную `--accent` на случайный цвет из палитры, исключая предыдущий. */
export const cycleAccent = () => {
  const candidates = ACCENT_COLORS.filter((color) => {
    return color !== lastColor;
  });
  const next = candidates[Math.floor(Math.random() * candidates.length)];
  lastColor = next;
  document.documentElement.style.setProperty('--accent', next);
};
