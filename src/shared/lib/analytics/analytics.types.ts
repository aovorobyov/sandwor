/** Идентификаторы JS-целей Яндекс.Метрики. Значения совпадают с настройкой целей в интерфейсе счётчика. */
export const YM_GOAL = {
  orderWebsites: 'order_websites',
  orderHome: 'order_home',
  contact: 'contact',
} as const;

export type YmGoal = (typeof YM_GOAL)[keyof typeof YM_GOAL];

declare global {
  interface Window {
    /** Глобальный клиент Метрики; отсутствует, пока не загрузился tag.js или счётчик отключён. */
    ym?: (id: number, action: string, ...params: unknown[]) => void;
  }
}
