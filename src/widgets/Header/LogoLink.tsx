import type { FC } from 'react';
import { Link } from 'next-view-transitions';
import s from './Header.module.css';

export const LogoLink: FC = () => {
  return (
    <Link href="/" className={s.logo}>
      <span className={s.logoMask} role="img" aria-label="sandwor" />
    </Link>
  );
};
