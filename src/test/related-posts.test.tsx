import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderComponent } from './utils';
import { RelatedPosts } from '@/components/sections/RelatedPosts';
import type { BlogAuthor, BlogPost } from '@/data/blog';

const mockAuthor: BlogAuthor = {
  id: 'author-1',
  name: 'Test Author',
  role: 'Writer',
  avatar: '/images/avatar.jpg',
  bio: 'Bio',
};

const mockPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'post-1',
    title: 'Blog Post 1',
    excerpt: 'Excerpt 1',
    category: 'product',
    author: mockAuthor,
    publishedAt: '2026-02-01',
    readingTime: 5,
    featured: false,
    coverImage: '/images/test-1.jpg',
    tags: ['test'],
  },
  {
    id: '2',
    slug: 'post-2',
    title: 'Blog Post 2',
    excerpt: 'Excerpt 2',
    category: 'engineering',
    author: mockAuthor,
    publishedAt: '2026-02-02',
    readingTime: 8,
    featured: false,
    coverImage: '/images/test-2.jpg',
    tags: ['test'],
  },
  {
    id: '3',
    slug: 'post-3',
    title: 'Blog Post 3',
    excerpt: 'Excerpt 3',
    category: 'company',
    author: mockAuthor,
    publishedAt: '2026-02-03',
    readingTime: 10,
    featured: false,
    coverImage: '/images/test-3.jpg',
    tags: ['test'],
  },
  {
    id: '4',
    slug: 'post-4',
    title: 'Blog Post 4',
    excerpt: 'Excerpt 4',
    category: 'product',
    author: mockAuthor,
    publishedAt: '2026-02-04',
    readingTime: 12,
    featured: false,
    coverImage: '/images/test-4.jpg',
    tags: ['test'],
  },
];

describe('RelatedPosts', () => {
  it('renders nothing when no posts are provided', () => {
    const { container } = renderComponent(<RelatedPosts posts={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the section with heading and 3 posts', () => {
    renderComponent(<RelatedPosts posts={mockPosts} />);

    // Check heading
    expect(screen.getByText(/Related Articles/i)).toBeInTheDocument();

    // Should only render first 3 posts
    expect(screen.getByText('Blog Post 1')).toBeInTheDocument();
    expect(screen.getByText('Blog Post 2')).toBeInTheDocument();
    expect(screen.getByText('Blog Post 3')).toBeInTheDocument();
    expect(screen.queryByText('Blog Post 4')).not.toBeInTheDocument();
  });

  it('renders fewer than 3 posts if provided', () => {
    renderComponent(<RelatedPosts posts={mockPosts.slice(0, 2)} />);

    expect(screen.getByText('Blog Post 1')).toBeInTheDocument();
    expect(screen.getByText('Blog Post 2')).toBeInTheDocument();
    expect(screen.queryByText('Blog Post 3')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderComponent(
      <RelatedPosts posts={mockPosts} className="custom-class" />,
    );
    const section = container.querySelector('section');
    expect(section).toHaveClass('custom-class');
  });
});
