import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Header, MinimalHeader } from './Header';
import { renderWithTheme } from '../../test/utils';

describe('Header', () => {
  beforeEach(() => {
    // Clear body overflow style
    document.body.style.overflow = '';
    // Mock scroll position
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  it('renders with logo and company name', () => {
    renderWithTheme(<Header />);

    expect(screen.getByText('ModernSaaS')).toBeInTheDocument();
    expect(screen.getByLabelText('ModernSaaS - Home')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithTheme(<Header />);

    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders CTA button by default', () => {
    renderWithTheme(<Header />);

    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('hides CTA button when showCta is false', () => {
    renderWithTheme(<Header showCta={false} />);

    expect(screen.queryByText('Get Started')).not.toBeInTheDocument();
  });

  it('uses custom CTA text when provided', () => {
    renderWithTheme(<Header ctaText="Sign Up Now" />);

    expect(screen.getByText('Sign Up Now')).toBeInTheDocument();
  });

  it('calls onCtaClick when CTA is clicked', () => {
    const handleClick = vi.fn();
    renderWithTheme(<Header onCtaClick={handleClick} />);

    const ctaButton = screen.getByText('Get Started');
    fireEvent.click(ctaButton);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders theme toggle button', () => {
    renderWithTheme(<Header />);

    expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument();
  });

  it('renders mobile menu button', () => {
    renderWithTheme(<Header />);

    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('opens mobile menu when menu button is clicked', async () => {
    renderWithTheme(<Header />);

    const menuButton = screen.getByLabelText('Open menu');
    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(screen.getAllByLabelText('Close menu')[0]).toBeInTheDocument();
    });
  });

  it('closes mobile menu when close button is clicked', async () => {
    renderWithTheme(<Header />);

    // Open menu
    const menuButton = screen.getByLabelText('Open menu');
    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(screen.getAllByLabelText('Close menu')[0]).toBeInTheDocument();
    });

    // Close menu
    const closeButton = screen.getAllByLabelText('Close menu')[0]!;
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
    });
  });

  it('has banner role for accessibility', () => {
    renderWithTheme(<Header />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('has navigation role for main nav', () => {
    renderWithTheme(<Header />);

    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    renderWithTheme(<Header className="custom-header-class" />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('custom-header-class');
  });

  it('renders all navigation links with correct hrefs', () => {
    renderWithTheme(<Header />);

    expect(screen.getByText('Features').closest('a')).toHaveAttribute('href', '/features/');
    expect(screen.getByText('Pricing').closest('a')).toHaveAttribute('href', '/pricing/');
    expect(screen.getByText('About').closest('a')).toHaveAttribute('href', '/about/');
    expect(screen.getByText('Blog').closest('a')).toHaveAttribute('href', '/blog/');
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '/contact/');
  });

  it('changes background and height when scrolled', () => {
    const { container } = renderWithTheme(<Header />);
    const header = container.querySelector('header');
    const innerContainer = container.querySelector('header > div > div');

    // Initial state
    expect(header).toHaveClass('bg-transparent');
    expect(innerContainer).toHaveClass('h-20');

    // Scroll down
    Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
    fireEvent.scroll(window);

    expect(header).toHaveClass('bg-bg-primary/80');
    expect(header).toHaveClass('shadow-md');
    expect(innerContainer).toHaveClass('h-16');
  });

  it('highlights the active navigation link', () => {
    // Mock pathname without breaking other location properties
    const originalLocation = window.location;
    Object.defineProperty(window, 'location', {
      value: {
        ...originalLocation,
        pathname: '/features/',
        hostname: originalLocation.hostname || 'localhost',
      },
      writable: true,
      configurable: true,
    });

    renderWithTheme(<Header />);

    const featuresLink = screen.getByText('Features').closest('a');
    expect(featuresLink).toHaveClass('text-text-primary');

    const pricingLink = screen.getByText('Pricing').closest('a');
    expect(pricingLink).toHaveClass('text-text-secondary');

    // Restore location
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
      configurable: true,
    });
  });
});

describe('MinimalHeader', () => {
  it('renders with logo and company name', () => {
    renderWithTheme(<MinimalHeader />);

    expect(screen.getByText('ModernSaaS')).toBeInTheDocument();
  });

  it('has banner role for accessibility', () => {
    renderWithTheme(<MinimalHeader />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    renderWithTheme(<MinimalHeader className="custom-minimal-class" />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('custom-minimal-class');
  });
});
