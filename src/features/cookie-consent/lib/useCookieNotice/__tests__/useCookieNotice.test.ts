import { act, renderHook } from '@testing-library/react';
import { useCookieNotice } from '../useCookieNotice';

jest.mock('next/navigation', () => ({ usePathname: () => '/' }));

describe('useCookieNotice', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.localStorage.clear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('при первом визите показывает уведомление и ставит отметку', () => {
    const { result } = renderHook(() => useCookieNotice());

    expect(result.current.state).toBe('visible');
    expect(result.current.isAnalyticsAllowed).toBe(false);
    expect(window.localStorage.getItem('cookie-notice')).not.toBeNull();
  });

  it('разрешает аналитику через 5 секунд и скрывается само через 30', () => {
    const { result } = renderHook(() => useCookieNotice());

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(result.current.isAnalyticsAllowed).toBe(true);
    expect(result.current.state).toBe('visible');

    act(() => {
      jest.advanceTimersByTime(25000);
    });
    expect(result.current.state).toBe('hidden');
  });

  it('закрывается по Esc', () => {
    const { result } = renderHook(() => useCookieNotice());

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

    expect(result.current.state).toBe('hidden');
    expect(result.current.isAnalyticsAllowed).toBe(true);
  });

  it('в повторный визит не показывается, аналитика — сразу', () => {
    window.localStorage.setItem('cookie-notice', new Date().toISOString());

    const { result } = renderHook(() => useCookieNotice());

    expect(result.current.state).toBe('hidden');
    expect(result.current.isAnalyticsAllowed).toBe(true);
  });

  it('через год показывает уведомление снова', () => {
    const yearAgo = new Date(Date.now() - 366 * 24 * 60 * 60 * 1000);
    window.localStorage.setItem('cookie-notice', yearAgo.toISOString());

    const { result } = renderHook(() => useCookieNotice());

    expect(result.current.state).toBe('visible');
  });
});
