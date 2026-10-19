import { existsSync } from 'node:fs';
import { join } from 'node:path';
import ru from '../../../../messages/ru.json';
import en from '../../../../messages/en.json';
import { CASE_SHOTS, CASE_SHOT_WIDTHS, PUBLISHED_CASE_SLUGS } from '../model/cases';
import type { CaseDetail } from '../model/types';

const PUBLIC = join(__dirname, '../../../../public');

describe('кейсы', () => {
  it('у каждого опубликованного кейса есть тексты на обоих языках', () => {
    for (const messages of [ru, en]) {
      const details = messages.cases.details as Record<string, CaseDetail>;

      for (const slug of PUBLISHED_CASE_SLUGS) {
        expect(messages.cases.items.some((item) => item.slug === slug)).toBe(true);
        expect(details[slug]?.blocks.length).toBeGreaterThan(0);
      }
    }
  });

  it('каждый скриншот подписан и лежит в public в обоих размерах', () => {
    for (const [slug, shots] of Object.entries(CASE_SHOTS)) {
      if (!shots) continue;

      expect(shots.shots[shots.cover]).toBeDefined();

      for (const [id, spec] of Object.entries(shots.shots)) {
        for (const width of CASE_SHOT_WIDTHS[spec.device]) {
          expect(existsSync(join(PUBLIC, 'cases', slug, `${id}-${width}.webp`))).toBe(true);
        }

        for (const messages of [ru, en]) {
          const gallery = (messages.cases.details as Record<string, CaseDetail>)[slug].gallery;
          expect(gallery?.some((item) => item.id === id)).toBe(true);
        }
      }
    }
  });
});
