import type { FC } from 'react';
import { Icon } from '@sw/components/Icon';
import s from './FeatureGrid.module.css';

export interface FeatureItem {
  /** Иконка из набора дизайн-системы. */
  icon: string;
  title: string;
  text: string;
}

interface FeatureGridProps {
  items: FeatureItem[];
  headingLevel?: 3 | 4;
}

/**
 * Сетка «что входит»: плитка с иконкой, заголовок heading-3 и одна-две строки.
 * Те же узлы, что у ServiceCard (surface, line, radius-lg), но без ссылки.
 */
export const FeatureGrid: FC<FeatureGridProps> = ({ items, headingLevel = 3 }) => {
  const Heading = `h${headingLevel}` as const;

  return (
    <ul className={s.grid}>
      {items.map((item) => (
        <li key={item.title} className={s.item}>
          <span className={s.tile} aria-hidden="true">
            <Icon name={item.icon} size={20} />
          </span>

          <Heading className={s.title}>{item.title}</Heading>

          <p className={s.text}>{item.text}</p>
        </li>
      ))}
    </ul>
  );
};
