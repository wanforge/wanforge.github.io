import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BlogPostCard } from './BlogPostCard';
import type { BlogPost } from '@/data/blog';

// Mock blog post data
const mockPost: BlogPost = {
  id: 'test-1',
  slug: 'test-post',
  title: 'Test Blog Post',
  excerpt: 'This is a test blog post excerpt to verify rendering of the card component.',
  category: 'engineering',
  author: {
    id: 'author-1',
    name: 'Test Author',
    role: 'Software Engineer',
    avatar: '/images/test-avatar.jpg',
    bio: 'Test bio',
  },
  publishedAt: '2026-02-10',
  readingTime: 5,
  featured: false,
  coverImage: '/images/test-cover.jpg',
  tags: ['testing', 'react'],
};

describe('BlogPostCard', () => {
  it('renders basic post information correctly', () => {
    render(<BlogPostCard post={mockPost} />);

    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText(/test blog post excerpt/i)).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText(/5 min read/i)).toBeInTheDocument();
    expect(screen.getByText(/Feb 10, 2026/i)).toBeInTheDocument();
  });

  it('renders cover image with correct alt text', () => {
    render(<BlogPostCard post={mockPost} />);
    const image = screen.getByAltText('Test Blog Post');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/test-cover.jpg');
  });

  it('renders author avatar', () => {
    render(<BlogPostCard post={mockPost} />);
    const avatar = screen.getByAltText('Test Author');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', '/images/test-avatar.jpg');
  });

  it('renders initials fallback when avatar is missing', () => {
    const postWithoutAvatar = {
      ...mockPost,
      author: { ...mockPost.author, avatar: '' },
    };
    render(<BlogPostCard post={postWithoutAvatar} />);
    expect(screen.getByText('TA')).toBeInTheDocument();
  });

  it('applies featured styles when featured prop is true', () => {
    const { container } = render(<BlogPostCard post={mockPost} featured />);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('md:flex-row');
  });

  it('links to the correct blog post URL', () => {
    render(<BlogPostCard post={mockPost} />);
    const links = screen.getAllByRole('link');
    // Title link and "Read More" link
    expect(links[0]).toHaveAttribute('href', '/blog/test-post/');
    expect(links[1]).toHaveAttribute('href', '/blog/test-post/');
  });

  it('has accessible time element', () => {
    render(<BlogPostCard post={mockPost} />);
    const timeElement = screen.getByText(/Feb 10, 2026/i).closest('time');
    expect(timeElement).toHaveAttribute('dateTime', '2026-02-10');
  });
});
