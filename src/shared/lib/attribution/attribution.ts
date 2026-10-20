/**
 * Источник визита для заявки: метки UTM, первая страница и сайт, с которого пришли.
 * Фиксируется первое касание в сессии: дальше человек ходит по сайту, а источник
 * остаётся тем, с которого он пришёл. Персональных данных здесь нет: от реферера
 * берётся только домен, от страницы — только путь без параметров.
 */

export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

export type Attribution = Partial<
  Record<(typeof UTM_KEYS)[number] | 'landing' | 'referrer', string>
>;

const STORAGE_KEY = 'sw-attribution';
const MAX_VALUE = 120;

const clip = (value: string) => value.slice(0, MAX_VALUE);

/** Собирает источник из адреса страницы и реферера. */
export const readAttribution = (href: string, referrer: string): Attribution => {
  const url = new URL(href);
  const result: Attribution = { landing: clip(url.pathname) };

  for (const key of UTM_KEYS) {
    const value = url.searchParams.get(key);
    if (value) result[key] = clip(value);
  }

  try {
    const ref = referrer ? new URL(referrer) : null;
    if (ref && ref.hostname !== url.hostname) result.referrer = clip(ref.hostname);
  } catch {
    // Некорректный реферер — просто без него.
  }

  return result;
};

/** Запоминает первое касание сессии (повторные вызовы ничего не меняют). */
export const rememberAttribution = (): void => {
  try {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;
    const value = readAttribution(window.location.href, document.referrer);
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Хранилище недоступно (приватный режим) — заявка уйдёт без источника.
  }
};

export const getAttribution = (): Attribution | undefined => {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : undefined;
  } catch {
    return undefined;
  }
};
