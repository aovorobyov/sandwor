import type { Note } from '@/entities/note';

export const MOCK_NOTES: Note[] = [
  {
    id: '1',
    date: '2025-04-01',
    text: 'Next.js 15 will improve the caching model significantly — worth tracking.',
  },
  {
    id: '2',
    date: '2025-03-20',
    text: 'Feature-Sliced Design makes large codebases much easier to navigate.',
  },
  {
    id: '3',
    date: '2025-03-05',
    text: 'CSS container queries are now well-supported and worth adopting.',
  },
  {
    id: '4',
    date: '2025-02-14',
    text: "TypeScript strict mode: enable it early, it's much harder to retrofit later.",
  },
  {
    id: '5',
    date: '2025-01-30',
    text: 'Inter Variable font covers the entire 100–900 weight range in a single file.',
  },
  {
    id: '6',
    date: '2024-12-22',
    text: 'Semantic HTML is still the best accessibility foundation — skip ARIA when possible.',
  },
];
