import { getTranslations } from 'next-intl/server';
import { ContactForm } from '@/features/contact-form';
import styles from './ContactPage.module.css';

export async function ContactPage() {
  const t = await getTranslations();

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('contact.title')}</h1>

        <div className={styles.layout}>
          <aside className={styles.links}>
            <ul className={styles.linkList}>
              <li>
                <a
                  href="mailto:sandwor@mail.ru"
                  className={styles.link}
                >
                  sandwor@mail.ru
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
                  href="https://github.com/aovorobyov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  GitHub
                </a>
              </li>
            </ul>
          </aside>

          <section>
            <ContactForm />
          </section>
        </div>
      </div>
    </main>
  );
}
