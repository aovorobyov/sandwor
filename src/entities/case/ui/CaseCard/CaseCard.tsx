import type { FC } from 'react';
import { Link } from '@/shared/ui/Link';
import { Mono } from '@/shared/ui/Mono';
import { Eyebrow } from '@/shared/ui/Eyebrow';
import type { CaseCardProps } from './CaseCard.types';
import s from './CaseCard.module.css';

/** Карточка кейса в сетке: превью-заглушка, тип, заголовок, состав работ, ссылка. */
export const CaseCard: FC<CaseCardProps> = (props) => {
  const { item, ctaLabel } = props;

  return (
    <Link href={`/cases/${item.slug}`} className={s.root}>
      <div className={s.preview} aria-hidden />

      <div className={s.body}>
        <Eyebrow tone="accent" className={s.type}>
          {item.type}
        </Eyebrow>

        <h2 className={s.title}>{item.title}</h2>

        <p className={s.summary}>{item.summary}</p>

        <ul className={s.scope}>
          {item.scope.map((step) => (
            <li key={step} className={s.scopeItem}>
              <Mono className={s.marker}>·</Mono>
              {step}
            </li>
          ))}
        </ul>

        <span className={s.cta}>{ctaLabel}</span>
      </div>
    </Link>
  );
};
