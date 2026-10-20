import { toMetaDescription } from '../metaDescription';

describe('toMetaDescription', () => {
  it('короткий текст не трогает', () => {
    expect(toMetaDescription('Сайт для зала')).toBe('Сайт для зала');
  });

  it('длинный режет по слову до 160 символов с многоточием', () => {
    const long = 'слово '.repeat(60);
    const result = toMetaDescription(long);

    expect(result.length).toBeLessThanOrEqual(160);
    expect(result.endsWith('слово…')).toBe(true);
  });
});
