import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import { toLocale } from '@/i18n-routing';
import { SOON_LOCALE_HEADER } from '@/shared/config/soon';
import { SoonPage } from '@/views/SoonPage';

/** Локаль исходного URL прокидывает middleware: сегмента `[locale]` у тизера нет. */
const getRequestedLocale = () => {
  return toLocale(headers().get(SOON_LOCALE_HEADER));
};

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations({ locale: getRequestedLocale(), namespace: 'soon' });

  return {
    title: t('title'),
    description: t('lead'),
  };
};

const Page = () => {
  return <SoonPage locale={getRequestedLocale()} />;
};

export default Page;
