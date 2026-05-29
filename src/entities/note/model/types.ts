export interface Note {
  id: string;
  date: string; // ISO
  text: string;
  /** Опционально: semver-метка для релизных заметок (страница News). */
  version?: string;
}
