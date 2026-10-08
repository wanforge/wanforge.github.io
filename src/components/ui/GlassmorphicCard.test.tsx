import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GlassmorphicCard } from './GlassmorphicCard';

describe('GlassmorphicCard', () => {
  describe('Basic Rendering', () => {
    it('renders children correctly', () => {
      render(
        <GlassmorphicCard data-testid="glass-card">
          <p>Glass content</p>
        </GlassmorphicCard>,
      );

      expect(screen.getByTestId('glass-card')).toBeInTheDocument();
      expect(screen.getByText('Glass content')).toBeInTheDocument();
    });

    it('applies the glass utility class', () => {
      render(
        <GlassmorphicCard data-testid="glass-card">
          <p>Content</p>
        </GlassmorphicCard>,
      );

      expect(screen.getByTestId('glass-card')).toHaveClass('glass');
    });

    it('renders with default props', () => {
      render(
        <GlassmorphicCard data-testid="glass-card">
          <p>Content</p>
        </GlassmorphicCard>,
      );

      const card = screen.getByTestId('glass-card');
      expect(card).toHaveClass('rounded-lg');
      expect(card).toHaveClass('p-4');
    });
  });

  describe('Glow Effect', () => {
    it('applies glow styles by default', () => {
      render(
        <GlassmorphicCard data-testid="glass-card">
          <p>Content</p>
        </GlassmorphicCard>,
      );

      expect(screen.getByTestId('glass-card')).toHaveClass(
        'shadow-[0_0_15px_rgba(var(--color-primary-500),0.1)]',
      );
    });

    it('does not apply glow styles when glow is false', () => {
      render(
        <GlassmorphicCard glow={false} data-testid="glass-card">
          <p>Content</p>
        </GlassmorphicCard>,
      );

      expect(screen.getByTestId('glass-card')).not.toHaveClass(
        'shadow-[0_0_15px_rgba(var(--color-primary-500),0.1)]',
      );
    });
  });

  describe('Card Props Integration', () => {
    it('renders with small padding', () => {
      render(
        <GlassmorphicCard padding="sm" data-testid="glass-card">
          <p>Content</p>
        </GlassmorphicCard>,
      );

      expect(screen.getByTestId('glass-card')).toHaveClass('p-3');
    });

    it('renders with extra large border radius', () => {
      render(
        <GlassmorphicCard radius="xl" data-testid="glass-card">
          <p>Content</p>
        </GlassmorphicCard>,
      );

      expect(screen.getByTestId('glass-card')).toHaveClass('rounded-2xl');
    });

    it('applies hover styles when hover prop is true', () => {
      render(
        <GlassmorphicCard hover data-testid="glass-card">
          <p>Content</p>
        </GlassmorphicCard>,
      );

      const card = screen.getByTestId('glass-card');
      expect(card).toHaveClass('transition-all');
      expect(card).toHaveClass('hover:-translate-y-1');
      expect(card).toHaveClass('cursor-pointer');
    });

    it('applies full width class when fullWidth is true', () => {
      render(
        <GlassmorphicCard fullWidth data-testid="glass-card">
          <p>Content</p>
        </GlassmorphicCard>,
      );

      expect(screen.getByTestId('glass-card')).toHaveClass('w-full');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <GlassmorphicCard ref={ref} data-testid="glass-card">
          <p>Content</p>
        </GlassmorphicCard>,
      );

      expect(ref.current).toBe(screen.getByTestId('glass-card'));
    });
  });
});
