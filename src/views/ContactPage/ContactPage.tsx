import { getTranslations } from 'next-intl/server';
import s from './ContactPage.module.css';

export const ContactPage = async () => {
  const t = await getTranslations();

  return (
    <main className={s.root}>
      <div className={s.container}>
        <h1 className={s.title}>{t('contact.title')}</h1>

        <ul className={s.linkList}>
          <li>
            <a
              href="https://github.com/aovorobyov"
              target="_blank"
              rel="noopener noreferrer"
              className={s.link}
            >
              GitHub
            </a>
          </li>

          <li>
            <a
              href="https://www.instagram.com/sandwor/"
              target="_blank"
              rel="noopener noreferrer"
              className={s.link}
            >
              Instagram
            </a>
          </li>

          <li>
            <a
              href="https://t.me/sandwor"
              target="_blank"
              rel="noopener noreferrer"
              className={s.link}
            >
              Telegram
            </a>
          </li>

          <li>
            <a href="mailto:aovorobyov@mail.ru" className={s.link}>
              Mail
            </a>
          </li>

          <li>
            <a
              href="https://vk.com/sandwor"
              target="_blank"
              rel="noopener noreferrer"
              className={s.link}
            >
              VK
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
};
