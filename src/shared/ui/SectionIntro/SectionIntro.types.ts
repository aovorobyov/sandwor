import type { ReactNode } from 'react';

export interface SectionIntroProps {
  /** Моно-подпись над заголовком: «5 этапов», «Кейсы». */
  meta?: ReactNode;
  title: ReactNode;
  /** id заголовка — для `aria-labelledby` секции. */
  titleId?: string;
  /** Одно-два предложения под заголовком. */
  lead?: ReactNode;
  /** Кнопки или ссылки рядом с заголовком. */
  actions?: ReactNode;
  /** stack — всё столбиком; row — действия справа от текста (на мобильном — под ним). */
  layout?: 'stack' | 'row';
  className?: string;
}
