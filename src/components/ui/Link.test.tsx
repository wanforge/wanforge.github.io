import * as React from 'react';
/**
 * Link Component Tests
 *
 * Comprehensive test suite for the Link component and its variants.
 *
 * @module components/ui
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ArrowLink, ExternalLinkComponent, Link, NavLink, SkipLink } from './Link';
import * as paths from '@/config/paths';

// Mock the paths module
vi.mock('@/config/paths', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    resolveHref: vi.fn((href: string) => href),
    isExternalUrl: vi.fn((url: string) => url.startsWith('http') || url.startsWith('//')),
  };
});

describe('Link Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe('Basic Rendering', () => {
    it('renders with default variant', () => {
      render(<Link href="/test">Test Link</Link>);
      const link = screen.getByText('Test Link');
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
    });

    it('renders with correct href', () => {
      render(<Link href="/pricing">View Pricing</Link>);
      const link = screen.getByText('View Pricing');
      expect(link).toHaveAttribute('href', '/pricing');
    });

    it('renders children correctly', () => {
      render(
        <Link href="/test">
          <span data-testid="child">Child Element</span>
        </Link>,
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant with underline', () => {
      render(<Link href="/test">Default Link</Link>);
      const link = screen.getByText('Default Link');
      expect(link).toHaveClass('underline');
      expect(link).toHaveClass('text-primary-600');
    });

    it('renders subtle variant without default underline', () => {
      render(
        <Link href="/test" variant="subtle">
          Subtle Link
        </Link>,
      );
      const link = screen.getByText('Subtle Link');
      expect(link).toHaveClass('text-text-secondary');
      expect(link).toHaveClass('hover:underline');
    });

    it('renders underline variant with always-on underline', () => {
      render(
        <Link href="/test" variant="underline">
          Underline Link
        </Link>,
      );
      const link = screen.getByText('Underline Link');
      expect(link).toHaveClass('underline');
      expect(link).toHaveClass('underline-offset-4');
    });

    it('renders button variant with button styles', () => {
      render(
        <Link href="/test" variant="button">
          Button Link
        </Link>,
      );
      const link = screen.getByText('Button Link');
      expect(link).toHaveClass('bg-primary-700');
      expect(link).toHaveClass('rounded-lg');
      expect(link).toHaveClass('px-4');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(
        <Link href="/test" size="sm">
          Small Link
        </Link>,
      );
      const link = screen.getByText('Small Link');
      expect(link).toHaveClass('text-sm');
    });

    it('renders medium size (default)', () => {
      render(
        <Link href="/test" size="md">
          Medium Link
        </Link>,
      );
      const link = screen.getByText('Medium Link');
      expect(link).toHaveClass('text-base');
    });

    it('renders large size', () => {
      render(
        <Link href="/test" size="lg">
          Large Link
        </Link>,
      );
      const link = screen.getByText('Large Link');
      expect(link).toHaveClass('text-lg font-medium');
    });
  });

  describe('External Links', () => {
    it('detects external URLs', () => {
      render(<Link href="https://example.com">External Link</Link>);
      const link = screen.getByText('External Link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('shows external icon for external links', () => {
      render(<Link href="https://example.com">External Link</Link>);
      const link = screen.getByText('External Link');
      const icon = link.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('hides external icon when showExternalIcon is false', () => {
      render(
        <Link href="https://example.com" showExternalIcon={false}>
          No Icon
        </Link>,
      );
      const link = screen.getByText('No Icon');
      const icon = link.querySelector('svg');
      expect(icon).not.toBeInTheDocument();
    });

    it('opens in same tab when openExternalInNewTab is false', () => {
      render(
        <Link href="https://example.com" openExternalInNewTab={false}>
          Same Tab
        </Link>,
      );
      const link = screen.getByText('Same Tab');
      expect(link).not.toHaveAttribute('target');
    });
  });

  describe('Internal Links', () => {
    it('does not add external attributes to internal links', () => {
      render(<Link href="/internal">Internal Link</Link>);
      const link = screen.getByText('Internal Link');
      expect(link).not.toHaveAttribute('target');
      expect(link).not.toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('does not show external icon for internal links', () => {
      render(<Link href="/internal">Internal Link</Link>);
      const link = screen.getByText('Internal Link');
      const icon = link.querySelector('svg');
      expect(icon).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has focus-visible ring styles', () => {
      render(<Link href="/test">Accessible Link</Link>);
      const link = screen.getByText('Accessible Link');
      expect(link).toHaveClass('focus-visible:ring-2');
      expect(link).toHaveClass('focus-visible:ring-primary-500');
    });

    it('supports custom aria-label', () => {
      render(
        <Link href="/test" aria-label="Custom Label">
          Link
        </Link>,
      );
      const link = screen.getByLabelText('Custom Label');
      expect(link).toBeInTheDocument();
    });

    it('supports ref forwarding', () => {
      const ref = { current: null as HTMLAnchorElement | null };
      render(
        <Link href="/test" ref={ref}>
          Ref Link
        </Link>,
      );
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });
  });

  describe('Custom Classes', () => {
    it('applies custom className', () => {
      render(
        <Link href="/test" className="custom-class">
          Custom Link
        </Link>,
      );
      const link = screen.getByText('Custom Link');
      expect(link).toHaveClass('custom-class');
    });

    it('combines custom classes with variant classes', () => {
      render(
        <Link href="/test" variant="button" className="my-custom-class">
          Combined Classes
        </Link>,
      );
      const link = screen.getByText('Combined Classes');
      expect(link).toHaveClass('bg-primary-700');
      expect(link).toHaveClass('my-custom-class');
    });
  });

  describe('Event Handling', () => {
    it('calls onClick handler', () => {
      const handleClick = vi.fn();
      render(
        <Link href="/test" onClick={handleClick}>
          Clickable
        </Link>,
      );
      const link = screen.getByText('Clickable');
      fireEvent.click(link);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('prevents default when onClick calls preventDefault', () => {
      const handleClick = vi.fn((e) => e.preventDefault());
      render(
        <Link href="/test" onClick={handleClick}>
          Prevent Default
        </Link>,
      );
      const link = screen.getByText('Prevent Default');
      fireEvent.click(link);
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('Path Resolution', () => {
    it('resolves paths when resolvePath is true', () => {
      const mockResolveHref = vi.mocked(paths.resolveHref);
      mockResolveHref.mockReturnValueOnce('/resolved/path');

      render(<Link href="/original">Resolved Link</Link>);
      const link = screen.getByText('Resolved Link');
      expect(mockResolveHref).toHaveBeenCalledWith('/original');
      expect(link).toHaveAttribute('href', '/resolved/path');
    });

    it('skips path resolution when resolvePath is false', () => {
      const mockResolveHref = vi.mocked(paths.resolveHref);

      render(
        <Link href="/original" resolvePath={false}>
          Unresolved Link
        </Link>,
      );
      const link = screen.getByText('Unresolved Link');
      expect(mockResolveHref).not.toHaveBeenCalledWith('/original');
      expect(link).toHaveAttribute('href', '/original');
    });
  });

  describe('Underline Offset', () => {
    it('applies default underline offset of 2', () => {
      render(<Link href="/test">Default Offset</Link>);
      const link = screen.getByText('Default Offset');
      expect(link).toHaveClass('underline-offset-2');
    });

    it('applies custom underline offset', () => {
      render(
        <Link href="/test" underlineOffset={4}>
          Custom Offset
        </Link>,
      );
      const link = screen.getByText('Custom Offset');
      expect(link).toHaveClass('underline-offset-4');
    });
  });
});

describe('ExternalLink Component', () => {
  it('always shows external icon', () => {
    render(<ExternalLinkComponent href="https://example.com">External</ExternalLinkComponent>);
    const link = screen.getByText('External');
    const icon = link.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('always opens in new tab', () => {
    render(<ExternalLinkComponent href="https://example.com">External</ExternalLinkComponent>);
    const link = screen.getByText('External');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders children correctly', () => {
    render(<ExternalLinkComponent href="https://example.com">GitHub</ExternalLinkComponent>);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });
});

describe('NavLink Component', () => {
  it('renders with inactive state by default', () => {
    render(<NavLink href="/features">Features</NavLink>);
    const link = screen.getByText('Features');
    expect(link).toHaveClass('text-text-secondary');
  });

  it('renders with active state styling', () => {
    render(
      <NavLink href="/features" isActive>
        Features
      </NavLink>,
    );
    const link = screen.getByText('Features');
    expect(link).toHaveClass('text-primary-600');
    expect(link).toHaveClass('font-medium');
  });

  it('shows active indicator when isActive and showActiveIndicator', () => {
    render(
      <NavLink href="/features" isActive showActiveIndicator>
        Features
      </NavLink>,
    );
    const link = screen.getByText('Features');
    expect(link).toHaveClass('after:bg-primary-500');
  });

  it('sets aria-current when active', () => {
    render(
      <NavLink href="/features" isActive>
        Features
      </NavLink>,
    );
    const link = screen.getByText('Features');
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('does not set aria-current when inactive', () => {
    render(<NavLink href="/features">Features</NavLink>);
    const link = screen.getByText('Features');
    expect(link).not.toHaveAttribute('aria-current');
  });
});

describe('ArrowLink Component', () => {
  it('renders with arrow icon', () => {
    render(<ArrowLink href="/blog">Read More</ArrowLink>);
    const link = screen.getByText('Read More');
    const icon = link.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('has group class for hover animation', () => {
    render(<ArrowLink href="/blog">Read More</ArrowLink>);
    const link = screen.getByText('Read More');
    expect(link).toHaveClass('group');
  });

  it('renders children correctly', () => {
    render(<ArrowLink href="/blog">Full Article</ArrowLink>);
    expect(screen.getByText('Full Article')).toBeInTheDocument();
  });
});

describe('SkipLink Component', () => {
  it('renders with sr-only class', () => {
    render(<SkipLink targetId="main-content">Skip to Content</SkipLink>);
    const link = screen.getByText('Skip to Content');
    expect(link).toHaveClass('sr-only');
  });

  it('has correct href with target ID', () => {
    render(<SkipLink targetId="main-content">Skip to Content</SkipLink>);
    const link = screen.getByText('Skip to Content');
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('becomes visible on focus', () => {
    render(<SkipLink targetId="main-content">Skip to Content</SkipLink>);
    const link = screen.getByText('Skip to Content');
    expect(link).toHaveClass('focus:not-sr-only');
  });

  it('has fixed positioning', () => {
    render(<SkipLink targetId="main-content">Skip to Content</SkipLink>);
    const link = screen.getByText('Skip to Content');
    expect(link).toHaveClass('fixed');
    expect(link).toHaveClass('top-4');
    expect(link).toHaveClass('left-4');
  });

  it('has high z-index', () => {
    render(<SkipLink targetId="main-content">Skip to Content</SkipLink>);
    const link = screen.getByText('Skip to Content');
    expect(link).toHaveClass('z-50');
  });
});
