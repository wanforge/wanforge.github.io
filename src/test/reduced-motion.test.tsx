// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { a11yTesting, renderComponent } from './utils';
import { useReducedMotion } from '@/utils/reducedMotion';
import AnimatedElement from '@/components/animation/AnimatedElement';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Hero from '@/components/sections/Hero';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Toast } from '@/components/ui/Toast';
import { Header } from '@/components/layout/Header';

// Hook for verification
const TestHook = () => {
  const { prefersReducedMotion } = useReducedMotion();
  return <div data-testid="reduced-motion-state">{prefersReducedMotion.toString()}</div>;
};

describe('Reduced Motion Compliance', () => {
  describe('useReducedMotion hook', () => {
    it('detects when reduced motion is NOT preferred', () => {
      a11yTesting.mockReducedMotion(false);
      render(<TestHook />);
      expect(screen.getByTestId('reduced-motion-state')).toHaveTextContent('false');
    });

    it('detects when reduced motion IS preferred', () => {
      a11yTesting.mockReducedMotion(true);
      render(<TestHook />);
      expect(screen.getByTestId('reduced-motion-state')).toHaveTextContent('true');
    });
  });

  describe('AnimatedElement component', () => {
    it('applies final styles immediately when reduced motion is enabled', () => {
      a11yTesting.mockReducedMotion(true);
      const keyframes = { opacity: [0, 1], scale: [0.9, 1] };

      render(
        <AnimatedElement keyframes={keyframes} data-testid="animated">
          Content
        </AnimatedElement>,
      );

      const element = screen.getByTestId('animated');
      // Should have final opacity and scale applied to style attribute
      expect(element.style.opacity).toBe('1');
      expect(element.style.scale).toBe('1');
    });

    it('uses preset final styles immediately when reduced motion is enabled', () => {
      a11yTesting.mockReducedMotion(true);

      render(
        <AnimatedElement preset="fadeInUp" data-testid="animated-preset">
          Content
        </AnimatedElement>,
      );

      const element = screen.getByTestId('animated-preset');
      // fadeInUp preset: initial { opacity: 0, y: 20 }, animate { opacity: 1, y: 0 }
      expect(element.style.opacity).toBe('1');
      expect(element.style.y).toBe('0');
    });
  });

  describe('Button component', () => {
    it('does not create ripples when reduced motion is enabled', () => {
      a11yTesting.mockReducedMotion(true);
      render(
        <Button ripple data-testid="button">
          Click Me
        </Button>,
      );

      const button = screen.getByTestId('button');
      fireEvent.mouseDown(button);

      const spans = button.querySelectorAll('span');
      // Button.tsx: Line 214 has the outer content span, Line 227 has the inner children span.
      // Ripples are rendered as additional spans.
      // So if no ripples, there should be 2 spans.
      expect(spans.length).toBe(2);
    });

    it('remains functional when reduced motion is enabled', () => {
      a11yTesting.mockReducedMotion(true);
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} data-testid="button">
          Click Me
        </Button>,
      );

      fireEvent.click(screen.getByTestId('button'));
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('Card component', () => {
    it('does not apply hover lift class when reduced motion is enabled', () => {
      a11yTesting.mockReducedMotion(true);
      render(
        <Card hover data-testid="card">
          Card Content
        </Card>,
      );

      const card = screen.getByTestId('card');
      expect(card.className).not.toContain('hover:-translate-y-1');
    });

    it('renders children correctly when reduced motion is enabled', () => {
      a11yTesting.mockReducedMotion(true);
      render(<Card>Test Content</Card>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  describe('Input component', () => {
    it('renders and allows typing when reduced motion is enabled', () => {
      a11yTesting.mockReducedMotion(true);
      render(<Input label="Test Label" data-testid="input" />);

      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'test value' } });
      expect(input).toHaveValue('test value');
    });
  });

  describe('AnimatedCounter component', () => {
    it('shows target value immediately when reduced motion is enabled', () => {
      a11yTesting.mockReducedMotion(true);
      render(<AnimatedCounter value={100} from={0} data-testid="counter" />);

      expect(screen.getByText('100')).toBeInTheDocument();
    });
  });

  describe('Toast component', () => {
    it('renders correctly when reduced motion is enabled', () => {
      a11yTesting.mockReducedMotion(true);
      const handleClose = vi.fn();
      render(<Toast id="test" message="Test Message" onClose={handleClose} />);

      expect(screen.getByText('Test Message')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('can be closed when reduced motion is enabled', () => {
      a11yTesting.mockReducedMotion(true);
      const handleClose = vi.fn();
      render(<Toast id="test" message="Test Message" onClose={handleClose} />);

      fireEvent.click(screen.getByLabelText('Close'));
      expect(handleClose).toHaveBeenCalledWith('test');
    });
  });

  describe('Header component', () => {
    it('renders navigation even with reduced motion', () => {
      a11yTesting.mockReducedMotion(true);
      renderComponent(<Header />);

      // Should have logo
      expect(screen.getByLabelText(/Home/i)).toBeInTheDocument();
      // Should have primary CTA
      expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
    });
  });

  describe('Hero section', () => {
    it('renders hero content even with reduced motion', () => {
      a11yTesting.mockReducedMotion(true);
      renderComponent(<Hero />);

      // Hero should have headline
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      // Hero should have primary CTA
      expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
    });
  });
});
