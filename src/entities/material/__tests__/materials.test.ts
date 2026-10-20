import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { MATERIAL_IDS, getMaterialCover, getMaterialFile, getMaterialGoal } from '../index';

describe('материалы', () => {
  it('у каждого материала есть PDF и обложка на обоих языках', () => {
    for (const id of MATERIAL_IDS) {
      for (const locale of ['ru', 'en']) {
        expect(existsSync(join(process.cwd(), 'public', getMaterialFile(id, locale)))).toBe(true);
        expect(existsSync(join(process.cwd(), 'public', getMaterialCover(id, locale)))).toBe(true);
      }
    }
  });

  it('цели Метрики без дефисов', () => {
    expect(getMaterialGoal('get', 'site-law')).toBe('magnet_get_site_law');
  });
});
