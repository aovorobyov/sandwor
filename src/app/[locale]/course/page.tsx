import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { localizeHref } from '@/shared/ui/Link/localizeHref';

export default async function Page() {
  // В режиме `as-needed` голый redirect увёл бы EN-посетителя на RU-курс — префиксуем по локали.
  const locale = await getLocale();

  redirect(localizeHref('/course/ai-basics', locale));
}
