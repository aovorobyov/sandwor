export interface Note {
  id: string;
  date: string; // ISO
  text: string;
  /** Опционально: semver-метка для релизных заметок (страница News). */
  version?: string;
}

/** Запись курируемого списка релизов. */
export interface Release {
  version: string;
  date: string; // ISO
}
