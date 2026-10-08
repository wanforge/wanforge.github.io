import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Skeleton, SkeletonAvatar, SkeletonCard, SkeletonText } from './Skeleton';

describe('Skeleton Components', () => {
  describe('Skeleton', () => {
    it('renders correctly', () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveClass('bg-bg-tertiary');
      expect(skeleton).toHaveClass('animate-pulse');
    });

    it('disables pulse animation when pulse=false', () => {
      render(<Skeleton data-testid="skeleton" pulse={false} />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).not.toHaveClass('animate-pulse');
    });

    it('applies custom className', () => {
      render(<Skeleton data-testid="skeleton" className="h-20 w-20" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('h-20 w-20');
    });
  });

  describe('SkeletonText', () => {
    it('renders a single line by default', () => {
      const { container } = render(<SkeletonText />);
      const lines = container.querySelectorAll('.animate-pulse');
      expect(lines).toHaveLength(1);
    });

    it('renders multiple lines', () => {
      const { container } = render(<SkeletonText lines={3} />);
      const lines = container.querySelectorAll('.animate-pulse');
      expect(lines).toHaveLength(3);
    });

    it('makes the last line shorter when there are multiple lines', () => {
      const { container } = render(<SkeletonText lines={3} />);
      const lines = container.querySelectorAll('.animate-pulse');
      expect(lines[2]).toHaveClass('w-3/4');
    });
  });

  describe('SkeletonAvatar', () => {
    it('renders as a circle', () => {
      render(<SkeletonAvatar data-testid="avatar" />);
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toHaveClass('rounded-full');
    });

    it('applies correct size', () => {
      render(<SkeletonAvatar data-testid="avatar" size="12" />);
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toHaveClass('h-12');
      expect(avatar).toHaveClass('w-12');
    });
  });

  describe('SkeletonCard', () => {
    it('renders card structure with image', () => {
      const { container } = render(<SkeletonCard />);
      const skeletons = container.querySelectorAll('.animate-pulse');
      // 1 image + 1 title + 3 lines of text = 5 skeletons
      expect(skeletons).toHaveLength(5);
    });

    it('renders card structure without image', () => {
      const { container } = render(<SkeletonCard hasImage={false} />);
      const skeletons = container.querySelectorAll('.animate-pulse');
      // 1 title + 3 lines of text = 4 skeletons
      expect(skeletons).toHaveLength(4);
    });
  });
});
