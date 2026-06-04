'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import { DotIcon } from '@/shared/ui';
import { PALETTE_OPEN_EVENT } from './lib/paletteEvents';
import s from './PaletteTrigger.module.css';

export const PaletteTrigger: FC = () => {
  const t = useTranslations('palette');

  const handleClick = () => {
    document.dispatchEvent(new CustomEvent(PALETTE_OPEN_EVENT));
  };

  return (
    <button type="button" className={s.root} onClick={handleClick} aria-label={t('triggerAria')}>
      <span className={s.icon} aria-hidden="true">
        <DotIcon name="search" size={14} />
      </span>

      <span className={s.label}>{t('triggerLabel')}</span>

      <kbd className={s.kbd}>⌘K</kbd>
    </button>
  );
};
