import { getTranslations } from 'next-intl/server';
import styles from './ContactPage.module.css';

export async function ContactPage() {
  const t = await getTranslations();

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('contact.title')}</h1>

        <ul className={styles.linkList}>
          <li>
            <a
              href="https://github.com/aovorobyov"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/sandwor/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://t.me/sandwor"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Telegram
            </a>
          </li>
          <li>
            <a
              href="mailto:aovorobyov@mail.ru"
              className={styles.link}
            >
              Mail
            </a>
          </li>
          <li>
            <a
              href="https://vk.com/sandwor"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              VK
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
}
