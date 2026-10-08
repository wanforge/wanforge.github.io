// @vitest-environment jsdom
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Spinner } from './Spinner';
import { PageLoader } from './PageLoader';
import { Skeleton } from './Skeleton';
import * as reducedMotion from '@/utils/reducedMotion';

// Mock useReducedMotion
vi.mock('@/utils/reducedMotion', () => ({
  useReducedMotion: vi.fn(),
  getPrefersReducedMotion: vi.fn(() => false),
  isReducedMotionSupported: vi.fn(() => true),
  ACCESSIBILITY: {
    respectReducedMotion: true,
    reducedMotionDuration: 0.01,
  },
  default: {
    useReducedMotion: vi.fn(),
    getPrefersReducedMotion: vi.fn(() => false),
    isReducedMotionSupported: vi.fn(() => true),
  },
}));

describe('Loading Animations', () => {
  const mockBaseState = {
    isSupported: true,
    toggle: vi.fn(),
    setPrefersReducedMotion: vi.fn(),
  };

  beforeEach(() => {
    (reducedMotion.useReducedMotion as Mock).mockReturnValue({
      ...mockBaseState,
      prefersReducedMotion: false,
    });
  });

  describe('Spinner', () => {
    it('renders correctly', () => {
      render(<Spinner data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toBeInTheDocument();
      expect(spinner.querySelector('svg')).toHaveClass('animate-spin');
    });

    it('applies correct size classes', () => {
      const { rerender } = render(<Spinner data-testid="spinner" size="sm" />);
      expect(screen.getByTestId('spinner').querySelector('svg')).toHaveClass('h-4 w-4');

      rerender(<Spinner data-testid="spinner" size="xl" />);
      expect(screen.getByTestId('spinner').querySelector('svg')).toHaveClass('h-12 w-12');
    });

    it('respects reduced motion', () => {
      (reducedMotion.useReducedMotion as Mock).mockReturnValue({
        ...mockBaseState,
        prefersReducedMotion: true,
      });

      render(<Spinner data-testid="spinner" />);
      expect(screen.getByTestId('spinner').querySelector('svg')).toHaveClass('animate-none');
    });
  });

  describe('PageLoader', () => {
    it('renders when isVisible is true', () => {
      render(<PageLoader isVisible={true} message="Loading Page..." />);
      expect(screen.getByText('Loading Page...')).toBeInTheDocument();
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('does not render when isVisible is false', () => {
      render(<PageLoader isVisible={false} />);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('renders as full page by default', () => {
      const { container } = render(<PageLoader isVisible={true} />);
      const loader = container.firstChild as HTMLElement;
      expect(loader).toHaveClass('fixed');
      expect(loader).toHaveClass('inset-0');
    });
  });

  describe('Skeleton Reduced Motion', () => {
    it('disables pulse animation when prefers-reduced-motion is true', () => {
      (reducedMotion.useReducedMotion as Mock).mockReturnValue({
        ...mockBaseState,
        prefersReducedMotion: true,
      });

      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).not.toHaveClass('animate-pulse');
    });
  });
});
