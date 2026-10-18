import type { HTMLAttributes } from 'react';

export type SectionTone = 'default' | 'sunken' | 'canvas';
export type SectionSpacing = 's' | 'm';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Фон: default — `bg`, sunken — `bg-sunken` с линиями, canvas — точечная сетка. */
  tone?: SectionTone;
  /** Вертикальные отступы: m — 96/56px, s — 56/40px (для первой секции под героем). */
  spacing?: SectionSpacing;
}
