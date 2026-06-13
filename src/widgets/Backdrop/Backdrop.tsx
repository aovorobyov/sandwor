import type { FC } from 'react';
import s from './Backdrop.module.css';

/**
 * Фиксированный фон-полотно за всем контентом: перфорация «с дырками»
 * (цвет по теме) плюс слой свечения в цвет акцента, замаскированный мягким
 * кругом у курсора. Позицию свечения берёт из CSS-переменных --cursor-x/--cursor-y,
 * которые пишет хук useCursor (без собственного слушателя указателя).
 */
export const Backdrop: FC = () => {
  return (
    <div className={s.root} aria-hidden>
      <div className={s.glow} />
    </div>
  );
};
