/**
 * Страницы, убранные из основной навигации, но доступные по прямой ссылке.
 * Собраны здесь, чтобы не терялись после урезания шапки до 4 пунктов.
 */
export const SECONDARY_LINKS = [
  { href: '/projects', labelKey: 'nav.projects' },
  { href: '/news', labelKey: 'nav.news' },
  { href: '/timeline', labelKey: 'nav.timeline' },
  { href: '/course/ai-basics', labelKey: 'nav.course' },
  { href: '/uikit', labelKey: 'nav.uikit' },
] as const;
