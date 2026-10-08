import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import * as axeMatchers from 'vitest-axe/matchers';
import { ThemeProvider } from '@/components/ThemeProvider';
import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
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
import { Header } from '@/components/layout/Header';

// Extend expect with a11y matchers
expect.extend(axeMatchers);

// Mock Lucide icons to avoid noise and prevent missing export errors
vi.mock('lucide-react', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  const mocks: Record<string, React.FC<Record<string, unknown>>> = {};

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

// Mock browser APIs that might be missing in JSDOM
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

/**
 * Homepage Mock Component
 *
 * Replicates the structure of src/pages/index.astro for accessibility testing.
 */
const MockHomepage = () => (
  <>
    <Header />
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
    <footer />
  </>
);

describe('Homepage Accessibility', () => {
  const themes = ['light', 'dark'] as const;

  themes.forEach((theme) => {
    it(`should have no accessibility violations in ${theme} mode`, async () => {
      const { container } = render(
        <ThemeProvider defaultTheme={theme}>
          <MockHomepage />
        </ThemeProvider>,
      );

      // Run axe on the entire rendered homepage
      const results = await axe(container);

      // We expect no violations for WCAG 2.1 AA
      expect(results).toHaveNoViolations();
    });
  });
});
