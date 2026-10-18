import { getLocale, getTranslations } from 'next-intl/server';
import { Button } from '@sw/components/Button';
import { localizeHref } from '@/shared/ui/Link/localizeHref';
import { StatusScreen } from '@/shared/ui/StatusScreen';

interface NotFoundPageProps {
  /** Страница рендерится вне layout локали — без шапки, поэтому нужен логотип. */
  standalone?: boolean;
}

export const NotFoundPage = async ({ standalone = false }: NotFoundPageProps) => {
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);

  // Вне сегмента [locale] клиентский useLocale недоступен — префиксуем href вручную,
  // иначе EN-404 уводит на RU-главную.
  const homeHref = localizeHref('/', locale);

  return (
    <StatusScreen
      code="404"
      title={t('404.page-not-found')}
      text={t('404.description')}
      logoHref={standalone ? homeHref : undefined}
      actions={
        <>
          <Button href={homeHref} icon="arrow-left">
            {t('404.back-home')}
          </Button>

          <Button variant="secondary" href={localizeHref('/blog', locale)}>
            {t('404.to-blog')}
          </Button>
        </>
      }
    />
  );
};
