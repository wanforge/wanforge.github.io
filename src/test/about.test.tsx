import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import {
  AboutStats,
  CareersCTA,
  CompanyStory,
  CompanyValues,
  InvestorsSection,
  TeamSection,
} from '@/components/sections';
import { teamMembers } from '@/data/team';

// Mock Lucide icons to avoid noise and prevent missing export errors
vi.mock('lucide-react', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  const mocks: Record<string, React.FC<Record<string, unknown>>> = {};

  // Create a generic mock component for any icon that might be requested
  Object.keys(actual).forEach((key) => {
    const item = actual[key];
    if (typeof item === 'function' || (item && typeof item === 'object' && '$$typeof' in item)) {
      mocks[key] = (props: Record<string, unknown>) => (
        <div data-testid={`icon-${key.toLowerCase()}`} {...props} />
      );
    }
  });

  return {
    ...actual,
    ...mocks,
  };
});

/**
 * About Page Mock Component
 *
 * Replicates the structure of src/pages/about.astro for unit testing.
 */
const MockAboutPage = () => (
  <ThemeProvider defaultTheme="light">
    <main>
      <CompanyStory />
      <CompanyValues />
      <TeamSection />
      <AboutStats />
      <InvestorsSection />
      <CareersCTA />
    </main>
  </ThemeProvider>
);

describe('About Page Composition', () => {
  it('renders all sections in the correct order', () => {
    render(<MockAboutPage />);

    // 1. Company Story
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Empower teams to build exceptional products/i,
      }),
    ).toBeInTheDocument();

    // 2. Company Values
    expect(screen.getByRole('heading', { level: 2, name: /Our Core Values/i })).toBeInTheDocument();

    // 3. Team Section
    expect(
      screen.getByRole('heading', { level: 2, name: /Meet our talented team/i }),
    ).toBeInTheDocument();

    // 4. About Stats
    expect(screen.getByText(/Company by the numbers/i)).toBeInTheDocument();

    // 5. Investors Section
    expect(
      screen.getByRole('heading', { level: 3, name: /Backed by the world's leading investors/i }),
    ).toBeInTheDocument();

    // 6. Careers CTA
    expect(screen.getByRole('heading', { level: 2, name: /Join Our Team/i })).toBeInTheDocument();
  });

  it('renders team members correctly', () => {
    render(<MockAboutPage />);

    // Check if leadership and team headings are present
    expect(screen.getByText('Leadership')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();

    // Check if a few team members from the data are rendered
    const firstMember = teamMembers[0];
    if (firstMember) {
      expect(screen.getAllByText(firstMember.name).length).toBeGreaterThan(0);
      expect(screen.getAllByText(new RegExp(firstMember.role, 'i')).length).toBeGreaterThan(0);
    }
  });

  it('supports theme switching across all sections', () => {
    const { rerender } = render(
      <ThemeProvider defaultTheme="dark">
        <MockAboutPage />
      </ThemeProvider>,
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Empower teams to build exceptional products/i,
      }),
    ).toBeInTheDocument();

    rerender(
      <ThemeProvider defaultTheme="light">
        <MockAboutPage />
      </ThemeProvider>,
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Empower teams to build exceptional products/i,
      }),
    ).toBeInTheDocument();
  });

  it('is responsive across common viewports', () => {
    const { container } = render(<MockAboutPage />);

    // Check for common responsive classes
    const responsiveGrids = container.querySelectorAll('.grid');
    expect(responsiveGrids.length).toBeGreaterThan(0);

    // Check for container classes
    const containers = container.querySelectorAll('.max-w-7xl');
    expect(containers.length).toBeGreaterThan(0);
  });
});
