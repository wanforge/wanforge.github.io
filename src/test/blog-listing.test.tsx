import * as React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderComponent } from './utils';
import { BlogListingContent } from '@/components/blog/BlogListingContent';
import type * as blogData from '@/data/blog';

// Mock the blog data
vi.mock('@/data/blog', async () => {
  const actual = await vi.importActual('@/data/blog');

  const mockAuthors: blogData.BlogAuthor[] = [
    {
      id: 'author-1',
      name: 'Test Author',
      role: 'Writer',
      avatar: '/images/avatar.jpg',
      bio: 'Bio',
    },
  ];

  const mockPosts: blogData.BlogPost[] = Array.from({ length: 15 }, (_, i) => ({
    id: `${i + 1}`,
    slug: `post-${i + 1}`,
    title: `Blog Post ${i + 1}`,
    excerpt: `Excerpt for post ${i + 1}`,
    category: (i % 3 === 0
      ? 'product'
      : i % 3 === 1
        ? 'engineering'
        : 'company') as blogData.BlogCategory,
    author: mockAuthors[0]!,
    publishedAt: '2026-02-01',
    readingTime: 5,
    featured: i === 0,
    coverImage: '/images/test.jpg',
    tags: ['test'],
  }));

  return {
    ...actual,
    blogPosts: mockPosts,
    featuredBlogPost: mockPosts[0],
  };
});

describe('BlogListingContent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the featured post and the first page of posts', () => {
    renderComponent(<BlogListingContent />);

    // Featured post title should be visible
    const titles = screen.getAllByText('Blog Post 1');
    expect(titles.length).toBeGreaterThan(0);

    // Page 1 should have 9 posts
    // We check for some titles that should be present
    expect(screen.getAllByText('Blog Post 9').length).toBeGreaterThan(0);

    // Post 10 should be on the next page
    expect(screen.queryByText('Blog Post 10')).not.toBeInTheDocument();
  });

  it('filters posts by category', async () => {
    renderComponent(<BlogListingContent />);

    // Find category filter (Tabs)
    const engineeringTab = screen.getByRole('tab', { name: /Engineering/i });
    fireEvent.click(engineeringTab);

    // Should only show engineering posts
    // In our mock: i % 3 === 1 are engineering (Post 2, 5, 8, 11, 14)
    expect(screen.getByText('Blog Post 2')).toBeInTheDocument();
    expect(screen.getByText('Blog Post 5')).toBeInTheDocument();
    expect(screen.queryByText('Blog Post 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Blog Post 3')).not.toBeInTheDocument();
  });

  it('filters posts by search query', async () => {
    renderComponent(<BlogListingContent />);

    const searchInput = screen.getByLabelText(/Search blog posts/i);
    fireEvent.change(searchInput, { target: { value: 'Blog Post 11' } });

    expect(screen.getByText('Blog Post 11')).toBeInTheDocument();
    expect(screen.queryByText('Blog Post 1')).not.toBeInTheDocument();

    // Should show results count
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Found 1 article for "Blog Post 11"/i,
      }),
    ).toBeInTheDocument();
  });

  it('navigates through pages', async () => {
    renderComponent(<BlogListingContent />);

    // Initial state: Page 1 (Posts 1-9)
    expect(screen.getAllByText('Blog Post 1').length).toBeGreaterThan(0);
    expect(screen.queryByText('Blog Post 10')).not.toBeInTheDocument();

    // Find pagination page 2 button
    const page2Button = screen.getByLabelText(/Page 2/i);
    fireEvent.click(page2Button);

    // Now should show posts 10-15
    expect(screen.queryByText('Blog Post 1')).not.toBeInTheDocument();
    expect(screen.getByText('Blog Post 10')).toBeInTheDocument();
    expect(screen.getByText('Blog Post 15')).toBeInTheDocument();
  });

  it('resets to page 1 when filters change', async () => {
    renderComponent(<BlogListingContent />);

    // Go to page 2
    const page2Button = screen.getByLabelText(/Page 2/i);
    fireEvent.click(page2Button);
    expect(screen.getByText('Blog Post 10')).toBeInTheDocument();

    // Change category
    const productTab = screen.getByRole('tab', { name: /Product/i });
    fireEvent.click(productTab);

    // Should be back on page 1 of the new category
    // Product posts: 1, 4, 7, 10, 13
    expect(screen.getAllByText('Blog Post 1').length).toBeGreaterThan(0);
    expect(screen.getByText('Blog Post 13')).toBeInTheDocument();
  });

  it('shows empty state when no posts match filters', async () => {
    renderComponent(<BlogListingContent />);

    const searchInput = screen.getByLabelText(/Search blog posts/i);
    fireEvent.change(searchInput, { target: { value: 'Non-existent post' } });

    expect(screen.getByText(/No posts found/i)).toBeInTheDocument();

    // Click clear filters
    const clearButton = screen.getByRole('button', { name: /Clear all filters/i });
    fireEvent.click(clearButton);

    // Should show posts again
    expect(screen.getAllByText('Blog Post 1').length).toBeGreaterThan(0);
  });
});
