import { NotFoundPage } from '@/views/NotFoundPage';

/** Адреса вне маршрутов локалей: страница без шапки, с логотипом. */
export default function NotFound() {
  return (
    <main style={{ flex: 1 }}>
      <NotFoundPage standalone />
    </main>
  );
}
