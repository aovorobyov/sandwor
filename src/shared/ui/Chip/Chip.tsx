'use client';

import type { FC } from 'react';
import { cn } from '@/shared/lib/cn';
import type { ChipProps } from './Chip.types';
import s from './Chip.module.css';

/** Фильтр-чип: моношрифт-пилюля. Активный — акцентная подложка и рамка. */
export const Chip: FC<ChipProps> = (props) => {
  const { label, value, isActive, onSelect } = props;

  const handleClick = () => {
    onSelect(value);
  };

  return (
    <button
      type="button"
      className={cn(s.root, isActive && s.active)}
      aria-pressed={isActive}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};
