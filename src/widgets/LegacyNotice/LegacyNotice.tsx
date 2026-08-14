'use client';

import type { FC } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Badge } from '@/shared/ui/Badge';
import s from './LegacyNotice.module.css';

/** Разделы, ещё не переверстанные в новом редизайне. */
const LEGACY_ROUTES = ['/projects', '/news', '/timeline', '/course', '/uikit'];

const isLegacyPath = (pathname: string) => {
  const withoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';

  return LEGACY_ROUTES.some(
    (route) => withoutLocale === route || withoutLocale.startsWith(`${route}/`),
  );
};

/** Плашка «устаревшая страница» вверху ещё не переверстанных разделов. */
export const LegacyNotice: FC = () => {
  const pathname = usePathname();
  const t = useTranslations();

  if (!isLegacyPath(pathname)) {
    return null;
  }

  return (
    <div className={s.root}>
      <div className={s.inner}>
        <Badge variant="accent">{t('legacy.notice')}</Badge>

        <span className={s.hint}>{t('legacy.hint')}</span>
      </div>
    </div>
  );
};
