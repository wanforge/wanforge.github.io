/**
 * @vitest-environment jsdom
 */
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { TestimonialsSection } from './TestimonialsSection';
import { renderWithTheme } from '@/test/utils';
import { testimonials } from '@/data';

describe('TestimonialsSection', () => {
  it('renders correctly with default props', () => {
    renderWithTheme(<TestimonialsSection />);

    // Check heading and subheading
    expect(screen.getByText(/Trusted by teams worldwide/i)).toBeInTheDocument();
    expect(screen.getByText(/Don't just take our word for it/i)).toBeInTheDocument();

    // Check if testimonials are rendered (first few)
    const displayCount = Math.min(testimonials.length, 6);
    const displayedTestimonials = testimonials.slice(0, displayCount);

    displayedTestimonials.forEach((testimonial) => {
      expect(screen.getByText(testimonial.author.name)).toBeInTheDocument();
    });
  });

  it('renders correctly with custom title and subtitle', () => {
    const customTitle = 'Custom Title';
    const customSubtitle = 'Custom Subtitle';
    renderWithTheme(<TestimonialsSection title={customTitle} subtitle={customSubtitle} />);

    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(screen.getByText(customSubtitle)).toBeInTheDocument();
  });

  it('renders with correct section ID', () => {
    const customId = 'custom-testimonials-id';
    renderWithTheme(<TestimonialsSection id={customId} />);

    const section = screen.getByLabelText(/Customer Testimonials/i);
    expect(section).toHaveAttribute('id', customId);
  });

  it('applies custom className', () => {
    const customClass = 'custom-test-class';
    renderWithTheme(<TestimonialsSection className={customClass} />);

    const section = screen.getByLabelText(/Customer Testimonials/i);
    expect(section.className).toContain(customClass);
  });

  it('renders exactly 6 testimonials if more than 6 are available', () => {
    renderWithTheme(<TestimonialsSection />);

    // TestimonialsSection.tsx uses slice(0, 6)
    // Each testimonial is wrapped in a motion.div which doesn't have a role,
    // but the Section component labels itself as "Customer Testimonials"

    expect(screen.getByLabelText(/Customer Testimonials/i)).toBeInTheDocument();
    // Since testimonials are rendered as cards, we can look for blocks with author names
    // Or just check that we have 6 cards. Each Card has role="article" if we pass it.
    // However, currently Card doesn't have a role.

    // Let's check for author names from the first 6 testimonials
    testimonials.slice(0, 6).forEach((testimonial) => {
      expect(screen.getByText(testimonial.author.name)).toBeInTheDocument();
    });

    // And check that the 7th is NOT there (if it exists)
    if (testimonials.length > 6) {
      expect(screen.queryByText(testimonials[6]!.author.name)).not.toBeInTheDocument();
    }
  });
});
