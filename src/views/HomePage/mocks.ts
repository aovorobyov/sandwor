import type { Post } from '@/entities/post';
import type { Project } from '@/entities/project';

export const MOCK_POSTS: Post[] = [
  {
    slug:     'getting-started-with-nextjs',
    title:    'Getting Started with Next.js App Router',
    date:     '2025-03-15',
    tag:      'Next.js',
    excerpt:  'An overview of the App Router architecture and how to structure projects for scalability.',
    body:     '<p>Content coming soon…</p>',
    readTime: 5,
  },
  {
    slug:     'css-modules-architecture',
    title:    'CSS Modules: Architecture for Large Projects',
    date:     '2025-02-28',
    tag:      'CSS',
    excerpt:  'How to organise CSS Modules in a large codebase without losing your mind.',
    body:     '<p>Content coming soon…</p>',
    readTime: 7,
  },
  {
    slug:     'fsd-in-practice',
    title:    'Feature-Sliced Design in Practice',
    date:     '2025-01-20',
    tag:      'Architecture',
    excerpt:  'Real-world experience applying Feature-Sliced Design to a production Next.js application.',
    body:     '<p>Content coming soon…</p>',
    readTime: 10,
  },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id:          'sandwor',
    title:       'sandwor.com',
    year:        '2025',
    description: 'Personal website built with Next.js 14, FSD architecture, and next-intl.',
    tags:        ['Next.js', 'TypeScript', 'CSS Modules'],
    url:         'https://sandwor.com',
  },
  {
    id:          'side-project-1',
    title:       'Side Project Alpha',
    year:        '2024',
    description: 'A placeholder for a future project. Replace with real data.',
    tags:        ['React', 'Node.js'],
    url:         null,
  },
];
