'use client';

import type { FC } from 'react';
import { Button } from '@sw/components/Button';
import type { ButtonProps } from '@sw/components/Button';
import type { ServiceId } from '@/entities/service';
import { useBrief } from '../model/BriefContext';
import type { BriefPlacement } from '../model/placement';

interface BriefButtonProps extends Omit<ButtonProps, 'onClick' | 'href'> {
  /** Услуги, которые будут отмечены в брифе. */
  services?: ServiceId[];
  /** Где стоит кнопка — для целей Метрики и заявки в amoCRM. */
  placement: BriefPlacement;
}

/** Кнопка, открывающая бриф. Годится для серверных компонентов — обработчик внутри. */
export const BriefButton: FC<BriefButtonProps> = ({ services, placement, ...rest }) => {
  const { openBrief } = useBrief();

  return <Button {...rest} onClick={() => openBrief({ placement, services })} />;
};
