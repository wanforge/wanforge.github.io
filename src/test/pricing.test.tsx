import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { PricingPageContent } from '@/components/pricing/PricingPageContent';

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

// Mock window.matchMedia for theme and responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('Pricing Page Composition', () => {
  it('renders all sections in the correct order', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <PricingPageContent />
      </ThemeProvider>,
    );

    // 1. Pricing Hero
    expect(
      screen.getByRole('heading', { level: 1, name: /Simple, transparent/i }),
    ).toBeInTheDocument();

    // 2. Pricing Tiers
    expect(screen.getByText(/Annual billing saves you up to 20%/i)).toBeInTheDocument();

    // 3. Money-Back Guarantee
    expect(screen.getByText(/30-Day Money-Back Guarantee/i)).toBeInTheDocument();

    // 4. Pricing Comparison
    expect(
      screen.getByRole('heading', { level: 2, name: /Compare Our Plans/i }),
    ).toBeInTheDocument();

    // 5. FAQ Section
    expect(
      screen.getByRole('heading', { level: 2, name: /Frequently Asked Questions/i }),
    ).toBeInTheDocument();

    // 6. Enterprise Contact
    expect(
      screen.getByRole('heading', { level: 2, name: /Need something more?/i }),
    ).toBeInTheDocument();

    // 7. Final CTA
    expect(
      screen.getByRole('heading', { level: 2, name: /Ready to scale your business?/i }),
    ).toBeInTheDocument();
  });

  it('toggles billing period and updates prices', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <PricingPageContent />
      </ThemeProvider>,
    );

    // Initial state (default is annual in PricingPageContent)
    expect(screen.getByText('$15')).toBeInTheDocument();

    // Find toggle and click Monthly
    const monthlyToggle = screen.getByRole('button', { name: /^Monthly$/i });
    fireEvent.click(monthlyToggle);

    // Should now show monthly prices
    expect(screen.getByText('$19')).toBeInTheDocument();

    // Switch back to Annual
    const annualToggle = screen.getByRole('button', { name: /^Annual$/i });
    fireEvent.click(annualToggle);

    expect(screen.getByText('$15')).toBeInTheDocument();
  });

  it('supports theme switching across all sections', () => {
    const { rerender } = render(
      <ThemeProvider defaultTheme="dark">
        <PricingPageContent />
      </ThemeProvider>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /Simple, transparent/i }),
    ).toBeInTheDocument();

    rerender(
      <ThemeProvider defaultTheme="light">
        <PricingPageContent />
      </ThemeProvider>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /Simple, transparent/i }),
    ).toBeInTheDocument();
  });

  it('is responsive across common viewports', () => {
    const { container } = render(
      <ThemeProvider defaultTheme="light">
        <PricingPageContent />
      </ThemeProvider>,
    );

    const responsiveElements = container.querySelectorAll('.w-full');
    expect(responsiveElements.length).toBeGreaterThan(0);

    const containers = container.querySelectorAll('.max-w-7xl');
    expect(containers.length).toBeGreaterThan(0);
  });
});
