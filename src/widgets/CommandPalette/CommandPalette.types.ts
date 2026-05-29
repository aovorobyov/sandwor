export type PaletteCommandGroup = 'navigation' | 'post' | 'theme' | 'locale' | 'accent';

export interface PaletteCommand {
  id: string;
  label: string;
  group: PaletteCommandGroup;
  /** Дополнительные ключевые слова для поиска (синонимы, перевод, аббревиатуры). */
  keywords?: string;
  icon?: string;
  /** Действие, выполняемое при выборе пункта. */
  onSelect: () => void;
}
