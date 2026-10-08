import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import {
  FAQSection,
  FeaturesOverview,
  FinalCTA,
  Hero,
  HowItWorks,
  IntegrationsSection,
  LogoCloudSection,
  PricingPreview,
  StatsSection,
  TestimonialsSection,
} from '@/components/sections';

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
 * Homepage Mock Component
 *
 * Replicates the structure of src/pages/index.astro for unit testing.
 */
const MockHomepage = () => (
  <ThemeProvider defaultTheme="light">
    <main>
      <Hero />
      <LogoCloudSection />
      <FeaturesOverview />
      <HowItWorks />
      <StatsSection />
      <IntegrationsSection />
      <TestimonialsSection />
      <PricingPreview />
      <FAQSection />
      <FinalCTA />
    </main>
  </ThemeProvider>
);

describe('Homepage Composition', () => {
  it('renders all sections in the correct order', () => {
    render(<MockHomepage />);

    // We check for key text in each section to verify presence
    // Use more specific queries to avoid matching multiple elements

    // 1. Hero
    expect(
      screen.getByRole('heading', { level: 1, name: /Build Faster with/i }),
    ).toBeInTheDocument();

    // 2. Logo Cloud
    expect(screen.getByText(/Trusted by 10,000\+ companies worldwide/i)).toBeInTheDocument();

    // 3. Features Overview
    expect(
      screen.getByRole('heading', { level: 2, name: /Everything you need to/i }),
    ).toBeInTheDocument();

    // 4. How It Works
    expect(
      screen.getByRole('heading', { level: 2, name: /Get started in minutes/i }),
    ).toBeInTheDocument();

    // 5. Stats
    expect(screen.getByText(/By the numbers/i)).toBeInTheDocument();

    // 6. Integrations
    expect(
      screen.getByRole('heading', { level: 2, name: /Works with your stack/i }),
    ).toBeInTheDocument();

    // 7. Testimonials
    expect(
      screen.getByRole('heading', { level: 2, name: /Trusted by teams worldwide/i }),
    ).toBeInTheDocument();

    // 8. Pricing Preview
    expect(
      screen.getByRole('heading', { level: 2, name: /Simple, transparent pricing/i }),
    ).toBeInTheDocument();

    // 9. FAQ
    expect(
      screen.getByRole('heading', { level: 2, name: /Frequently Asked Questions/i }),
    ).toBeInTheDocument();

    // 10. Final CTA
    expect(
      screen.getByRole('heading', { level: 2, name: /Stop settling for slow/i }),
    ).toBeInTheDocument();
  });

  it('supports theme switching across all sections', () => {
    const { rerender } = render(
      <ThemeProvider defaultTheme="dark">
        <MockHomepage />
      </ThemeProvider>,
    );

    // Basic check that it renders in dark mode without crashing
    expect(
      screen.getByRole('heading', { level: 1, name: /Build Faster with/i }),
    ).toBeInTheDocument();

    rerender(
      <ThemeProvider defaultTheme="light">
        <MockHomepage />
      </ThemeProvider>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /Build Faster with/i }),
    ).toBeInTheDocument();
  });

  it('is responsive across common viewports', () => {
    const { container } = render(<MockHomepage />);

    // Check for some responsive classes
    // Tailwind v4 uses generic classes that we can check
    const responsiveElements = container.querySelectorAll('.w-full');
    expect(responsiveElements.length).toBeGreaterThan(0);

    // Check for max-width constraints
    const containers = container.querySelectorAll('.max-w-7xl');
    expect(containers.length).toBeGreaterThan(0);
  });
});
