'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@sw/components/Button';
import { Icon } from '@sw/components/Icon';
import { Link } from '@/shared/ui/Link';
import { YandexMetrika } from '@/shared/lib/analytics';
import { useCookieConsent } from '../../lib/useCookieConsent';
import s from './CookieConsent.module.css';

/**
 * Баннер согласия на cookies и аналитику + условная загрузка Яндекс.Метрики.
 * Метрика инициализируется только после явного «Принять» — до выбора счётчик не грузится.
 * Оформлен как тост дизайн-системы: панель surface-overlay слева снизу, чтобы не
 * спорить с плавающей кнопкой amoCRM справа. Primary-кнопка на экране одна — в шапке,
 * поэтому здесь secondary и quiet.
 */
export const CookieConsent: FC = () => {
  const t = useTranslations('cookie');
  const { consent, accept, reject } = useCookieConsent();

  return (
    <>
      {consent === 'accepted' && <YandexMetrika />}

      {consent === 'unknown' && (
        <div className={s.root} role="region" aria-label={t('aria')}>
          <Icon name="info-circle" size={20} className={s.icon} />

          <p className={s.text}>
            {t('text')}{' '}
            <Link href="/privacy" className={s.link}>
              {t('policy')}
            </Link>
          </p>

          <div className={s.actions}>
            <Button variant="quiet" size="s" onClick={reject}>
              {t('reject')}
            </Button>

            <Button variant="secondary" size="s" onClick={accept}>
              {t('accept')}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
