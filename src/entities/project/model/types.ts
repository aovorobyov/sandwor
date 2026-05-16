export interface ProjectLocalized {
  en: string;
  ru: string;
}

export interface Project {
  slug:        string;
  title:       ProjectLocalized;
  date:        string; // ISO month-year: '2025-04'
  description: ProjectLocalized;
  image:       string | null;
  tags:        string[];
  repoUrl:     string | null;
  siteUrl:     string | null;
  body:        ProjectLocalized; // HTML
}
