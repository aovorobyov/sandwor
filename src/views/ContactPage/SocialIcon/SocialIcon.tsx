import type { FC } from 'react';
import { DotIcon } from '@/shared/ui';
import type { SocialIconProps } from './SocialIcon.types';

const SIZE = 22;

/** Точечная иконка канала связи. Цвет наследуется через `currentColor`. */
export const SocialIcon: FC<SocialIconProps> = (props) => {
  const { name, className } = props;

  return <DotIcon name={name} size={SIZE} className={className} />;
};
