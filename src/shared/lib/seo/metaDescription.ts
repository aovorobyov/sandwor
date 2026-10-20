/** Поисковики показывают в сниппете около 160 символов — остальное обрезают сами, посреди слова. */
const MAX_LENGTH = 160;

/**
 * Мета-описание из длинного текста (лид кейса, вступление документа): до 160 символов,
 * обрезка по границе слова с многоточием.
 */
export const toMetaDescription = (text: string, max = MAX_LENGTH): string => {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) {
    return clean;
  }

  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');

  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:—–-]+$/, '')}…`;
};
