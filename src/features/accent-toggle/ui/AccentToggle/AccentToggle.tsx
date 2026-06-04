'use client';

import type { FC } from 'react';
import { DotIcon } from '@/shared/ui';
import { cycleAccent } from '../../lib/cycleAccent';
import s from './AccentToggle.module.css';

export const AccentToggle: FC = () => {
  const handleClick = () => {
    cycleAccent();
  };

  return (
    <button className={s.root} onClick={handleClick} aria-label="Change accent color">
      <DotIcon name="drop" className={s.icon} />
    </button>
  );
};
