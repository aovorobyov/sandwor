import { buildLocalePath } from '@/features/locale-switch';
import { delocalizePath, localizeHref } from '../localizeHref';

describe('пути локалей', () => {
  it('снимает префикс и у дефолтной локали — так путь выглядит при серверном рендере', () => {
    expect(delocalizePath('/ru', 'ru')).toBe('/');
    expect(delocalizePath('/ru/services/sites', 'ru')).toBe('/services/sites');
    expect(delocalizePath('/services', 'ru')).toBe('/services');
    expect(delocalizePath('/en/blog', 'en')).toBe('/blog');
  });

  it('ссылка на другой язык не получает лишний префикс', () => {
    expect(buildLocalePath('/ru', 'ru', 'en')).toBe('/en');
    expect(buildLocalePath('/ru/cases', 'ru', 'en')).toBe('/en/cases');
    expect(buildLocalePath('/en/cases', 'en', 'ru')).toBe('/cases');
    expect(localizeHref('/cases', 'en')).toBe('/en/cases');
  });
});
