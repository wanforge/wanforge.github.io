import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IntegrationLogo } from './IntegrationLogo';

describe('IntegrationLogo', () => {
  const defaultProps = {
    name: 'Test Integration',
    logo: '/images/integrations/test.svg',
  };

  it('renders logo with correct alt text', () => {
    render(<IntegrationLogo {...defaultProps} />);

    const img = screen.getByAltText('Test Integration logo');
    expect(img).toBeInTheDocument();
    // getAssetPath resolves /images/... to /images/... by default in tests
    expect(img).toHaveAttribute('src', '/images/integrations/test.svg');
  });

  it('applies grayscale class by default', () => {
    render(<IntegrationLogo {...defaultProps} />);

    const img = screen.getByAltText('Test Integration logo');
    expect(img).toHaveClass('grayscale');
    expect(img).toHaveClass('opacity-60');
    expect(img).toHaveClass('dark:invert');
  });

  it('can disable grayscale effect', () => {
    render(<IntegrationLogo {...defaultProps} grayscale={false} />);

    const img = screen.getByAltText('Test Integration logo');
    expect(img).not.toHaveClass('grayscale');
    expect(img).toHaveClass('opacity-100');
  });

  it('renders as a link when href is provided', () => {
    render(<IntegrationLogo {...defaultProps} href="https://example.com" />);

    // It has role="button" because it matches demo link patterns (external URL)
    const link = screen.getByRole('button');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<IntegrationLogo {...defaultProps} size="sm" />);
    let img = screen.getByAltText('Test Integration logo');
    // Mobile height is h-6
    expect(img).toHaveClass('h-6');

    rerender(<IntegrationLogo {...defaultProps} size="lg" />);
    img = screen.getByAltText('Test Integration logo');
    // Mobile height is h-10
    expect(img).toHaveClass('h-10');
  });

  it('applies custom className to the container', () => {
    render(<IntegrationLogo {...defaultProps} className="custom-logo" />);

    // The DemoLink wraps everything and gets the className
    const link = screen.getByRole('link');
    expect(link).toHaveClass('custom-logo');
  });

  it('toggles hover background based on showHoverBg prop', () => {
    const { rerender } = render(<IntegrationLogo {...defaultProps} showHoverBg={true} />);
    let link = screen.getByRole('link');
    expect(link).toHaveClass('hover:bg-bg-secondary/50');

    rerender(<IntegrationLogo {...defaultProps} showHoverBg={false} />);
    link = screen.getByRole('link');
    expect(link).not.toHaveClass('hover:bg-bg-secondary/50');
  });
});
