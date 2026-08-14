'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/shared/ui/Link';
import { Button } from '@/shared/ui/Button';
import { YandexMetrika } from '@/shared/lib/analytics';
import { useCookieConsent } from '../../lib/useCookieConsent';
import s from './CookieConsent.module.css';

/**
 * Баннер согласия на cookies и аналитику + условная загрузка Яндекс.Метрики.
 * Метрика инициализируется только после явного «Принять» — до выбора счётчик не грузится.
 * Пока решение не принято, показываем баннер со ссылкой на политику.
 */
export const CookieConsent: FC = () => {
  const t = useTranslations('cookie');
  const { consent, accept, reject } = useCookieConsent();

  const handleAccept = () => {
    accept();
  };

  const handleReject = () => {
    reject();
  };

  return (
    <>
      {consent === 'accepted' && <YandexMetrika />}

      {consent === 'unknown' && (
        <div className={s.root} role="region" aria-label={t('aria')}>
          <p className={s.text}>
            {t('text')}{' '}
            <Link href="/privacy" className={s.link}>
              {t('policy')}
            </Link>
          </p>

          <div className={s.actions}>
            <Button variant="ghost" size="sm" onClick={handleReject}>
              {t('reject')}
            </Button>

            <Button variant="primary" size="sm" onClick={handleAccept}>
              {t('accept')}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
