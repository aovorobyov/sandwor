/** Варианты OG-обложки: продающая, контентная (статья/кейс) и общая страница. */
export type OgVariant = 'offer' | 'content' | 'page';

/** Локали, для которых есть маркетинговый текст обложки. */
export type OgLocale = 'ru' | 'en';

/** Ячейка полоски фактов: цифра и подпись под ней. */
export interface CardFact {
  value: string;
  label: string;
}

/** Собранные поля карточки — то, что рендерер получает после разбора query. */
export interface CardParams {
  eyebrow: string;
  title: string;
  lead: string;
  meta: string;
  facts: CardFact[];
  tagline: string;
}

/** Маркетинговый текст продающей обложки для одной локали. */
export interface OfferCopy {
  eyebrow: string;
  title: string;
  lead: string;
  tagline: string;
  facts: CardFact[];
}
