import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BlogSearch, filterBlogPosts } from './BlogSearch';
import { blogPosts } from '@/data/blog';

describe('BlogSearch', () => {
  const onQueryChange = vi.fn();

  it('renders the search input', () => {
    render(<BlogSearch query="" onQueryChange={onQueryChange} />);

    expect(screen.getByPlaceholderText('Search posts...')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('calls onQueryChange when typing', () => {
    render(<BlogSearch query="" onQueryChange={onQueryChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'react' } });

    expect(onQueryChange).toHaveBeenCalledWith('react');
  });

  it('shows clear button when query is not empty', () => {
    render(<BlogSearch query="react" onQueryChange={onQueryChange} />);

    expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
  });

  it('hides clear button when query is empty', () => {
    render(<BlogSearch query="" onQueryChange={onQueryChange} />);

    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
  });

  it('calls onQueryChange with empty string when clear button is clicked', () => {
    render(<BlogSearch query="react" onQueryChange={onQueryChange} />);

    const clearButton = screen.getByLabelText('Clear search');
    fireEvent.click(clearButton);

    expect(onQueryChange).toHaveBeenCalledWith('');
  });

  it('applies custom className', () => {
    const { container } = render(
      <BlogSearch query="" onQueryChange={onQueryChange} className="custom-class" />,
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  describe('filterBlogPosts', () => {
    it('returns all posts when query is empty', () => {
      const filtered = filterBlogPosts(blogPosts, '');
      expect(filtered).toEqual(blogPosts);
    });

    it('filters posts by title', () => {
      const filtered = filterBlogPosts(blogPosts, 'Introducing');
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((post) => {
        expect(post.title.toLowerCase()).toContain('introducing');
      });
    });

    it('filters posts by excerpt', () => {
      const filtered = filterBlogPosts(blogPosts, 'history');
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((post) => {
        expect(post.excerpt.toLowerCase()).toContain('history');
      });
    });

    it('filters posts by tags', () => {
      const filtered = filterBlogPosts(blogPosts, 'engineering');
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((post) => {
        const inTitle = post.title.toLowerCase().includes('engineering');
        const inTags = post.tags.some((tag) => tag.toLowerCase().includes('engineering'));
        expect(inTitle || inTags).toBe(true);
      });
    });

    it('is case-insensitive', () => {
      const filtered = filterBlogPosts(blogPosts, 'INTRODUCING');
      expect(filtered.length).toEqual(filterBlogPosts(blogPosts, 'introducing').length);
    });

    it('trims whitespace from query', () => {
      const filtered = filterBlogPosts(blogPosts, ' introducing ');
      expect(filtered.length).toEqual(filterBlogPosts(blogPosts, 'introducing').length);
    });
  });
});
