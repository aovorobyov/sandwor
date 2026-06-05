import { RELEASES } from '../model/releases';
import type { Note } from '../model/types';

/** Перевод по ключу вида `entries.v1-8-1` (namespace `news`). */
export type ReleaseTranslate = (key: string) => string;

/** Собирает релизные заметки из курируемого списка версий; тексты приходят из i18n. */
export const buildReleaseNotes = (translate: ReleaseTranslate): Note[] => {
  return RELEASES.map((release) => {
    return {
      id: `v${release.version}`,
      version: release.version,
      date: release.date,
      text: translate(`entries.v${release.version.replace(/\./g, '-')}`),
    };
  });
};
