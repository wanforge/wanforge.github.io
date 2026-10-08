/**
 * @vitest-environment jsdom
 */
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AboutStats } from './AboutStats';
import { ThemeProvider } from '@/components/ThemeProvider';

// Mock AnimatedCounter to avoid inView issues in tests
vi.mock('@/components/ui/AnimatedCounter', () => ({
  AnimatedCounter: ({
    value,
    prefix,
    suffix,
  }: {
    value: number;
    prefix?: string;
    suffix?: string;
  }) => (
    <span data-testid="animated-counter">
      {prefix}
      {value}
      {suffix}
    </span>
  ),
  default: ({ value, prefix, suffix }: { value: number; prefix?: string; suffix?: string }) => (
    <span data-testid="animated-counter">
      {prefix}
      {value}
      {suffix}
    </span>
  ),
}));

describe('AboutStats Component', () => {
  const renderAboutStats = (props = {}) => {
    return render(
      <ThemeProvider>
        <AboutStats {...props} />
      </ThemeProvider>,
    );
  };

  it('renders with default title and subtitle', () => {
    renderAboutStats();
    expect(screen.getByText(/Company by the numbers/i)).toBeDefined();
    expect(screen.getByText(/A look at our growth and impact/i)).toBeDefined();
  });

  it('renders all company stats', () => {
    renderAboutStats();
    // From companyStats in src/data/team.ts
    expect(screen.getByText(/Team Members/i)).toBeDefined();
    expect(screen.getByText(/Countries/i)).toBeDefined();
    expect(screen.getByText(/Customers/i)).toBeDefined();
    expect(screen.getByText(/Requests Processed/i)).toBeDefined();
  });

  it('renders animated counters with correct values', () => {
    renderAboutStats();
    const counters = screen.getAllByTestId('animated-counter');
    expect(counters.length).toBe(4);

    // Check for specific values from companyStats
    expect(screen.getByText(/120\+/i)).toBeDefined();
    expect(screen.getByText(/50\+/i)).toBeDefined();
    expect(screen.getByText(/5000\+/i)).toBeDefined();
    expect(screen.getByText(/100M\+/i)).toBeDefined();
  });

  it('renders the section with correct accessibility attributes', () => {
    renderAboutStats();
    const section = screen.getByRole('region', { name: /Company by the numbers/i });
    expect(section).toBeDefined();
    expect(section.getAttribute('id')).toBe('about-stats');
  });

  it('renders with custom title and id', () => {
    renderAboutStats({ title: 'Our Impact', id: 'impact-stats' });
    expect(screen.getByText('Our Impact')).toBeDefined();
    const section = screen.getByRole('region', { name: /Our Impact/i });
    expect(section.getAttribute('id')).toBe('impact-stats');
  });
});
