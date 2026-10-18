import type { FC } from 'react';
import { cx } from '@sw/utils';
import type { SectionIntroProps } from './SectionIntro.types';
import s from './SectionIntro.module.css';

/**
 * Шапка секции по образцу дизайн-системы: моно-мета, заголовок heading-1 и лид.
 * `layout="row"` выносит действия вправо от заголовка (например, «Все кейсы»).
 */
export const SectionIntro: FC<SectionIntroProps> = (props) => {
  const { meta, title, titleId, lead, actions, layout = 'stack', className } = props;

  return (
    <div className={cx(s.root, s[layout], className)}>
      <div className={s.text}>
        {meta && <span className={s.meta}>{meta}</span>}

        <h2 id={titleId} className={s.title}>
          {title}
        </h2>

        {lead && <p className={s.lead}>{lead}</p>}
      </div>

      {actions && <div className={s.actions}>{actions}</div>}
    </div>
  );
};
