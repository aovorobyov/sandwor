import Link from 'next/link';

import { getTranslations } from 'next-intl/server';

import styles from './not-found.module.css';

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <main className={styles.root}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>{t('404.page-not-found')}</h1>
      <p className={styles.text}>{t('404.page-not-found-description')}</p>
      <Link href="/" className={styles.link}>
        {t('404.back-home')}
      </Link>
    </main>
  );
}
