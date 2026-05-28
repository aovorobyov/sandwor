import type { Post } from '@/entities/post';

export const MOCK_POSTS: Post[] = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js App Router',
    date: '2025-03-15',
    tag: 'Next.js',
    excerpt:
      'An overview of the App Router architecture and how to structure projects for scalability.',
    body: '<p>Content coming soon…</p>',
    readTime: 5,
  },
  {
    slug: 'css-modules-architecture',
    title: 'CSS Modules: Architecture for Large Projects',
    date: '2025-02-28',
    tag: 'CSS',
    excerpt: 'How to organise CSS Modules in a large codebase without losing your mind.',
    body: '<p>Content coming soon…</p>',
    readTime: 7,
  },
  {
    slug: 'fsd-in-practice',
    title: 'Feature-Sliced Design in Practice',
    date: '2025-01-20',
    tag: 'Architecture',
    excerpt:
      'Real-world experience applying Feature-Sliced Design to a production Next.js application.',
    body: '<p>Content coming soon…</p>',
    readTime: 10,
  },
  {
    slug: 'typescript-strict-guide',
    title: 'TypeScript Strict Mode: A Practical Guide',
    date: '2024-12-10',
    tag: 'TypeScript',
    excerpt: 'Everything you need to enable strict mode and survive the migration.',
    body: '<p>Content coming soon…</p>',
    readTime: 8,
  },
];
