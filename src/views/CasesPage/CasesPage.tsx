import { getTranslations } from 'next-intl/server';
import s from './CasesPage.module.css';

export const CasesPage = async () => {
  const t = await getTranslations();

  return (
    <main className={s.root}>
      <div className={s.container}>
        <h1 className={s.title}>{t('cases.title')}</h1>

        <p className={s.soon}>{t('cases.soon')}</p>
      </div>
    </main>
  );
};
