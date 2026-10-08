import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CompanyStory } from './CompanyStory';
import { company } from '@/config/site';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: React.ComponentProps<'h1'>) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: React.ComponentProps<'h2'>) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: React.ComponentProps<'h3'>) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: React.ComponentProps<'p'>) => <p {...props}>{children} </p>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

describe('CompanyStory', () => {
  it('renders the mission statement from config', () => {
    render(<CompanyStory />);
    expect(screen.getByText(company.mission)).toBeDefined();
  });

  it('renders the company description content', () => {
    render(<CompanyStory />);
    // Use a custom matcher for description as it might be broken by whitespace
    const descriptionText = company.fullDescription.replace(/\s+/g, ' ').trim();
    expect(
      screen.getByText((content) => {
        return content.replace(/\s+/g, ' ').includes(descriptionText.substring(0, 100));
      }),
    ).toBeDefined();
  });

  it('renders the "Where We Started" section', () => {
    render(<CompanyStory />);
    expect(screen.getByText(/Where We Started/i)).toBeDefined();
    // Use getAllByText and check if at least one contains the year
    const yearMatches = screen.getAllByText(new RegExp(String(company.foundedYear), 'i'));
    expect(yearMatches.length).toBeGreaterThan(0);
  });

  it('renders the "Today" and "The Future" subsections', () => {
    render(<CompanyStory />);
    // Check for headings specifically to avoid matches in description
    expect(screen.getByRole('heading', { name: /Today/i })).toBeDefined();
    expect(screen.getByRole('heading', { name: /The Future/i })).toBeDefined();
    expect(screen.getByText(company.vision)).toBeDefined();
  });

  it('renders the team image', () => {
    render(<CompanyStory />);
    expect(screen.getByAltText(/Our team working together/i)).toBeDefined();
  });

  it('has correct accessibility labels', () => {
    render(<CompanyStory />);
    expect(screen.getByLabelText(/About Hero - Our Mission/i)).toBeDefined();
    expect(screen.getByLabelText(/Company Story - Our Journey/i)).toBeDefined();
  });
});
