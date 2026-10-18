export type PaletteCommandGroup = 'navigation' | 'service' | 'post' | 'locale';

export interface PaletteCommand {
  id: string;
  label: string;
  group: PaletteCommandGroup;
  /** Иконка из набора дизайн-системы. */
  icon: string;
  /** Дополнительные ключевые слова для поиска (синонимы, перевод, аббревиатуры). */
  keywords?: string;
  /** Действие, выполняемое при выборе пункта. */
  onSelect: () => void;
}
