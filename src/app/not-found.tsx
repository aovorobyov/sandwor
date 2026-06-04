import { Link } from 'next-view-transitions';

import { getTranslations } from 'next-intl/server';

import { DotIcon } from '@/shared/ui';

import styles from './not-found.module.css';

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <main className={styles.root}>
      <span className={styles.code} role="img" aria-label="404">
        <DotIcon name="notFound" className={styles.figure} />
      </span>
      <h1 className={styles.title}>{t('404.page-not-found')}</h1>
      <p className={styles.text}>{t('404.page-not-found-description')}</p>
      <Link href="/" className={styles.link}>
        {t('404.back-home')}
      </Link>
    </main>
  );
}
