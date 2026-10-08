/**
 * @vitest-environment jsdom
 */
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatsSection } from './StatsSection';
import { ThemeProvider } from '@/components/ThemeProvider';

// Mock matchMedia for ThemeProvider
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

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

describe('StatsSection Component', () => {
  const renderStatsSection = (props = {}) => {
    return render(
      <ThemeProvider>
        <StatsSection {...props} />
      </ThemeProvider>,
    );
  };

  it('renders with default title and subtitle', () => {
    renderStatsSection();
    expect(screen.getByText(/By the numbers/i)).toBeDefined();
    expect(screen.getByText(/Trusted by thousands of developers/i)).toBeDefined();
  });

  it('renders all feature stats', () => {
    renderStatsSection();
    // From featureStats in src/data/features.ts
    expect(screen.getByText(/Uptime SLA/i)).toBeDefined();
    expect(screen.getByText(/Integrations/i)).toBeDefined();
    expect(screen.getByText(/Avg Response Time/i)).toBeDefined();
    expect(screen.getByText(/Requests Processed/i)).toBeDefined();
  });

  it('renders animated counters with correct values', () => {
    renderStatsSection();
    const counters = screen.getAllByTestId('animated-counter');
    expect(counters.length).toBe(4);

    // Check for some specific values from featureStats
    expect(screen.getByText(/99.99%/i)).toBeDefined();
    expect(screen.getByText(/150\+/i)).toBeDefined();
    expect(screen.getByText(/<50ms/i)).toBeDefined();
    expect(screen.getByText(/10B\+/i)).toBeDefined();
  });

  it('renders the section with correct accessibility attributes', () => {
    renderStatsSection();
    const section = screen.getByRole('region', { name: /By the numbers/i });
    expect(section).toBeDefined();
    expect(section.getAttribute('id')).toBe('stats');
  });

  it('renders with custom title and id', () => {
    renderStatsSection({ title: 'Custom Stats', id: 'custom-stats' });
    expect(screen.getByText('Custom Stats')).toBeDefined();
    const section = screen.getByRole('region', { name: /Custom Stats/i });
    expect(section.getAttribute('id')).toBe('custom-stats');
  });
});
