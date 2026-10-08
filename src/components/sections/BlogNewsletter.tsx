import * as React from 'react';
import { Section } from '../ui/Section';
import { Container } from '../ui/Container';
import { NewsletterForm } from '../ui/NewsletterForm';
import { blogNewsletter } from '@/data/blog';

/**
 * BlogNewsletter Section Component
 *
 * A high-impact newsletter subscription section for the blog.
 * Features a primary background to stand out and capture email signups.
 */
export const BlogNewsletter: React.FC = () => {
  return (
    <Section
      background="primary"
      padding="xl"
      className="border-t border-border-muted overflow-hidden relative"
    >
      <Container size="narrow" className="text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          {blogNewsletter.title}
        </h2>
        <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto">
          {blogNewsletter.description}
        </p>
        <div className="max-w-md mx-auto">
          <NewsletterForm />
        </div>
        <p className="mt-6 text-sm text-text-muted">No spam. Unsubscribe at any time.</p>
      </Container>

      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-200/20 dark:bg-primary-800/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary-200/20 dark:bg-secondary-800/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
    </Section>
  );
};

export default BlogNewsletter;
