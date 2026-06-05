import { getTranslations } from 'next-intl/server';
import { Playground } from './components/Playground/Playground';
import s from './UIKitPage.module.css';

export const UIKitPage = async () => {
  const t = await getTranslations('uikit');

  return (
    <div className={s.root}>
      <section className={s.header}>
        <div className={s.container}>
          <h1 className={s.title}>{t('title')}</h1>

          <p className={s.description}>{t('description')}</p>
        </div>
      </section>

      <section className={s.playgroundSection}>
        <div className={s.container}>
          <h2 className={s.playgroundTitle}>{t('playground')}</h2>

          <p className={s.description}>{t('playground-description')}</p>

          <div className={s.playgroundBox}>
            <Playground />
          </div>
        </div>
      </section>
    </div>
  );
};
