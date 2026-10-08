import * as React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MobileMenuButton, MobileNavigation } from './MobileNavigation';
import { ThemeProvider } from '../ThemeProvider';

// Wrap component with ThemeProvider for testing
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('MobileNavigation', () => {
  beforeEach(() => {
    // Reset body overflow
    document.body.style.overflow = '';
    // Mock matchMedia for reduced motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
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
  });

  afterEach(() => {
    document.body.style.overflow = '';
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders nothing when closed', () => {
      const { container } = renderWithTheme(<MobileNavigation isOpen={false} onClose={vi.fn()} />);
      expect(container.firstChild).toBeNull();
    });

    it('renders when open', () => {
      renderWithTheme(<MobileNavigation isOpen={true} onClose={vi.fn()} />);
      expect(screen.getByText('Menu')).toBeInTheDocument();
      expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
    });

    it('renders navigation links', () => {
      renderWithTheme(<MobileNavigation isOpen={true} onClose={vi.fn()} />);
      expect(screen.getByText('Features')).toBeInTheDocument();
      expect(screen.getByText('Pricing')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Blog')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('renders theme toggle', () => {
      renderWithTheme(<MobileNavigation isOpen={true} onClose={vi.fn()} />);
      expect(screen.getByText('Appearance')).toBeInTheDocument();
    });

    it('renders CTA button by default', () => {
      renderWithTheme(<MobileNavigation isOpen={true} onClose={vi.fn()} />);
      expect(screen.getByText('Get Started')).toBeInTheDocument();
    });

    it('hides CTA button when showCta is false', () => {
      renderWithTheme(<MobileNavigation isOpen={true} onClose={vi.fn()} showCta={false} />);
      expect(screen.queryByText('Get Started')).not.toBeInTheDocument();
    });

    it('uses custom CTA text when provided', () => {
      renderWithTheme(
        <MobileNavigation isOpen={true} onClose={vi.fn()} ctaText="Start Free Trial" />,
      );
      expect(screen.getByText('Start Free Trial')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onClose when close button is clicked', () => {
      const onClose = vi.fn();
      renderWithTheme(<MobileNavigation isOpen={true} onClose={onClose} />);

      fireEvent.click(screen.getByLabelText('Close menu'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when backdrop is clicked', () => {
      const onClose = vi.fn();
      renderWithTheme(<MobileNavigation isOpen={true} onClose={onClose} />);

      // The backdrop is the first div rendered
      const backdrop = document.querySelector('[class*="backdrop-blur-sm"]');
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(onClose).toHaveBeenCalledTimes(1);
      }
    });

    it('calls onClose when navigation link is clicked', () => {
      const onClose = vi.fn();
      renderWithTheme(<MobileNavigation isOpen={true} onClose={onClose} />);

      fireEvent.click(screen.getByText('Features'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onCtaClick when CTA is clicked', () => {
      const onCtaClick = vi.fn();
      const onClose = vi.fn();
      renderWithTheme(<MobileNavigation isOpen={true} onClose={onClose} onCtaClick={onCtaClick} />);

      fireEvent.click(screen.getByText('Get Started'));
      expect(onCtaClick).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('has dialog role when open', () => {
      renderWithTheme(<MobileNavigation isOpen={true} onClose={vi.fn()} />);
      expect(screen.getByRole('dialog', { name: 'Mobile navigation menu' })).toBeInTheDocument();
    });

    it('has aria-modal attribute', () => {
      renderWithTheme(<MobileNavigation isOpen={true} onClose={vi.fn()} />);
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('close button has accessible label', () => {
      renderWithTheme(<MobileNavigation isOpen={true} onClose={vi.fn()} />);
      expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
    });

    it('navigation has correct aria-label', () => {
      renderWithTheme(<MobileNavigation isOpen={true} onClose={vi.fn()} />);
      expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeInTheDocument();
    });
  });

  describe('Body Scroll Lock', () => {
    it('locks body scroll when open', () => {
      renderWithTheme(<MobileNavigation isOpen={true} onClose={vi.fn()} />);
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body scroll when closed', () => {
      const { rerender } = renderWithTheme(<MobileNavigation isOpen={true} onClose={vi.fn()} />);
      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <ThemeProvider>
          <MobileNavigation isOpen={false} onClose={vi.fn()} />
        </ThemeProvider>,
      );
      expect(document.body.style.overflow).toBe('');
    });
  });
});

describe('MobileMenuButton', () => {
  it('renders hamburger icon when closed', () => {
    render(<MobileMenuButton isOpen={false} onClick={vi.fn()} />);
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('renders close icon when open', () => {
    render(<MobileMenuButton isOpen={true} onClick={vi.fn()} />);
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<MobileMenuButton isOpen={false} onClick={onClick} />);

    fireEvent.click(screen.getByLabelText('Open menu'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has correct aria-expanded attribute', () => {
    const { rerender } = render(<MobileMenuButton isOpen={false} onClick={vi.fn()} />);
    expect(screen.getByLabelText('Open menu')).toHaveAttribute('aria-expanded', 'false');

    rerender(<MobileMenuButton isOpen={true} onClick={vi.fn()} />);
    expect(screen.getByLabelText('Close menu')).toHaveAttribute('aria-expanded', 'true');
  });

  it('references mobile navigation via aria-controls', () => {
    render(<MobileMenuButton isOpen={false} onClick={vi.fn()} />);
    expect(screen.getByLabelText('Open menu')).toHaveAttribute(
      'aria-controls',
      'mobile-navigation',
    );
  });

  it('applies custom className', () => {
    render(<MobileMenuButton isOpen={false} onClick={vi.fn()} className="custom-class" />);
    expect(screen.getByLabelText('Open menu')).toHaveClass('custom-class');
  });
});
