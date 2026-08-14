import type { FC } from 'react';
import s from './Logo.module.css';

/** Текстовый логотип: «sandwor» дисплейным шрифтом + пульсирующая акцентная точка. */
export const Logo: FC = () => {
  return (
    <span className={s.root} aria-label="sandwor">
      sandwor
      <span className={s.dot} aria-hidden />
    </span>
  );
};
