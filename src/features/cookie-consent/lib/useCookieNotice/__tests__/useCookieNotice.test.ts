import { act, renderHook } from '@testing-library/react';
import { useCookieNotice } from '../useCookieNotice';

let mockPathname = '/';
jest.mock('next/navigation', () => ({ usePathname: () => mockPathname }));

describe('useCookieNotice', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.localStorage.clear();
    mockPathname = '/';
    document.body.innerHTML = '';
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('при первом визите показывает уведомление, но отметку о согласии ещё не ставит', () => {
    const { result } = renderHook(() => useCookieNotice());

    expect(result.current.state).toBe('visible');
    expect(result.current.isAnalyticsAllowed).toBe(false);
    expect(window.localStorage.getItem('cookie-notice')).toBeNull();
  });

  it('отметка появляется, когда человек продолжил пользоваться сайтом', () => {
    renderHook(() => useCookieNotice());

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(window.localStorage.getItem('cookie-notice')).not.toBeNull();
  });

  it('кто ушёл, ничего не сделав, в следующий визит снова видит уведомление', () => {
    const first = renderHook(() => useCookieNotice());
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    first.unmount();

    const { result } = renderHook(() => useCookieNotice());

    expect(result.current.state).toBe('visible');
    expect(result.current.isAnalyticsAllowed).toBe(false);
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

  it('в повторный визит не показывается, аналитика — сразу, отметка не продлевается', () => {
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    window.localStorage.setItem('cookie-notice', monthAgo);

    const { result } = renderHook(() => useCookieNotice());

    expect(result.current.state).toBe('hidden');
    expect(result.current.isAnalyticsAllowed).toBe(true);
    expect(window.localStorage.getItem('cookie-notice')).toBe(monthAgo);
  });

  it('через год показывает уведомление снова', () => {
    const yearAgo = new Date(Date.now() - 366 * 24 * 60 * 60 * 1000);
    window.localStorage.setItem('cookie-notice', yearAgo.toISOString());

    const { result } = renderHook(() => useCookieNotice());

    expect(result.current.state).toBe('visible');
  });

  it('Tab и клавиши внутри уведомления согласием не считаются', () => {
    const { result } = renderHook(() => useCookieNotice());

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    });
    expect(result.current.isAnalyticsAllowed).toBe(false);

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    });
    expect(result.current.isAnalyticsAllowed).toBe(true);
  });

  it('Esc, уже обработанный модальным окном, уведомление не закрывает', () => {
    const { result } = renderHook(() => useCookieNotice());
    const event = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true });
    event.preventDefault();

    act(() => {
      document.dispatchEvent(event);
    });

    expect(result.current.state).toBe('visible');
  });

  it('переход по «Подробнее» на условия не включает аналитику, следующий переход — включает', () => {
    document.body.innerHTML =
      '<div data-cookie-notice><a id="more" href="/consent">Подробнее</a></div>';
    const { result, rerender } = renderHook(() => useCookieNotice());

    act(() => {
      document.getElementById('more')!.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    });
    mockPathname = '/consent';
    rerender();
    act(() => {
      jest.advanceTimersByTime(6000);
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current.isAnalyticsAllowed).toBe(false);

    mockPathname = '/services';
    rerender();
    expect(result.current.isAnalyticsAllowed).toBe(true);
  });
});
