/** Идентификаторы JS-целей Яндекс.Метрики. Значения совпадают с настройкой целей в интерфейсе счётчика. */
export const YM_GOAL = {
  /** Отправка брифа «Обсудим ваш проект». Имя осталось от формы заявки на сайт v1. */
  orderWebsites: 'order_websites',
} as const;

export type YmGoal = (typeof YM_GOAL)[keyof typeof YM_GOAL];

declare global {
  interface Window {
    /** Глобальный клиент Метрики; отсутствует, пока не загрузился tag.js или счётчик отключён. */
    ym?: (id: number, action: string, ...params: unknown[]) => void;
  }
}
