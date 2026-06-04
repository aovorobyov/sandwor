import type { DotIconName } from '@/shared/ui';

export type PaletteCommandGroup = 'navigation' | 'post' | 'theme' | 'locale' | 'accent';

export interface PaletteCommand {
  id: string;
  label: string;
  group: PaletteCommandGroup;
  /** Дополнительные ключевые слова для поиска (синонимы, перевод, аббревиатуры). */
  keywords?: string;
  icon?: DotIconName;
  /** Действие, выполняемое при выборе пункта. */
  onSelect: () => void;
}
