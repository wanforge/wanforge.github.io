import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { PricingPreview } from './PricingPreview';
import { pricingTiers } from '@/data/pricing';
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

describe('PricingPreview Component', () => {
  const renderPricingPreview = (props = {}) => {
    return render(
      <ThemeProvider>
        <PricingPreview {...props} />
      </ThemeProvider>,
    );
  };

  it('renders the section heading and subheading correctly', () => {
    const heading = 'Custom Heading';
    const subheading = 'Custom Subheading';
    renderPricingPreview({ heading, subheading });

    expect(screen.getByText(heading)).toBeDefined();
    expect(screen.getByText(subheading)).toBeDefined();
  });

  it('renders all pricing tiers', () => {
    renderPricingPreview();
    pricingTiers.forEach((tier) => {
      expect(screen.getByText(tier.name)).toBeDefined();
    });
  });

  it('toggles between monthly and annual prices', () => {
    renderPricingPreview();

    // Find the toggle
    const toggle = screen.getByLabelText(/Toggle annual billing/i);

    // By default it should be annual (per my implementation)
    // Starter annual price is $15
    expect(screen.getAllByText(/\$15/)).toBeDefined();

    // Switch to monthly
    fireEvent.click(toggle);

    // Starter monthly price is $19
    expect(screen.getAllByText(/\$19/)).toBeDefined();
  });

  it('renders the "View all features" link', () => {
    renderPricingPreview();
    const link = screen.getByText(/View all features and full comparison/i);
    expect(link).toBeDefined();
    expect(link.getAttribute('href')).toContain('/pricing');
  });

  it('hides the billing toggle when showToggle is false', () => {
    renderPricingPreview({ showToggle: false });
    expect(screen.queryByLabelText(/Toggle annual billing/i)).toBeNull();
  });
});
