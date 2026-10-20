import { getClientIp, isRateLimited } from '../rateLimit';

describe('ограничитель частоты брифа', () => {
  it('пропускает пять заявок за 10 минут и останавливает шестую', () => {
    const now = 1_000_000;
    const results = Array.from({ length: 6 }, (_, i) => isRateLimited('1.1.1.1', now + i));

    expect(results).toEqual([false, false, false, false, false, true]);
    expect(isRateLimited('2.2.2.2', now)).toBe(false);
  });

  it('снова пропускает, когда окно прошло', () => {
    const start = 5_000_000;
    for (let i = 0; i < 5; i += 1) isRateLimited('3.3.3.3', start);

    expect(isRateLimited('3.3.3.3', start + 1)).toBe(true);
    expect(isRateLimited('3.3.3.3', start + 10 * 60 * 1000 + 1)).toBe(false);
  });

  it('берёт IP из заголовков прокси', () => {
    expect(getClientIp(new Headers({ 'x-forwarded-for': '9.9.9.9, 10.0.0.1' }))).toBe('9.9.9.9');
    expect(getClientIp(new Headers({ 'x-real-ip': '8.8.8.8' }))).toBe('8.8.8.8');
  });
});
