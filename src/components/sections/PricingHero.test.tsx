import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { PricingHero } from './PricingHero';
import { pageSEO } from '@/config/site';

describe('PricingHero', () => {
  const defaultProps = {
    billingPeriod: 'annual' as const,
    onBillingPeriodChange: vi.fn(),
  };

  it('renders correctly with default SEO content', () => {
    render(<PricingHero {...defaultProps} />);

    // Check for the headline parts
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Simple, transparent/i);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/pricing for everyone/i);

    // Check for description (which also contains 'Simple, transparent')
    expect(screen.getByText(pageSEO.pricing.description)).toBeInTheDocument();
  });

  it('renders the billing toggle', () => {
    render(<PricingHero {...defaultProps} />);
    expect(screen.getByText(/Monthly/i)).toBeInTheDocument();
    expect(screen.getByText(/Annual/i)).toBeInTheDocument();
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('calls onBillingPeriodChange when monthly label is clicked', () => {
    render(<PricingHero {...defaultProps} />);

    const monthlyButton = screen.getByText(/Monthly/i);
    fireEvent.click(monthlyButton);

    expect(defaultProps.onBillingPeriodChange).toHaveBeenCalledWith('monthly');
  });

  it('calls onBillingPeriodChange when switch is clicked', () => {
    render(<PricingHero {...defaultProps} />);

    const toggleSwitch = screen.getByRole('switch');
    fireEvent.click(toggleSwitch);

    expect(defaultProps.onBillingPeriodChange).toHaveBeenCalledWith('monthly');
  });

  it('applies custom className', () => {
    const { container } = render(<PricingHero {...defaultProps} className="custom-class" />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('custom-class');
  });

  it('has correct accessibility attributes', () => {
    render(<PricingHero {...defaultProps} />);
    const section = screen.getByLabelText(/Pricing Hero Section/i);
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'pricing-hero');
  });
});
