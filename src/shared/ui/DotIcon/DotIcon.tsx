import type { FC } from 'react';
import { ICON_DOTS } from './DotIcon.dots';
import type { DotIconProps } from './DotIcon.types';

const VIEW_BOX_SIZE = 60;
const DOT_RADIUS = 5;
const DEFAULT_SIZE = 16;

/** Иконка из точек. Цвет наследуется через `currentColor`, `size` задаёт высоту. */
export const DotIcon: FC<DotIconProps> = (props) => {
  const { name, size = DEFAULT_SIZE, className } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}`}
      fill="none"
      aria-hidden
      focusable={false}
      className={className}
    >
      {ICON_DOTS[name].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={DOT_RADIUS} fill="currentColor" />
      ))}
    </svg>
  );
};
