import { act, render } from '@testing-library/react';
import { Typewriter } from '../Typewriter';

describe('Typewriter', () => {
  beforeAll(() => {
    // jsdom не реализует matchMedia — анимация считает, что reduced-motion выключен
    window.matchMedia = jest
      .fn()
      .mockReturnValue({ matches: false }) as unknown as typeof window.matchMedia;
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders the first word statically before animation starts', () => {
    const { container } = render(<Typewriter words={['первый', 'второй']} />);
    expect(container.textContent).toContain('первый');
  });

  it('starts erasing the first word after the initial pause', () => {
    const { container } = render(<Typewriter words={['первый', 'второй']} />);

    // После первой паузы (1600мс) запускается стирание — слово укорачивается
    act(() => {
      jest.advanceTimersByTime(1600 + 45);
    });

    expect(container.textContent).toContain('пер');
    expect(container.textContent).not.toContain('первый');
  });

  it('keeps a single word static (no animation)', () => {
    const { container } = render(<Typewriter words={['единственное']} />);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(container.textContent).toContain('единственное');
  });
});
