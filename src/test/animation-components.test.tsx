/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { RevealGrid, ScrollReveal } from '@/components/animation/ScrollReveal';

// Mock motion
vi.mock('motion', () => ({
  animate: vi.fn(),
  inView: vi.fn((_element, callback) => {
    callback(); // Trigger immediately for testing
    return () => {};
  }),
}));

// Mock reduced motion
vi.mock('@/utils/reducedMotion', () => ({
  useReducedMotion: () => ({ prefersReducedMotion: false }),
  getAccessibleDuration: (d: number) => d,
}));

describe('ScrollReveal Components', () => {
  describe('ScrollReveal', () => {
    it('renders children correctly', () => {
      const { getByText } = render(
        <ScrollReveal>
          <div>Reveal Me</div>
        </ScrollReveal>,
      );
      expect(getByText('Reveal Me')).toBeDefined();
    });

    it('uses the specified HTML element', () => {
      const { container } = render(
        <ScrollReveal as="section">
          <div>Content</div>
        </ScrollReveal>,
      );
      expect(container.querySelector('section')).toBeDefined();
    });
  });

  describe('RevealGrid', () => {
    it('renders grid children', () => {
      const { getByText } = render(
        <RevealGrid>
          <div>Item 1</div>
          <div>Item 2</div>
        </RevealGrid>,
      );
      expect(getByText('Item 1')).toBeDefined();
      expect(getByText('Item 2')).toBeDefined();
    });

    it('applies custom className', () => {
      const { container } = render(
        <RevealGrid className="grid-cols-2">
          <div>Item</div>
        </RevealGrid>,
      );
      expect(container.firstChild).toHaveClass('grid-cols-2');
    });
  });
});
