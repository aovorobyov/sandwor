/** Join class names, skipping falsy values. */
export function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

/**
 * The four service lines. They are NOT colour-coded: a service is told apart
 * by its icon and its label only. Use these ids everywhere (badges, chips,
 * tabs, team cards, case cards).
 */
export const SERVICES = {
  crm: { id: 'crm', label: 'CRM', icon: 'layout-kanban' },
  sites: { id: 'sites', label: 'Сайты', icon: 'browser' },
  smm: { id: 'smm', label: 'SMM', icon: 'message-circle' },
  ai: { id: 'ai', label: 'ИИ', icon: 'cpu' },
};

/** Format a number the Russian way with a no-break space: 120000 → "120 000". */
export function formatNumber(n) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
}

/**
 * Russian plural form for a count: plural(n, ['кейс', 'кейса', 'кейсов']).
 * 1 кейс · 3 кейса · 5 кейсов · 11 кейсов · 21 кейс; fractions take the second form («2,5 недели»).
 */
export function plural(n, forms) {
  if (!Number.isInteger(n)) return forms[1];
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return forms[2];
  if (b === 1) return forms[0];
  if (b > 1 && b < 5) return forms[1];
  return forms[2];
}

/** "от 45 000 ₽" style price string (no-break space before ₽). */
export function formatRub(n) {
  return formatNumber(n) + ' ₽';
}
