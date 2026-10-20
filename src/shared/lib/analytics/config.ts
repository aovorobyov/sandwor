/**
 * Счётчик Яндекс Метрики.
 *
 * Номер вписан в код: он и так виден в исходнике любой страницы, а переменная
 * NEXT_PUBLIC_YM_ID подставляется в браузерный код только при сборке — в CI её нет,
 * и раньше из-за этого цели из браузера не доходили. NEXT_PUBLIC_YM_ID по-прежнему
 * может переопределить номер (например, для тестового счётчика).
 */
const PRODUCTION_YM_ID = 110349494;

/** Домены, где счётчик включён; на localhost и превью статистика не засоряется. */
const PRODUCTION_HOSTS = ['sandwor.ru'];

export const YM_ID = Number(process.env.NEXT_PUBLIC_YM_ID) || PRODUCTION_YM_ID;

/** Включать ли Метрику в этом браузере: боевой домен или явно заданный счётчик. */
export const isAnalyticsHost = (): boolean => {
  if (typeof window === 'undefined') return false;
  if (Number(process.env.NEXT_PUBLIC_YM_ID)) return true;

  const host = window.location.hostname;
  return PRODUCTION_HOSTS.some((domain) => host === domain || host.endsWith(`.${domain}`));
};
