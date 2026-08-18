import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from 'next-view-transitions';
import { Mono } from '@/shared/ui/Mono';
import { localizeHref } from '@/shared/ui/Link/localizeHref';
import styles from './not-found.module.css';

export default async function NotFound() {
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);

  // not-found живёт вне сегмента [locale], поэтому клиентский useLocale здесь недоступен —
  // берём локаль на сервере и префиксуем href вручную, иначе EN-404 уводит на RU-главную.
  const homeHref = localizeHref('/', locale);
  const blogHref = localizeHref('/blog', locale);

  return (
    <main className={styles.root}>
      <div className={styles.glow} aria-hidden />

      <div className={styles.inner}>
        <div className={styles.code} role="img" aria-label="404">
          404
        </div>

        <h1 className={styles.title}>{t('404.page-not-found')}</h1>

        <p className={styles.text}>{t('404.description')}</p>

        <div className={styles.actions}>
          <Link href={homeHref} className={styles.primary}>
            <Mono>←</Mono>
            {t('404.back-home')}
          </Link>

          <Link href={blogHref} className={styles.secondary}>
            {t('404.to-blog')}
          </Link>
        </div>
      </div>
    </main>
  );
}
