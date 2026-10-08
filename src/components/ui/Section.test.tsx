/**
 * Section Component Tests
 *
 * Comprehensive test suite for the Section layout component.
 *
 * @module components/ui
 */

import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CTASection, ContentSection, FeatureSection, HeroSection, Section } from './Section';

describe('Section Component', () => {
  describe('Basic Rendering', () => {
    it('renders children correctly', () => {
      render(
        <Section>
          <div data-testid="section-content">Test Content</div>
        </Section>,
      );

      expect(screen.getByTestId('section-content')).toBeInTheDocument();
    });

    it('renders as section element by default', () => {
      render(
        <Section>
          <div>Content</div>
        </Section>,
      );

      const section = document.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('renders with custom element via as prop', () => {
      render(
        <Section as="article" data-testid="custom-element">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByTestId('custom-element').tagName).toBe('ARTICLE');
    });

    it('applies custom id', () => {
      render(
        <Section id="test-section">
          <div>Content</div>
        </Section>,
      );

      expect(document.getElementById('test-section')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <Section className="custom-class">
          <div>Content</div>
        </Section>,
      );

      const section = document.querySelector('section');
      expect(section).toHaveClass('custom-class');
    });

    it('applies aria-label', () => {
      render(
        <Section aria-label="Test Section">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByLabelText('Test Section')).toBeInTheDocument();
    });
  });

  describe('Background Variants', () => {
    it('applies default background', () => {
      render(
        <Section data-testid="section">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByTestId('section')).toHaveClass('bg-bg-primary');
    });

    it('applies primary background', () => {
      render(
        <Section background="primary" data-testid="section">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByTestId('section')).toHaveClass('bg-primary-50');
    });

    it('applies secondary background', () => {
      render(
        <Section background="secondary" data-testid="section">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByTestId('section')).toHaveClass('bg-secondary-50');
    });

    it('applies muted background', () => {
      render(
        <Section background="muted" data-testid="section">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByTestId('section')).toHaveClass('bg-bg-secondary');
    });

    it('applies gradient background', () => {
      render(
        <Section background="gradient" data-testid="section">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByTestId('section')).toHaveClass('gradient-mesh');
    });

    it('applies transparent background', () => {
      render(
        <Section background="transparent" data-testid="section">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByTestId('section')).toHaveClass('bg-transparent');
    });
  });

  describe('Padding Variants', () => {
    it('applies default large padding', () => {
      render(
        <Section data-testid="section">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByTestId('section')).toHaveClass('py-16');
      expect(screen.getByTestId('section')).toHaveClass('md:py-24');
    });

    it('applies no padding', () => {
      render(
        <Section padding="none" data-testid="section">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByTestId('section')).not.toHaveClass('py-16');
    });

    it('applies small padding', () => {
      render(
        <Section padding="sm" data-testid="section">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByTestId('section')).toHaveClass('py-8');
    });

    it('applies medium padding', () => {
      render(
        <Section padding="md" data-testid="section">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByTestId('section')).toHaveClass('py-12');
      expect(screen.getByTestId('section')).toHaveClass('md:py-16');
    });

    it('applies extra-large padding', () => {
      render(
        <Section padding="xl" data-testid="section">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByTestId('section')).toHaveClass('py-20');
      expect(screen.getByTestId('section')).toHaveClass('md:py-32');
    });

    it('applies 2xl padding', () => {
      render(
        <Section padding="2xl" data-testid="section">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByTestId('section')).toHaveClass('py-24');
      expect(screen.getByTestId('section')).toHaveClass('md:py-40');
    });
  });

  describe('Heading and Subheading', () => {
    it('renders heading when provided', () => {
      render(
        <Section heading="Test Heading">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Heading');
    });

    it('renders subheading when provided', () => {
      render(
        <Section subheading="Test Subheading">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByText('Test Subheading')).toBeInTheDocument();
    });

    it('renders both heading and subheading', () => {
      render(
        <Section heading="Heading" subheading="Subheading">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByText('Heading')).toBeInTheDocument();
      expect(screen.getByText('Subheading')).toBeInTheDocument();
    });

    it('does not render heading wrapper when neither heading nor subheading provided', () => {
      render(
        <Section>
          <div data-testid="content">Content</div>
        </Section>,
      );

      expect(screen.getByTestId('content')).toBeInTheDocument();
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });
  });

  describe('Contained Layout', () => {
    it('applies horizontal padding when contained is true', () => {
      render(
        <Section contained data-testid="section">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByTestId('section')).toHaveClass('px-4');
      expect(screen.getByTestId('section')).toHaveClass('sm:px-6');
      expect(screen.getByTestId('section')).toHaveClass('lg:px-8');
    });

    it('does not apply horizontal padding when contained is false', () => {
      render(
        <Section data-testid="section">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByTestId('section')).not.toHaveClass('px-4');
    });
  });

  describe('Borders', () => {
    it('applies top border when borderTop is true', () => {
      render(
        <Section borderTop data-testid="section">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByTestId('section')).toHaveClass('border-t');
    });

    it('applies bottom border when borderBottom is true', () => {
      render(
        <Section borderBottom data-testid="section">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByTestId('section')).toHaveClass('border-b');
    });

    it('applies both borders when both props are true', () => {
      render(
        <Section borderTop borderBottom data-testid="section">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByTestId('section')).toHaveClass('border-t');
      expect(screen.getByTestId('section')).toHaveClass('border-b');
    });
  });

  describe('Convenience Variants', () => {
    it('HeroSection applies gradient background and 2xl padding', () => {
      render(
        <HeroSection data-testid="section">
          <div>Content</div>
        </HeroSection>,
      );

      expect(screen.getByTestId('section')).toHaveClass('gradient-mesh');
      expect(screen.getByTestId('section')).toHaveClass('py-24');
      expect(screen.getByTestId('section')).toHaveClass('md:py-40');
    });

    it('FeatureSection applies muted background', () => {
      render(
        <FeatureSection data-testid="section">
          <div>Content</div>
        </FeatureSection>,
      );

      expect(screen.getByTestId('section')).toHaveClass('bg-bg-secondary');
    });

    it('CTASection applies primary background', () => {
      render(
        <CTASection data-testid="section">
          <div>Content</div>
        </CTASection>,
      );

      expect(screen.getByTestId('section')).toHaveClass('bg-primary-50');
    });

    it('ContentSection applies contained layout', () => {
      render(
        <ContentSection data-testid="section">
          <div>Content</div>
        </ContentSection>,
      );

      expect(screen.getByTestId('section')).toHaveClass('px-4');
    });
  });

  describe('Accessibility', () => {
    it('renders with role attribute', () => {
      render(
        <Section role="region" aria-label="Features">
          <div>Content</div>
        </Section>,
      );

      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('heading has correct hierarchy (h2)', () => {
      render(
        <Section heading="Section Title">
          <div>Content</div>
        </Section>,
      );

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Section Title');
    });
  });
});
