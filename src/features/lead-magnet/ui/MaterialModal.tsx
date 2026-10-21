'use client';

import { useRef, useState, type FormEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@sw/components/Button';
import { Checkbox } from '@sw/components/Checkbox';
import { Icon } from '@sw/components/Icon';
import { Modal } from '@sw/components/Modal';
import { TextField } from '@sw/components/TextField';
import { getMaterialGoal, type MaterialId, type MaterialPlacement } from '@/entities/material';
import { consentPath } from '@/shared/config/legal';
import { reachGoal } from '@/shared/lib/analytics';
import { createRequestId } from '@/shared/lib/requestId';
import { localizeHref } from '@/shared/ui/Link/localizeHref';
import { requestMaterial } from '../api/requestMaterial';
import s from './LeadMagnet.module.css';

interface MaterialModalProps {
  open: boolean;
  onClose: () => void;
  materialId: MaterialId;
  placement: MaterialPlacement;
}

type Status = 'form' | 'sending' | 'error' | 'done';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Форма «имя + почта + согласие» → ссылка на PDF сразу, без рассылки.
 * Отдельное согласие на получение материалов (/consent/materials).
 */
export const MaterialModal = ({ open, onClose, materialId, placement }: MaterialModalProps) => {
  const t = useTranslations('materials');
  const locale = useLocale();
  const openedAt = useRef(Date.now());
  const requestId = useRef<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('form');
  const [url, setUrl] = useState('');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === 'sending') return;

    const next: Record<string, string> = {};
    if (!name.trim()) next.name = t('form.err-name');
    if (!EMAIL_PATTERN.test(email.trim())) next.email = t('form.err-email');
    if (!consent) next.consent = t('form.err-consent');
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus('sending');
    requestId.current ??= createRequestId();

    try {
      const fileUrl = await requestMaterial({
        materialId,
        placement,
        locale,
        name: name.trim(),
        email: email.trim(),
        elapsedMs: Date.now() - openedAt.current,
        requestId: requestId.current,
      });
      setUrl(fileUrl);
      setStatus('done');
      reachGoal(getMaterialGoal('get', materialId), { material: materialId, placement });
    } catch {
      setStatus('error');
    }
  };

  const docLink = (path: string, text: string) => (
    <a href={localizeHref(path, locale)} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={status === 'done' ? t('form.success-title') : t(`items.${materialId}.title`)}
      description={status === 'done' ? undefined : t('form.description')}
      closeLabel={t('form.close')}
      size="m"
    >
      {status === 'done' ? (
        <div className={s.done}>
          <span className={s.doneMark} aria-hidden="true">
            <Icon name="check" size={28} />
          </span>
          <p className={s.doneText}>{t('form.success-text')}</p>
          <Button href={url} download iconEnd="download" size="l">
            {t('form.download')}
          </Button>
        </div>
      ) : (
        <form className={`${s.form} ym-hide-content`} onSubmit={submit} noValidate>
          <TextField
            label={t('form.name')}
            placeholder={t('form.name-placeholder')}
            name="name"
            autoComplete="given-name"
            maxLength={100}
            value={name}
            error={errors.name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label={t('form.email')}
            placeholder={t('form.email-placeholder')}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={120}
            value={email}
            error={errors.email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Checkbox
            name="consent"
            checked={consent}
            error={errors.consent}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConsent(e.target.checked)}
            label={docLink(consentPath('materials'), t('form.consent'))}
          />

          {status === 'error' && (
            <p className={s.error} role="alert">
              {t('form.err-submit')}
            </p>
          )}

          <Button
            type="submit"
            size="l"
            block
            loading={status === 'sending'}
            loadingText={t('form.sending')}
            iconEnd="download"
          >
            {t('form.submit')}
          </Button>

          <p className={s.fine}>
            {t('form.fine')} {docLink('/privacy', t('form.policy-link'))}.
          </p>
        </form>
      )}
    </Modal>
  );
};
