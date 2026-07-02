import { YM_ID } from './config';
import type { YmGoal } from './analytics.types';

/**
 * Отправляет достижение JS-цели в Яндекс.Метрику.
 * Безопасен при выключенном счётчике: без ID, вне браузера или до загрузки tag.js — тихо выходит.
 */
export const reachGoal = (goal: YmGoal) => {
  if (!YM_ID || typeof window === 'undefined' || !window.ym) {
    return;
  }

  window.ym(YM_ID, 'reachGoal', goal);
};
