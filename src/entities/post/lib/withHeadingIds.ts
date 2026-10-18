import { parse } from 'node-html-parser';

export interface PostHeading {
  id: string;
  label: string;
}

/**
 * Проставляет id всем H2 тела статьи и возвращает их списком — для оглавления
 * Article. id по порядку (`section-1`…): заголовки бывают кириллицей, а
 * транслитерация ради якоря не нужна. Свои id в разметке не трогаем.
 */
export const withHeadingIds = (html: string): { html: string; headings: PostHeading[] } => {
  const root = parse(html);
  const headings = root.querySelectorAll('h2').map((heading, index) => {
    const id = heading.getAttribute('id') || `section-${index + 1}`;
    heading.setAttribute('id', id);

    return { id, label: heading.text.trim() };
  });

  return { html: root.toString(), headings };
};
