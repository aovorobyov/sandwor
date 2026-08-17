import type { PaletteSwatch } from './SoonPage.types';

/**
 * Палитра редизайна — выдержка из токенов ветки `sandwor_v2`.
 * Значения захардкожены, а не взяты из CSS-переменных: тизер показывает hex-коды текстом,
 * а прочитать `var(--ac)` на сервере нельзя.
 */
export const V2_PALETTE: PaletteSwatch[] = [
  { token: '--bg', value: '#0e0c0b' },
  { token: '--bg3', value: '#1c1815' },
  { token: '--text', value: '#f4efe8' },
  { token: '--muted', value: '#9a9086' },
  { token: '--ac', value: '#ff7a2b' },
];

/** Шрифты новой темы. `family` совпадает с `font-family` из `@font-face` тизера. */
export const V2_FONTS = [
  { id: 'display', name: 'Unbounded', family: "'Unbounded Variable', system-ui, sans-serif" },
  { id: 'ui', name: 'Golos Text', family: "'Golos Text Variable', system-ui, sans-serif" },
  { id: 'mono', name: 'Fira Code', family: "'Fira Code Variable', ui-monospace, monospace" },
] as const;
