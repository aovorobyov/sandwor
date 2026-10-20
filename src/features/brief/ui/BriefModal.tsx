'use client';

import { useState } from 'react';
import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Modal } from '@sw/components/Modal';
import { BriefForm } from '@sw/components/BriefForm';
import type { ServiceId } from '@/entities/service';
import { useBriefFormProps } from '../lib/useBriefFormProps';

interface BriefModalProps {
  open: boolean;
  onClose: () => void;
  services?: ServiceId[];
}

/** Бриф в модальном окне; на мобильном Modal сам становится нижним листом. */
export const BriefModal: FC<BriefModalProps> = ({ open, onClose, services }) => {
  const t = useTranslations();
  const formProps = useBriefFormProps(services);
  // После отправки подзаголовок «Четыре коротких шага…» уже не к месту.
  const [isDone, setIsDone] = useState(false);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('brief.title')}
      description={isDone ? undefined : t('brief.description')}
      size="l"
      closeOnScrim={false}
      closeLabel={t('common.close')}
    >
      <BriefForm
        {...formProps}
        container="bare"
        headingLevel={3}
        onReturn={onClose}
        onStatusChange={(status) => setIsDone(status === 'success')}
        className="ym-hide-content"
      />
    </Modal>
  );
};
