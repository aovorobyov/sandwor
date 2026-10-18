import type { FC } from 'react';
import { cx } from '@sw/utils';
import type { CaseCoverSpec } from '../../model/cases';
import s from './SiteCover.module.css';

interface SiteCoverProps {
  spec: CaseCoverSpec;
  /** Подпись в адресной строке, если у кейса нет публичного домена (тип проекта). */
  label: string;
  /** l — крупная обложка на странице кейса. */
  size?: 'm' | 'l';
}

const CATALOG_TILES = 6;
const LANDING_ROWS = 3;

/**
 * Схематичная обложка кейса-сайта: окно браузера из узлов дизайн-системы
 * (surface, line-strong, shadow-node) с адресом и раскладкой страницы.
 * Кладётся в CaseCard как свой `cover` — тот сам подложит точечную канву.
 * Это рисунок, а не скриншот: настоящие экраны клиента не показываем без согласия.
 */
export const SiteCover: FC<SiteCoverProps> = ({ spec, label, size = 'm' }) => {
  return (
    <div className={cx(s.root, s[size])} aria-hidden="true">
      <div className={s.window}>
        <div className={s.bar}>
          <span className={s.dots}>
            <i />
            <i />
            <i />
          </span>

          <span className={s.url}>{spec.domain ?? label}</span>

          {spec.chips && (
            <span className={s.chips}>
              {spec.chips.map((chip, index) => (
                <span key={chip} className={cx(s.chip, index === 0 && s.chipActive)}>
                  {chip}
                </span>
              ))}
            </span>
          )}
        </div>

        <div className={s.page}>
          <div className={s.nav}>
            <span className={s.logo} />
            <span className={s.links}>
              <i />
              <i />
              <i />
            </span>
          </div>

          <div className={s.hero}>
            <span className={s.lineXl} />
            <span className={s.lineL} />
            <span className={s.button} />
          </div>

          {spec.layout === 'catalog' ? (
            <div className={s.tiles}>
              {Array.from({ length: CATALOG_TILES }, (_, index) => (
                <span key={index} className={s.tile} />
              ))}
            </div>
          ) : (
            <div className={s.rows}>
              {Array.from({ length: LANDING_ROWS }, (_, index) => (
                <span key={index} className={s.row}>
                  <i />
                  <i />
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
