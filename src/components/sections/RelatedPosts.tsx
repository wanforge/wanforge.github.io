import * as React from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { BlogPostCard } from '../ui/BlogPostCard';
import type { BlogPost } from '@/data/blog';

/**
 * RelatedPosts Component Props
 */
export interface RelatedPostsProps {
  /** The list of related blog posts to display */
  posts: BlogPost[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * RelatedPosts Section Component
 *
 * Displays a list of related blog posts at the bottom of a blog post page.
 * Encourages further reading and improves site engagement.
 *
 * @example
 * ```tsx
 * <RelatedPosts posts={relatedPosts} />
 * ```
 */
export const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts, className }) => {
  if (!posts || posts.length === 0) return null;

  // We only want to display a maximum of 3 related posts
  const displayPosts = posts.slice(0, 3);

  return (
    <Section background="muted" padding="lg" className={className} data-testid="related-posts">
      <Container>
        <div className="space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
                Related Articles
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto md:mx-0">
                Continue reading about modern SaaS development, product strategy, and engineering
                best practices.
              </p>
            </div>
          </div>

          {/* Related Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default RelatedPosts;
