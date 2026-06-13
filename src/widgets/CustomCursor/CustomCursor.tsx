'use client';

import type { FC } from 'react';
import { useCursor } from './useCursor';
import s from './CustomCursor.module.css';

/**
 * Кастовый курсор-точка. Логика и гейт (точный указатель, не reduced-motion) —
 * в useCursor; здесь только DOM-узел. Пока хук не активен, узел невидим
 * (opacity 0), а нативный курсор остаётся.
 */
export const CustomCursor: FC = () => {
  const dotRef = useCursor();

  return <div ref={dotRef} className={s.dot} aria-hidden />;
};
