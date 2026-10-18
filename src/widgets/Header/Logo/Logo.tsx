import { getTranslations } from 'next-intl/server';
import s from './Logo.module.css';

/**
 * Текстовый логотип: словесный знак дисплейным шрифтом + пульсирующая акцентная
 * точка. Знак локализован — в русской версии «сандвор», в английской «sandwor».
 */
export const Logo = async () => {
  const t = await getTranslations();
  const wordmark = t('brand.wordmark');

  return (
    <span className={s.root} aria-label={wordmark}>
      {wordmark}
      <span className={s.dot} aria-hidden />
    </span>
  );
};
