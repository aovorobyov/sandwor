import type { FC } from 'react';
import { cx } from '@sw/utils';
import type { SectionProps } from './Section.types';
import s from './Section.module.css';

/**
 * Секция страницы: вертикальный ритм и контейнер дизайн-системы (`sw-container`).
 * `tone` — фон секции: обычный `bg`, утопленный `bg-sunken` или точечная канва.
 */
export const Section: FC<SectionProps> = (props) => {
  const { tone = 'default', spacing = 'm', className, children, ...rest } = props;

  return (
    <section className={cx(s.root, s[tone], s[spacing], className)} {...rest}>
      <div className="sw-container">{children}</div>
    </section>
  );
};
