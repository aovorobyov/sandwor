import { setRequestLocale } from 'next-intl/server';
import { HomePage } from '@/views/HomePage';

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <HomePage />;
}
