import { useEffect, useState } from 'react';

/** Скорость печати символа, мс. */
const TYPING_MS = 90;
/** Скорость стирания символа, мс. */
const DELETING_MS = 45;
/** Пауза на полностью напечатанном слове перед стиранием, мс. */
const PAUSE_MS = 1600;

/**
 * Эффект печатной машинки: по символу печатает слово, держит паузу, стирает и берёт следующее.
 * SSR и первый кадр клиента отдают первое слово целиком — без мерцания и hydration mismatch.
 * При prefers-reduced-motion анимация не запускается: остаётся статичное первое слово.
 */
export const useTypewriter = (words: string[]) => {
  const [text, setText] = useState(words[0] || '');

  useEffect(() => {
    if (words.length <= 1) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let wordIndex = 0;
    let charIndex = words[0].length;
    // Первое слово уже показано целиком — стартуем со стирания, иначе печать «зависнет» на нём
    let isDeleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = words[wordIndex];

      if (isDeleting) {
        charIndex -= 1;
        setText(current.slice(0, charIndex));

        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          timer = setTimeout(tick, TYPING_MS);

          return;
        }

        timer = setTimeout(tick, DELETING_MS);

        return;
      }

      charIndex += 1;
      setText(current.slice(0, charIndex));

      if (charIndex === current.length) {
        isDeleting = true;
        timer = setTimeout(tick, PAUSE_MS);

        return;
      }

      timer = setTimeout(tick, TYPING_MS);
    };

    // Стартуем с паузы на уже напечатанном первом слове
    timer = setTimeout(tick, PAUSE_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [words]);

  return { text };
};
