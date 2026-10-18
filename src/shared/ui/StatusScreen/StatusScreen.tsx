import type { FC, ReactNode } from 'react';
import { Canvas } from '@sw/components/Canvas';
import { Logo } from '@sw/components/Logo';
import s from './StatusScreen.module.css';

interface StatusScreenProps {
  /** Моно-код над заголовком: «404», «Error». */
  code: string;
  title: ReactNode;
  text: ReactNode;
  /** Кнопки: одна primary, остальные secondary. */
  actions: ReactNode;
  /** Показать логотип — когда страница рендерится без шапки сайта. */
  logoHref?: string;
}

/** Экран 404 и ошибки: панель на точечной канве с моно-кодом и действиями. */
export const StatusScreen: FC<StatusScreenProps> = (props) => {
  const { code, title, text, actions, logoHref } = props;

  return (
    <div className={s.root}>
      {logoHref && <Logo size={24} href={logoHref} className={s.logo} />}

      <Canvas bordered className={s.canvas}>
        <div className={s.panel}>
          <span className={s.code}>{code}</span>

          <h1 className={s.title}>{title}</h1>

          <p className={s.text}>{text}</p>

          <div className={s.actions}>{actions}</div>
        </div>
      </Canvas>
    </div>
  );
};
