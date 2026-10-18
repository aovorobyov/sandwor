import ru from '../../../../messages/ru.json';
import en from '../../../../messages/en.json';

/** Пути ко всем листьям словаря: `services.items.crm.title`, `faq.items.0.q`. */
const collectKeys = (value: unknown, prefix = ''): string[] => {
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) => {
      return collectKeys(child, prefix ? `${prefix}.${key}` : key);
    });
  }

  return [prefix];
};

describe('переводы', () => {
  it('у ru и en одинаковый набор ключей', () => {
    const ruKeys = collectKeys(ru).sort();
    const enKeys = collectKeys(en).sort();

    expect(ruKeys.filter((key) => !enKeys.includes(key))).toEqual([]);
    expect(enKeys.filter((key) => !ruKeys.includes(key))).toEqual([]);
  });

  it('у каждого направления есть все тексты страницы', () => {
    const required = ['title', 'text', 'includes', 'meta-title', 'meta-description', 'hero-title'];

    for (const id of ['crm', 'sites', 'smm', 'ai'] as const) {
      for (const key of required) {
        expect(ru.services.items[id]).toHaveProperty(key);
      }
    }
  });
});
