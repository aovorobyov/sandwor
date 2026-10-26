import { getTranslations } from 'next-intl/server';
import { Button } from '@sw/components/Button';
import { Canvas } from '@sw/components/Canvas';
import { Logo } from '@sw/components/Logo';
import { SOON_EMAIL, SOON_TELEGRAM_URL } from '@/shared/config/soon';
import type { SoonPageProps } from './SoonPage.types';
// Порядок важен: токены и шрифты ДС → сброс отступов на :where() → стили компонентов ДС.
import '@/shared/sandwor/tokens/tokens.css';
import './reset.css';
import '@/shared/sandwor/src/sandwor.css';
import s from './SoonPage.module.css';

/**
 * Экран-заглушка на время пересборки: знак sandwor studio по центру точечной канвы,
 * плавающее свечение на фоне и два канала связи — Telegram и почта.
 * Отдаётся вместо любой страницы, пока включён `IS_SITE_CLOSED`.
 */
export const SoonPage = async (props: SoonPageProps) => {
  const { locale } = props;

  const t = await getTranslations({ locale, namespace: 'soon' });

  return (
    <Canvas className={s.root}>
      <div className={s.glow} aria-hidden />
      <div className={`${s.glow} ${s.glowAlt}`} aria-hidden />

      <main className={s.main}>
        <Logo size={32} studio="animate" className={s.logo} />

        <h1 className={s.title}>{t('title')}</h1>

        <p className={s.lead}>{t('lead')}</p>

        <div className={s.actions}>
          <Button
            size="l"
            icon="brand-telegram"
            href={SOON_TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('telegram')}
          </Button>

          <Button
            size="l"
            variant="secondary"
            iconOnly
            icon="mail"
            href={`mailto:${SOON_EMAIL}`}
            aria-label={t('email-aria')}
          />
        </div>
      </main>

      <footer className={s.footer}>{t('copyright', { year: new Date().getFullYear() })}</footer>
    </Canvas>
  );
};
