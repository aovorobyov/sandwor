/**
 * Позиционирование сайта.
 * - `sites` — сейчас: работает только разработка сайтов, герой и тексты про сайты,
 *   остальные направления — «Скоро» (см. SERVICE_STATUS в entities/service).
 * - `studio` — студия с 4 направлениями: «Наводим порядок в продажах», схема пути
 *   заявки, калькулятор, общие этапы и FAQ.
 *
 * Тексты обоих вариантов лежат в переводах рядом: ключи `…-sites` / `…-studio`
 * (`home.hero-sites`, `process.steps-studio`, `faq.items-studio`, …).
 * Вернуть студию: POSITIONING = 'studio' и нужные направления в `active`.
 */
export type Positioning = 'sites' | 'studio';

// `as` — чтобы TypeScript не сужал тип до литерала и сравнения ниже оставались валидными.
export const POSITIONING = 'sites' as Positioning;

/** Блоки, которые имеют смысл только для студии. */
export const FEATURES = {
  /** Калькулятор стоимости (считает CRM, сайт, SMM и ИИ вместе). */
  calculator: POSITIONING === 'studio',
  /** Схема «Путь заявки» на главной: сайт → ИИ → CRM → менеджер. */
  leadFlow: POSITIONING === 'studio',
} as const;

/** Значение для текущего позиционирования: ключ перевода, ссылка, набор данных. */
export const byPositioning = <T>(values: Record<Positioning, T>): T => {
  return values[POSITIONING];
};
