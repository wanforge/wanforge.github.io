import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { PricingTiers } from './PricingTiers';
import { pricingTiers } from '@/data/pricing';

// Mock Framer Motion to avoid animation-related issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
      <div {...props}>{children}</div>
    ),
    p: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
      <p {...props}>{children}</p>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

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

describe('PricingTiers', () => {
  it('renders all pricing tiers', () => {
    render(<PricingTiers billingPeriod="annual" />);

    pricingTiers.forEach((tier) => {
      expect(screen.getByText(tier.name)).toBeDefined();
      expect(screen.getByText(tier.description)).toBeDefined();
    });
  });

  it('displays annual prices when billingPeriod is annual', () => {
    render(<PricingTiers billingPeriod="annual" />);

    // Starter tier annual price is $15
    expect(screen.getByText('$15')).toBeDefined();
    // Pro tier annual price is $39
    expect(screen.getByText('$39')).toBeDefined();
    // Enterprise tier price is null, should show 'Custom'
    expect(screen.getAllByText('Custom').length).toBeGreaterThan(0);
  });

  it('displays monthly prices when billingPeriod is monthly', () => {
    render(<PricingTiers billingPeriod="monthly" />);

    // Starter tier monthly price is $19
    expect(screen.getByText('$19')).toBeDefined();
    // Pro tier monthly price is $49
    expect(screen.getByText('$49')).toBeDefined();
  });

  it('highlights the popular tier', () => {
    render(<PricingTiers billingPeriod="annual" />);

    // Pro tier is popular
    expect(screen.getByText('Most Popular')).toBeDefined();
  });

  it('renders features for each tier', () => {
    render(<PricingTiers billingPeriod="annual" />);

    // Check for some features from the data
    expect(screen.getByText('Up to 5 team members')).toBeDefined();
    expect(screen.getByText('Up to 25 team members')).toBeDefined();
    expect(screen.getByText('Unlimited team members')).toBeDefined();
  });

  it('has accessible section and heading', () => {
    render(<PricingTiers billingPeriod="annual" />);

    const section = screen.getByLabelText('Pricing Plans');
    expect(section).toBeDefined();
    expect(section.tagName).toBe('SECTION');
  });
});
