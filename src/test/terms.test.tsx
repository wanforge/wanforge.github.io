// @vitest-environment jsdom
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LegalHero } from '../components/sections/LegalHero';
import { LegalContent } from '../components/sections/LegalContent';
import { termsData } from '../data/legal';

// Mock motion/react to avoid animation issues in tests
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1 {...props}>{children}</h1>
    ),
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p {...props}>{children}</p>
    ),
  },
}));

describe('Legal Components', () => {
  describe('LegalHero', () => {
    it('renders the title and last updated date', () => {
      render(<LegalHero title={termsData.title} lastUpdated={termsData.lastUpdated} />);

      expect(screen.getByText(termsData.title)).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(`Last Updated: ${termsData.lastUpdated}`, 'i')),
      ).toBeInTheDocument();
    });
  });

  describe('LegalContent', () => {
    it('renders all sections and their content', () => {
      render(<LegalContent sections={termsData.sections} />);

      termsData.sections.forEach((section) => {
        // Use getAllByText because titles appear in both TOC and sections
        expect(screen.getAllByText(section.title).length).toBeGreaterThanOrEqual(1);
        // Check if a portion of the content is rendered
        const firstLine = section.content.split('\n\n')[0] || '';
        expect(screen.getByText(firstLine)).toBeInTheDocument();
      });
    });

    it('renders the table of contents with links to all sections', () => {
      render(<LegalContent sections={termsData.sections} />);

      const toc = screen.getByRole('navigation');
      expect(toc).toBeInTheDocument();
      expect(screen.getByText(/Table of Contents/i)).toBeInTheDocument();

      termsData.sections.forEach((section) => {
        const link = screen.getByRole('link', { name: section.title });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', `#${section.id}`);
      });
    });
  });
});
