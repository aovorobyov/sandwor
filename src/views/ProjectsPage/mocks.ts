import type { Project } from '@/entities/project';

export const MOCK_PROJECTS: Project[] = [
  {
    id:          'sandwor',
    title:       'sandwor.space',
    year:        '2025',
    description: 'Personal website built with Next.js 14, FSD architecture, and next-intl.',
    tags:        ['Next.js', 'TypeScript', 'CSS Modules'],
    url:         'https://sandwor.space',
  },
  {
    id:          'project-beta',
    title:       'Project Beta',
    year:        '2024',
    description: 'A second example project. Replace with your real data.',
    tags:        ['React', 'Node.js'],
    url:         'https://example.com',
  },
  {
    id:          'project-gamma',
    title:       'Project Gamma',
    year:        '2024',
    description: 'An unreleased project. URL is null — Open button is hidden.',
    tags:        ['Python', 'FastAPI'],
    url:         null,
  },
  {
    id:          'project-delta',
    title:       'Project Delta',
    year:        '2023',
    description: 'Older project maintained for reference.',
    tags:        ['Vue', 'Firebase'],
    url:         null,
  },
];
