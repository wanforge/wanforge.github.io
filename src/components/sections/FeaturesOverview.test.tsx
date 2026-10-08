import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeaturesOverview } from './FeaturesOverview';
import { featuresOverview } from '@/data/features';
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

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe('FeaturesOverview Component', () => {
  const renderFeaturesOverview = () => {
    return render(
      <ThemeProvider>
        <FeaturesOverview />
      </ThemeProvider>,
    );
  };

  it('renders the section heading correctly', () => {
    renderFeaturesOverview();
    const heading = screen.getByRole('heading', {
      name: /Everything you need to scale your business/i,
    });
    expect(heading).toBeDefined();
  });

  it('renders the section subheading correctly', () => {
    renderFeaturesOverview();
    const subheading = screen.getByText(
      /Our comprehensive suite of tools is designed to help you automate workflows/i,
    );
    expect(subheading).toBeDefined();
  });

  it('renders all features from placeholder data', () => {
    renderFeaturesOverview();
    featuresOverview.forEach((feature) => {
      expect(screen.getByText(feature.title)).toBeDefined();
      expect(screen.getByText(feature.description)).toBeDefined();
    });
  });

  it('renders the section with correct role and label', () => {
    renderFeaturesOverview();
    const section = screen.getByRole('region', { name: /Features Overview/i });
    expect(section).toBeDefined();
  });

  it('renders icons for each feature', () => {
    const { container } = renderFeaturesOverview();
    // Lucide icons are SVGs
    const svgs = container.querySelectorAll('svg');
    // 6 features + any decorative SVGs. We expect at least one SVG per feature.
    expect(svgs.length).toBeGreaterThanOrEqual(featuresOverview.length);
  });
});
