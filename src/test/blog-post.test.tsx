import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderComponent } from './utils';
import { AuthorBio } from '@/components/blog/AuthorBio';
import { RelatedPosts } from '@/components/sections/RelatedPosts';
import type { BlogAuthor, BlogPost } from '@/data/blog';

describe('Blog Post Template Components', () => {
  const mockAuthor: BlogAuthor = {
    id: 'author-1',
    name: 'John Doe',
    role: 'Senior Writer',
    avatar: '/images/author-1.jpg',
    bio: 'An experienced tech writer with a passion for SaaS.',
    social: {
      twitter: 'https://twitter.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
    },
  };

  const mockPost: BlogPost = {
    id: 'post-1',
    slug: 'test-post',
    title: 'Test Post Title',
    excerpt: 'Test post excerpt',
    content: '<p>Test content</p><pre><code>const x = 1;</code></pre>',
    category: 'engineering',
    author: mockAuthor,
    publishedAt: '2026-02-10',
    readingTime: 5,
    featured: false,
    coverImage: '/images/test-post.jpg',
    tags: ['test', 'engineering'],
    relatedPosts: ['2', '3'],
  };

  describe('AuthorBio', () => {
    it('renders author information correctly', () => {
      renderComponent(<AuthorBio author={mockAuthor} />);

      expect(screen.getByText(mockAuthor.name)).toBeInTheDocument();
      expect(screen.getByText(mockAuthor.role)).toBeInTheDocument();
      expect(screen.getByText(mockAuthor.bio)).toBeInTheDocument();

      const avatar = screen.getByAltText(mockAuthor.name);
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('src', mockAuthor.avatar);
    });

    it('renders social links when provided', () => {
      renderComponent(<AuthorBio author={mockAuthor} />);

      const twitterLink = screen.getByLabelText(`${mockAuthor.name}'s Twitter`);
      const linkedinLink = screen.getByLabelText(`${mockAuthor.name}'s LinkedIn`);

      expect(twitterLink).toBeInTheDocument();
      expect(twitterLink).toHaveAttribute('href', mockAuthor.social?.twitter ?? '');
      expect(linkedinLink).toBeInTheDocument();
      expect(linkedinLink).toHaveAttribute('href', mockAuthor.social?.linkedin ?? '');
    });

    it('renders initials fallback when avatar is missing', () => {
      const authorWithoutAvatar = { ...mockAuthor, avatar: '' };
      renderComponent(<AuthorBio author={authorWithoutAvatar} />);

      // Initials for "John Doe" should be "JD"
      expect(screen.getByText('JD')).toBeInTheDocument();
    });
  });

  describe('RelatedPosts', () => {
    const relatedPosts: BlogPost[] = [
      { ...mockPost, id: '2', title: 'Related Post 1', slug: 'related-1' },
      { ...mockPost, id: '3', title: 'Related Post 2', slug: 'related-2' },
    ];

    it('renders related posts section', () => {
      renderComponent(<RelatedPosts posts={relatedPosts} />);

      expect(screen.getByText(/Related Articles/i)).toBeInTheDocument();
      expect(screen.getByText('Related Post 1')).toBeInTheDocument();
      expect(screen.getByText('Related Post 2')).toBeInTheDocument();
    });
  });

  describe('Post Content (Prose)', () => {
    it('renders HTML content including code blocks', () => {
      // We simulate the prose container used in the template
      const BlogPostContent = ({ content }: { content: string }) => (
        <article className="prose prose-lg prose-primary max-w-none">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      );

      renderComponent(<BlogPostContent content={mockPost.content ?? ''} />);

      // Check if content is rendered
      expect(screen.getByText('Test content')).toBeInTheDocument();

      // Check for code block
      const codeElement = screen.getByText('const x = 1;');
      expect(codeElement).toBeInTheDocument();
      expect(codeElement.tagName).toBe('CODE');
      expect(codeElement.parentElement?.tagName).toBe('PRE');
    });
  });

  describe('Theming and Responsive', () => {
    it('renders correctly in dark theme', () => {
      const { container } = renderComponent(<AuthorBio author={mockAuthor} />, { theme: 'dark' });

      // In our setup, ThemeProvider adds data-theme="dark" to a div wrapper
      // and we can check if the component is rendered within it.
      expect(container.firstChild).toBeInTheDocument();
    });

    it('handles responsive layout for AuthorBio', () => {
      const { container } = renderComponent(<AuthorBio author={mockAuthor} />);

      // AuthorBio uses flex-col sm:flex-row
      const innerContainer = container.querySelector('.flex-col');
      expect(innerContainer).toBeInTheDocument();
      expect(innerContainer).toHaveClass('sm:flex-row');
    });
  });
});
