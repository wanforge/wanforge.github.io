// @vitest-environment jsdom
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LegalHero } from '../components/sections/LegalHero';
import { LegalContent } from '../components/sections/LegalContent';
import { privacyData } from '../data/legal';

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

describe('Privacy Policy Components', () => {
  describe('LegalHero', () => {
    it('renders the privacy title and last updated date', () => {
      render(<LegalHero title={privacyData.title} lastUpdated={privacyData.lastUpdated} />);

      expect(screen.getByText(privacyData.title)).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(`Last Updated: ${privacyData.lastUpdated}`, 'i')),
      ).toBeInTheDocument();
    });
  });

  describe('LegalContent', () => {
    it('renders all privacy sections and their content', () => {
      render(<LegalContent sections={privacyData.sections} />);

      privacyData.sections.forEach((section) => {
        // Use getAllByText because titles appear in both TOC and sections
        expect(screen.getAllByText(section.title).length).toBeGreaterThanOrEqual(1);
        // Check if a portion of the content is rendered
        const firstLine = section.content.split('\n\n')[0] || '';
        expect(screen.getByText(firstLine)).toBeInTheDocument();
      });
    });

    it('renders the table of contents with links to all privacy sections', () => {
      render(<LegalContent sections={privacyData.sections} />);

      const toc = screen.getByRole('navigation');
      expect(toc).toBeInTheDocument();
      expect(screen.getByText(/Table of Contents/i)).toBeInTheDocument();

      privacyData.sections.forEach((section) => {
        const link = screen.getByRole('link', { name: section.title });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', `#${section.id}`);
      });
    });
  });
});
