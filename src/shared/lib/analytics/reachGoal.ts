import { YM_ID, isAnalyticsHost } from './config';
import type { YmGoal } from './analytics.types';

/** Сколько ждать загрузки Метрики для цели, случившейся раньше неё (мс). */
const WAIT_MS = 30_000;
const STEP_MS = 1_000;

/**
 * Отправляет достижение JS-цели в Яндекс.Метрику. `params` — параметры визита
 * (например, какой вариант материала увидел человек).
 *
 * Метрика подключается только после согласия на cookie, поэтому цель, случившаяся
 * раньше, ждёт её до 30 секунд; не дождалась — не отправляется. Без ID и вне браузера
 * тихо выходит; на localhost и превью — тоже (см. isAnalyticsHost).
 */
export const reachGoal = (goal: YmGoal | string, params?: Record<string, unknown>, waited = 0) => {
  if (!YM_ID || !isAnalyticsHost()) {
    return;
  }

  if (!window.ym) {
    if (waited < WAIT_MS) {
      setTimeout(() => reachGoal(goal, params, waited + STEP_MS), STEP_MS);
    }
    return;
  }

  if (params) {
    window.ym(YM_ID, 'reachGoal', goal, params);
  } else {
    window.ym(YM_ID, 'reachGoal', goal);
  }
};
