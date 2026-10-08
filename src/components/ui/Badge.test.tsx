import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge, CounterBadge, StatusBadge } from './Badge';

describe('Badge', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Badge>Test Label</Badge>);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('renders as a span element by default', () => {
      render(<Badge>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge.tagName.toLowerCase()).toBe('span');
    });

    it('applies custom className', () => {
      render(<Badge className="custom-class">Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = { current: null as HTMLSpanElement | null };
      render(<Badge ref={ref}>Test</Badge>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Badge>Default</Badge>);
      const badge = screen.getByText('Default');
      expect(badge).toHaveClass('bg-bg-secondary');
      expect(badge).toHaveClass('text-text-secondary');
    });

    it('renders success variant', () => {
      render(<Badge variant="success">Success</Badge>);
      const badge = screen.getByText('Success');
      expect(badge).toHaveClass('bg-success-100');
      expect(badge).toHaveClass('text-success-800');
      expect(badge).toHaveClass('dark:bg-success-900/30');
      expect(badge).toHaveClass('dark:text-success-300');
    });

    it('renders warning variant', () => {
      render(<Badge variant="warning">Warning</Badge>);
      const badge = screen.getByText('Warning');
      expect(badge).toHaveClass('bg-warning-100');
      expect(badge).toHaveClass('text-warning-800');
      expect(badge).toHaveClass('dark:bg-warning-900/30');
      expect(badge).toHaveClass('dark:text-warning-300');
    });

    it('renders error variant', () => {
      render(<Badge variant="error">Error</Badge>);
      const badge = screen.getByText('Error');
      expect(badge).toHaveClass('bg-error-100');
      expect(badge).toHaveClass('text-error-800');
      expect(badge).toHaveClass('dark:bg-error-900/30');
      expect(badge).toHaveClass('dark:text-error-300');
    });

    it('renders info variant', () => {
      render(<Badge variant="info">Info</Badge>);
      const badge = screen.getByText('Info');
      expect(badge).toHaveClass('bg-info-100');
      expect(badge).toHaveClass('text-info-800');
      expect(badge).toHaveClass('dark:bg-info-900/30');
      expect(badge).toHaveClass('dark:text-info-300');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Badge size="sm">Small</Badge>);
      const badge = screen.getByText('Small');
      expect(badge).toHaveClass('px-2');
      expect(badge).toHaveClass('py-0.5');
      expect(badge).toHaveClass('text-xs');
    });

    it('renders medium size (default)', () => {
      render(<Badge>Medium</Badge>);
      const badge = screen.getByText('Medium');
      expect(badge).toHaveClass('px-2.5');
      expect(badge).toHaveClass('py-1');
      expect(badge).toHaveClass('text-sm');
    });
  });

  describe('Border Radius', () => {
    it('renders with rounded-full by default', () => {
      render(<Badge>Rounded</Badge>);
      const badge = screen.getByText('Rounded');
      expect(badge).toHaveClass('rounded-full');
    });

    it('renders with rounded when rounded is false', () => {
      render(<Badge rounded={false}>Not Rounded</Badge>);
      const badge = screen.getByText('Not Rounded');
      expect(badge).toHaveClass('rounded');
      expect(badge).not.toHaveClass('rounded-full');
    });
  });

  describe('Accessibility', () => {
    it('preserves additional HTML attributes', () => {
      render(
        <Badge aria-label="Status badge" data-testid="custom-badge">
          Test
        </Badge>,
      );
      const badge = screen.getByTestId('custom-badge');
      expect(badge).toHaveAttribute('aria-label', 'Status badge');
    });

    it('supports role attribute', () => {
      render(<Badge role="status">Status</Badge>);
      const badge = screen.getByRole('status');
      expect(badge).toBeInTheDocument();
    });
  });
});

describe('StatusBadge', () => {
  describe('Rendering', () => {
    it('renders status text', () => {
      render(<StatusBadge status="Online" />);
      expect(screen.getByText('Online')).toBeInTheDocument();
    });

    it('renders with dot by default', () => {
      render(<StatusBadge status="Active" />);
      const badge = screen.getByText('Active');
      const dot = badge.querySelector('span[aria-hidden="true"]');
      expect(dot).toBeInTheDocument();
    });

    it('can hide dot', () => {
      render(<StatusBadge status="Offline" showDot={false} />);
      const badge = screen.getByText('Offline');
      const dot = badge.querySelector('span[aria-hidden="true"]');
      expect(dot).not.toBeInTheDocument();
    });

    it('applies pulse animation when pulse is true', () => {
      render(<StatusBadge status="Live" pulse />);
      const badge = screen.getByText('Live');
      const dot = badge.querySelector('span[aria-hidden="true"]');
      expect(dot).toHaveClass('animate-pulse');
    });
  });

  describe('Dot Colors', () => {
    it('renders success dot for success variant', () => {
      render(<StatusBadge status="Active" variant="success" />);
      const badge = screen.getByText('Active');
      const dot = badge.querySelector('span[aria-hidden="true"]');
      expect(dot).toHaveClass('bg-success-500');
    });

    it('renders warning dot for warning variant', () => {
      render(<StatusBadge status="Pending" variant="warning" />);
      const badge = screen.getByText('Pending');
      const dot = badge.querySelector('span[aria-hidden="true"]');
      expect(dot).toHaveClass('bg-warning-500');
    });

    it('renders error dot for error variant', () => {
      render(<StatusBadge status="Error" variant="error" />);
      const badge = screen.getByText('Error');
      const dot = badge.querySelector('span[aria-hidden="true"]');
      expect(dot).toHaveClass('bg-error-500');
    });
  });
});

describe('CounterBadge', () => {
  describe('Rendering', () => {
    it('renders count', () => {
      render(<CounterBadge count={5} />);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('renders max+ when count exceeds max', () => {
      render(<CounterBadge count={150} max={99} />);
      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('hides when count is 0 and hideZero is true', () => {
      const { container } = render(<CounterBadge count={0} hideZero />);
      expect(container.firstChild).toBeNull();
    });

    it('shows 0 when hideZero is false', () => {
      render(<CounterBadge count={0} hideZero={false} />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('uses small size by default', () => {
      render(<CounterBadge count={3} />);
      const badge = screen.getByText('3');
      expect(badge).toHaveClass('text-xs');
    });

    it('has tabular numbers for consistent width', () => {
      render(<CounterBadge count={42} />);
      const badge = screen.getByText('42');
      expect(badge).toHaveClass('tabular-nums');
    });

    it('has minimum width', () => {
      render(<CounterBadge count={1} />);
      const badge = screen.getByText('1');
      expect(badge).toHaveClass('min-w-[1.25rem]');
    });
  });

  describe('Custom Max', () => {
    it('uses custom max value', () => {
      render(<CounterBadge count={15} max={10} />);
      expect(screen.getByText('10+')).toBeInTheDocument();
    });

    it('shows exact count when below max', () => {
      render(<CounterBadge count={8} max={10} />);
      expect(screen.getByText('8')).toBeInTheDocument();
    });
  });
});
