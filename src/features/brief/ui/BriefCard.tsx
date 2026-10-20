'use client';

import type { FC } from 'react';
import { useLocale } from 'next-intl';
import { cx } from '@sw/utils';
import { BriefForm } from '@sw/components/BriefForm';
import { localizeHref } from '@/shared/ui/Link/localizeHref';
import { useBriefFormProps } from '../lib/useBriefFormProps';

/** Бриф прямо на странице (контакты): карточка surface вместо модального окна. */
export const BriefCard: FC<{ className?: string }> = ({ className }) => {
  const locale = useLocale();
  const formProps = useBriefFormProps();

  return (
    <BriefForm
      {...formProps}
      container="card"
      headingLevel={2}
      returnHref={localizeHref('/', locale)}
      // Вебвизор не записывает содержимое брифа (имя, телефон, задачу) — как обещает политика.
      className={cx('ym-hide-content', className)}
    />
  );
};
