import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const messages = require('messages/ru.json') as Record<string, string>;
import { PostCard } from '../PostCard';
import type { Post } from '../../../model/types';

const MOCK_POST: Post = {
  slug: 'test-post',
  title: 'Test Post Title',
  date: '2025-04-10',
  tag: 'TypeScript',
  excerpt: 'A short excerpt for testing purposes.',
  body: '<p>Body content</p>',
  readTime: 5,
};

function wrapper({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale="ru" messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

describe('PostCard', () => {
  it('renders the post title', () => {
    render(<PostCard post={MOCK_POST} />, { wrapper });
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
  });

  it('renders the post excerpt', () => {
    render(<PostCard post={MOCK_POST} />, { wrapper });
    expect(screen.getByText('A short excerpt for testing purposes.')).toBeInTheDocument();
  });

  it('renders the post tag as badge', () => {
    render(<PostCard post={MOCK_POST} />, { wrapper });
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders the read time', () => {
    render(<PostCard post={MOCK_POST} />, { wrapper });
    expect(screen.getByText(/5 мин чтения/)).toBeInTheDocument();
  });

  it('links to the correct blog post URL', () => {
    render(<PostCard post={MOCK_POST} />, { wrapper });
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', expect.stringContaining('test-post'));
  });
});
