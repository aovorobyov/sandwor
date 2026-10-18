'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@sw/components/Button';
import { useLocalePaths } from '@/shared/lib/i18n';
import { StatusScreen } from '@/shared/ui/StatusScreen';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  const t = useTranslations();
  const { href } = useLocalePaths();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusScreen
      code="Error"
      title={t('error-page.title')}
      text={t('error-page.description')}
      actions={
        <>
          <Button icon="refresh" onClick={reset}>
            {t('error-page.retry')}
          </Button>

          <Button variant="secondary" href={href('/')}>
            {t('404.back-home')}
          </Button>
        </>
      }
    />
  );
}
