import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { PricingCard } from './PricingCard';

describe('PricingCard', () => {
  const defaultProps = {
    tier: 'Pro',
    description: 'For growing teams.',
    price: '$49',
    features: ['Feature 1', 'Feature 2', { text: 'Feature 3', included: false }],
    ctaText: 'Get Started',
  };

  it('renders tier name, description, and price correctly', () => {
    render(<PricingCard {...defaultProps} />);

    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('For growing teams.')).toBeInTheDocument();
    expect(screen.getByText('$49')).toBeInTheDocument();
    expect(screen.getByText('/mo')).toBeInTheDocument();
  });

  it('renders all features correctly', () => {
    render(<PricingCard {...defaultProps} />);

    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
    expect(screen.getByText('Feature 3')).toBeInTheDocument();
  });

  it('renders popular badge when isPopular is true', () => {
    render(<PricingCard {...defaultProps} isPopular />);

    expect(screen.getByText('Most Popular')).toBeInTheDocument();
  });

  it('does not render popular badge when isPopular is false', () => {
    render(<PricingCard {...defaultProps} isPopular={false} />);

    expect(screen.queryByText('Most Popular')).not.toBeInTheDocument();
  });

  it('renders CTA as a link when ctaHref is provided', () => {
    render(<PricingCard {...defaultProps} ctaHref="/signup" />);

    // Note: Demo links (like /signup) render with role="button" because they trigger a modal
    const link = screen.getByRole('button', { name: /get started/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/signup/');
  });

  it('renders CTA as a button when ctaHref is not provided', () => {
    render(<PricingCard {...defaultProps} />);

    const button = screen.getByRole('button', { name: /get started/i });
    expect(button).toBeInTheDocument();
  });

  it('calls onCtaClick when button is clicked', () => {
    const onCtaClick = vi.fn();
    render(<PricingCard {...defaultProps} onCtaClick={onCtaClick} />);

    const button = screen.getByRole('button', { name: /get started/i });
    fireEvent.click(button);

    expect(onCtaClick).toHaveBeenCalledTimes(1);
  });

  it('applies popular styles when isPopular is true', () => {
    const { container } = render(<PricingCard {...defaultProps} isPopular />);

    // Check if the card has the primary border class
    const card = container.firstChild;
    expect(card).toHaveClass('border-primary-500');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<PricingCard {...defaultProps} ref={ref} />);

    expect(ref.current).not.toBeNull();
  });
});
