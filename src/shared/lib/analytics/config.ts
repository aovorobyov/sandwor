/**
 * Номер счётчика Яндекс.Метрики из NEXT_PUBLIC_YM_ID.
 * Инлайнится в бандл на сборке. 0 (пустой/невалидный env) — счётчик выключен.
 */
export const YM_ID = Number(process.env.NEXT_PUBLIC_YM_ID) || 0;
