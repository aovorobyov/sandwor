import { setRequestLocale } from 'next-intl/server';
import { UIKitPage } from '@/views/UIKitPage';

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <UIKitPage />;
}
