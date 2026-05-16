import type { Project } from '../model/types';
import projectsData from '../data/projects.json';

const projects = projectsData as Project[];

export function getProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
