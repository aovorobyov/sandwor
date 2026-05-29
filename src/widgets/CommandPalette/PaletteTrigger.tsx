'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
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
        ⌕
      </span>

      <span className={s.label}>{t('triggerLabel')}</span>

      <kbd className={s.kbd}>⌘K</kbd>
    </button>
  );
};
