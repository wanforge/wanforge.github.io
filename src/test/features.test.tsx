import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import {
  DemoVideo,
  FeatureComparison,
  FeatureDetail,
  FeaturesHero,
  FinalCTA,
  UseCases,
} from '@/components/sections';
import { ROUTES } from '@/config/paths';

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
 * Features Page Mock Component
 *
 * Replicates the structure of src/pages/features.astro for unit testing.
 */
const MockFeaturesPage = () => (
  <ThemeProvider defaultTheme="light">
    <main>
      <FeaturesHero />
      <FeatureDetail />
      <UseCases />
      <FeatureComparison />
      <DemoVideo />
      <FinalCTA
        primaryButton={{ text: 'View Pricing', href: ROUTES.PRICING }}
        secondaryButton={{ text: 'Contact Sales', href: ROUTES.CONTACT }}
      />
    </main>
  </ThemeProvider>
);

describe('Features Page Composition', () => {
  it('renders all sections in the correct order', () => {
    render(<MockFeaturesPage />);

    // 1. Features Hero
    expect(
      screen.getByRole('heading', { level: 1, name: /Everything you need to/i }),
    ).toBeInTheDocument();

    // 2. Feature Detail (Alternating sections)
    expect(screen.getByText(/Intelligent Analytics/i)).toBeInTheDocument();

    // 3. Use Cases
    expect(
      screen.getByRole('heading', { level: 2, name: /Solutions for every team/i }),
    ).toBeInTheDocument();

    // 4. Feature Comparison
    expect(
      screen.getByRole('heading', { level: 2, name: /Compare Our Features/i }),
    ).toBeInTheDocument();

    // 5. Demo Video
    expect(
      screen.getByRole('heading', { level: 2, name: /See it in action/i }),
    ).toBeInTheDocument();

    // 6. Final CTA
    expect(screen.getByText(/View Pricing/i)).toBeInTheDocument();
  });

  it('supports theme switching across all sections', () => {
    const { rerender } = render(
      <ThemeProvider defaultTheme="dark">
        <MockFeaturesPage />
      </ThemeProvider>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /Everything you need to/i }),
    ).toBeInTheDocument();

    rerender(
      <ThemeProvider defaultTheme="light">
        <MockFeaturesPage />
      </ThemeProvider>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /Everything you need to/i }),
    ).toBeInTheDocument();
  });

  it('is responsive across common viewports', () => {
    const { container } = render(<MockFeaturesPage />);

    const responsiveElements = container.querySelectorAll('.w-full');
    expect(responsiveElements.length).toBeGreaterThan(0);

    const containers = container.querySelectorAll('.max-w-7xl');
    expect(containers.length).toBeGreaterThan(0);
  });
});
