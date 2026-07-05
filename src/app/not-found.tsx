import { Link } from 'next-view-transitions';

import { getLocale, getTranslations } from 'next-intl/server';

import { DotIcon } from '@/shared/ui';
import { localizeHref } from '@/shared/ui/Link/localizeHref';

import styles from './not-found.module.css';

export default async function NotFound() {
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);

  // not-found живёт вне сегмента [locale], поэтому клиентский useLocale здесь недоступен —
  // берём локаль на сервере и префиксуем href вручную, иначе EN-404 уводит на RU-главную.
  const homeHref = localizeHref('/', locale);

  return (
    <main className={styles.root}>
      <span className={styles.code} role="img" aria-label="404">
        <DotIcon name="notFound" className={styles.figure} />
      </span>
      <h1 className={styles.title}>{t('404.page-not-found')}</h1>
      <p className={styles.text}>{t('404.page-not-found-description')}</p>
      <Link href={homeHref} className={styles.link}>
        {t('404.back-home')}
      </Link>
    </main>
  );
}
