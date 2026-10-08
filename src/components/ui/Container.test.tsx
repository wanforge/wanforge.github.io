import * as React from 'react';
/**
 * Container Component Tests
 *
 * Unit tests for the Container layout component.
 *
 * @module components/ui
 */

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container, FullContainer, NarrowContainer, WideContainer } from './Container';

describe('Container', () => {
  describe('basic rendering', () => {
    it('renders children correctly', () => {
      render(
        <Container>
          <p data-testid="child">Test content</p>
        </Container>,
      );

      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders as div by default', () => {
      const { container } = render(
        <Container>
          <p>Content</p>
        </Container>,
      );

      expect(container.firstChild?.nodeName).toBe('DIV');
    });

    it('applies custom className', () => {
      const { container } = render(
        <Container className="custom-class">
          <p>Content</p>
        </Container>,
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(
        <Container ref={ref}>
          <p>Content</p>
        </Container>,
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('size variants', () => {
    it('renders default size with max-w-7xl', () => {
      const { container } = render(
        <Container>
          <p>Content</p>
        </Container>,
      );

      expect(container.firstChild).toHaveClass('max-w-7xl');
    });

    it('renders narrow size with max-w-3xl', () => {
      const { container } = render(
        <Container size="narrow">
          <p>Content</p>
        </Container>,
      );

      expect(container.firstChild).toHaveClass('max-w-3xl');
    });

    it('renders wide size with max-w-[1440px]', () => {
      const { container } = render(
        <Container size="wide">
          <p>Content</p>
        </Container>,
      );

      expect(container.firstChild).toHaveClass('max-w-[1440px]');
    });

    it('renders full size with max-w-none', () => {
      const { container } = render(
        <Container size="full">
          <p>Content</p>
        </Container>,
      );

      expect(container.firstChild).toHaveClass('max-w-none');
    });
  });

  describe('centering', () => {
    it('centers by default with mx-auto', () => {
      const { container } = render(
        <Container>
          <p>Content</p>
        </Container>,
      );

      expect(container.firstChild).toHaveClass('mx-auto');
    });

    it('does not center when center is false', () => {
      const { container } = render(
        <Container center={false}>
          <p>Content</p>
        </Container>,
      );

      expect(container.firstChild).not.toHaveClass('mx-auto');
    });
  });

  describe('padding', () => {
    it('applies responsive horizontal padding by default', () => {
      const { container } = render(
        <Container>
          <p>Content</p>
        </Container>,
      );

      expect(container.firstChild).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
    });

    it('applies vertical padding when verticalPadding is true', () => {
      const { container } = render(
        <Container verticalPadding>
          <p>Content</p>
        </Container>,
      );

      expect(container.firstChild).toHaveClass('py-8', 'md:py-12', 'lg:py-16');
    });

    it('does not apply vertical padding by default', () => {
      const { container } = render(
        <Container>
          <p>Content</p>
        </Container>,
      );

      expect(container.firstChild).not.toHaveClass('py-8');
    });
  });

  describe('polymorphic rendering', () => {
    it('renders as section element', () => {
      const { container } = render(
        <Container as="section" aria-label="Features">
          <p>Content</p>
        </Container>,
      );

      expect(container.firstChild?.nodeName).toBe('SECTION');
    });

    it('renders as article element', () => {
      const { container } = render(
        <Container as="article">
          <p>Content</p>
        </Container>,
      );

      expect(container.firstChild?.nodeName).toBe('ARTICLE');
    });

    it('renders as main element', () => {
      const { container } = render(
        <Container as="main">
          <p>Content</p>
        </Container>,
      );

      expect(container.firstChild?.nodeName).toBe('MAIN');
    });

    it('preserves aria-label when rendering as semantic element', () => {
      const { container } = render(
        <Container as="section" aria-label="Test Section">
          <p>Content</p>
        </Container>,
      );

      expect(container.firstChild).toHaveAttribute('aria-label', 'Test Section');
    });

    it('preserves id attribute', () => {
      const { container } = render(
        <Container id="main-content">
          <p>Content</p>
        </Container>,
      );

      expect(container.firstChild).toHaveAttribute('id', 'main-content');
    });

    it('preserves role attribute', () => {
      const { container } = render(
        <Container role="region">
          <p>Content</p>
        </Container>,
      );

      expect(container.firstChild).toHaveAttribute('role', 'region');
    });
  });

  describe('convenience components', () => {
    it('NarrowContainer renders with narrow size', () => {
      const { container } = render(
        <NarrowContainer>
          <p>Content</p>
        </NarrowContainer>,
      );

      expect(container.firstChild).toHaveClass('max-w-3xl');
    });

    it('WideContainer renders with wide size', () => {
      const { container } = render(
        <WideContainer>
          <p>Content</p>
        </WideContainer>,
      );

      expect(container.firstChild).toHaveClass('max-w-[1440px]');
    });

    it('FullContainer renders with full size', () => {
      const { container } = render(
        <FullContainer>
          <p>Content</p>
        </FullContainer>,
      );

      expect(container.firstChild).toHaveClass('max-w-none');
    });

    it('convenience components pass through other props', () => {
      const { container } = render(
        <NarrowContainer className="extra-class" verticalPadding>
          <p>Content</p>
        </NarrowContainer>,
      );

      expect(container.firstChild).toHaveClass('max-w-3xl');
      expect(container.firstChild).toHaveClass('extra-class');
      expect(container.firstChild).toHaveClass('py-8');
    });
  });

  describe('className composition', () => {
    it('combines all required classes correctly', () => {
      const { container } = render(
        <Container size="wide" verticalPadding className="custom">
          <p>Content</p>
        </Container>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('w-full');
      expect(element).toHaveClass('px-4');
      expect(element).toHaveClass('sm:px-6');
      expect(element).toHaveClass('lg:px-8');
      expect(element).toHaveClass('max-w-[1440px]');
      expect(element).toHaveClass('mx-auto');
      expect(element).toHaveClass('py-8');
      expect(element).toHaveClass('md:py-12');
      expect(element).toHaveClass('lg:py-16');
      expect(element).toHaveClass('custom');
    });
  });
});
