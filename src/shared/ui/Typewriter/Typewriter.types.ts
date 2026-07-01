export interface TypewriterProps {
  /** Слова, которые поочерёдно печатаются и стираются. Первое — статичный фолбэк до старта анимации. */
  words: string[];
  className?: string;
}
