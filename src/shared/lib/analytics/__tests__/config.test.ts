import { YM_ID, isAnalyticsHost } from '../config';

describe('счётчик Метрики', () => {
  it('номер есть и без переменной окружения', () => {
    expect(YM_ID).toBe(110349494);
  });

  it('на localhost счётчик выключен', () => {
    expect(window.location.hostname).toBe('localhost');
    expect(isAnalyticsHost()).toBe(false);
  });
});
