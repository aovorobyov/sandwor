import type { FC } from 'react';
import { Link } from 'next-view-transitions';
import { Logo } from './Logo/Logo';
import s from './Header.module.css';

export const LogoLink: FC = () => {
  return (
    <Link href="/" className={s.logo}>
      <Logo />
    </Link>
  );
};
