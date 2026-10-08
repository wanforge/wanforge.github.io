import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeaturedPost } from './FeaturedPost';
import type { BlogPost } from '@/data/blog';

// Mock blog post data
const mockPost: BlogPost = {
  id: 'test-featured',
  slug: 'featured-post',
  title: 'Featured Blog Post Title',
  excerpt:
    'This is a prominent featured blog post excerpt designed to capture user attention at the top of the listing page.',
  category: 'product',
  author: {
    id: 'author-1',
    name: 'Alexandra Chen',
    role: 'CEO & Co-Founder',
    avatar: '/images/test-avatar.jpg',
    bio: 'Test bio',
  },
  publishedAt: '2026-02-10',
  readingTime: 8,
  featured: true,
  coverImage: '/images/test-featured.jpg',
  tags: ['featured', 'product'],
};

describe('FeaturedPost', () => {
  it('renders prominent post information correctly', () => {
    render(<FeaturedPost post={mockPost} />);

    expect(screen.getByText('Featured Blog Post Title')).toBeInTheDocument();
    expect(screen.getByText(/prominent featured blog post excerpt/i)).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Alexandra Chen')).toBeInTheDocument();
    expect(screen.getByText('CEO & Co-Founder')).toBeInTheDocument();
    expect(screen.getByText(/8 min read/i)).toBeInTheDocument();
    expect(screen.getByText(/February 10, 2026/i)).toBeInTheDocument();
  });

  it('renders "Featured Post" badge', () => {
    render(<FeaturedPost post={mockPost} />);
    expect(screen.getByText('Featured Post')).toBeInTheDocument();
  });

  it('renders cover image with correct attributes', () => {
    render(<FeaturedPost post={mockPost} />);
    const image = screen.getByAltText('Featured Blog Post Title');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/test-featured.jpg');
    expect(image).toHaveAttribute('loading', 'eager');
  });

  it('renders author avatar and role', () => {
    render(<FeaturedPost post={mockPost} />);
    const avatar = screen.getByAltText('Alexandra Chen');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', '/images/test-avatar.jpg');
    expect(screen.getByText('CEO & Co-Founder')).toBeInTheDocument();
  });

  it('renders initials fallback when avatar is missing', () => {
    const postWithoutAvatar = {
      ...mockPost,
      author: { ...mockPost.author, avatar: '' },
    };
    render(<FeaturedPost post={postWithoutAvatar} />);
    expect(screen.getByText('AC')).toBeInTheDocument();
  });

  it('links to the correct blog post URL', () => {
    render(<FeaturedPost post={mockPost} />);
    const links = screen.getAllByRole('link');
    // Title link and "Read Article" link
    expect(links[0]).toHaveAttribute('href', '/blog/featured-post/');
    expect(links[1]).toHaveAttribute('href', '/blog/featured-post/');
  });

  it('has accessible time element with correct format', () => {
    render(<FeaturedPost post={mockPost} />);
    const timeElement = screen.getByText(/February 10, 2026/i).closest('time');
    expect(timeElement).toHaveAttribute('dateTime', '2026-02-10');
  });
});
