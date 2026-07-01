'use client';

import type { FC } from 'react';
import { cn } from '@/shared/lib/cn';
import { useTypewriter } from './useTypewriter/useTypewriter';
import type { TypewriterProps } from './Typewriter.types';
import s from './Typewriter.module.css';

export const Typewriter: FC<TypewriterProps> = (props) => {
  const { words, className } = props;
  const { text } = useTypewriter(words);

  return (
    // Без aria-live: смена слова каждые ~90мс иначе спамит скринридеры посимвольно.
    // Первое слово озвучивается один раз как часть заголовка при загрузке.
    <span className={cn(s.root, className)}>
      {text}

      <span className={s.cursor} aria-hidden="true" />
    </span>
  );
};
