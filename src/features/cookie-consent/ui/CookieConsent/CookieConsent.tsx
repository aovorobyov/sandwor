'use client';

import type { FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@sw/components/Button';
import { Icon } from '@sw/components/Icon';
import type { Locale } from '@/i18n-routing';
import { consentPath } from '@/shared/config/legal';
import { YandexMetrika } from '@/shared/lib/analytics';
import { AmoCrmButton } from '@/shared/lib/crm';
import { Link } from '@/shared/ui/Link';
import { useCookieNotice } from '../../lib/useCookieNotice';
import s from './CookieConsent.module.css';

/** Текст согласия на cookie и веб-аналитику (отдельно от политики). */
const POLICY_HREF = consentPath('cookies');

/**
 * Уведомление о cookie («Продолжая пользоваться сайтом…» + «Хорошо») и то,
 * что от него зависит: Яндекс Метрика стартует при продолжении пользования
 * сайтом, а плавающая кнопка чата amoCRM появляется только после того, как
 * уведомление скрылось, — чтобы не спорить с ним за угол экрана.
 */
export const CookieConsent: FC = () => {
  const t = useTranslations('cookie');
  const locale = useLocale() as Locale;
  const { state, hide, isAnalyticsAllowed } = useCookieNotice();

  return (
    <>
      {isAnalyticsAllowed && <YandexMetrika />}

      {state === 'hidden' && <AmoCrmButton locale={locale} />}

      {state === 'visible' && (
        <div className={s.root} role="region" aria-label={t('aria')} data-cookie-notice>
          <Icon name="info-circle" size={20} className={s.icon} />

          <p className={s.text}>
            {t('text')}{' '}
            <Link href={POLICY_HREF} className={s.link}>
              {t('more')}
            </Link>
          </p>

          <Button variant="secondary" size="s" onClick={hide} aria-label={t('ok-aria')}>
            {t('ok')}
          </Button>
        </div>
      )}
    </>
  );
};
