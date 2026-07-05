'use client';

import { Link } from '@/shared/ui/Link';
import { useEffect } from 'react';
import styles from './error.module.css';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.root}>
      <p className={styles.code}>Error</p>
      <h1 className={styles.title}>Something went wrong</h1>
      <p className={styles.text}>An unexpected error occurred. Try refreshing the page.</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={reset}>
          Try again
        </button>
        <Link href="/" className={styles.link}>
          ← Back home
        </Link>
      </div>
    </main>
  );
}
