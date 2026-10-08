import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TestimonialCard, type TestimonialCardProps } from './TestimonialCard';
import React from 'react';

describe('TestimonialCard', () => {
  const defaultAuthor = {
    name: 'Sarah Chen',
    role: 'VP of Engineering',
    company: 'TechCorp',
    avatar: '/images/test-avatar.jpg',
  };

  const defaultProps = {
    quote: 'This platform has transformed our workflow completely.',
    author: defaultAuthor,
    rating: 5,
  };

  it('renders the testimonial quote correctly', () => {
    render(<TestimonialCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.quote)).toBeInTheDocument();
  });

  it('renders author information correctly', () => {
    render(<TestimonialCard {...defaultProps} />);
    expect(screen.getByText(defaultAuthor.name)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(defaultAuthor.role, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(defaultAuthor.company, 'i'))).toBeInTheDocument();
  });

  it('renders the author avatar when provided', () => {
    render(<TestimonialCard {...defaultProps} />);
    const avatar = screen.getByAltText(defaultAuthor.name);
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', defaultAuthor.avatar);
  });

  it('renders initials fallback when avatar is not provided', () => {
    const propsWithoutAvatar: TestimonialCardProps = {
      ...defaultProps,
      author: {
        name: defaultAuthor.name,
        role: defaultAuthor.role,
        company: defaultAuthor.company,
      },
    };
    render(<TestimonialCard {...propsWithoutAvatar} />);
    expect(screen.getByText('SC')).toBeInTheDocument();
  });

  it('renders the correct number of star icons based on rating', () => {
    const { container } = render(<TestimonialCard {...defaultProps} rating={3} />);
    // Check for 5 stars total (using aria-label or classes)
    const ratingContainer = screen.getByLabelText(/Rating: 3 out of 5 stars/i);
    expect(ratingContainer).toBeInTheDocument();

    // We expect 5 SVG stars in total
    const stars = container.querySelectorAll('svg');
    expect(stars.length).toBe(5);

    // 3 should have the accent color (checked via class)
    const filledStars = container.querySelectorAll('.text-accent-500');
    expect(filledStars.length).toBe(3);
  });

  it('renders the company logo when provided', () => {
    const logoUrl = '/images/logos/techcorp.svg';
    render(<TestimonialCard {...defaultProps} companyLogo={logoUrl} />);
    const logo = screen.getByAltText(/TechCorp logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', logoUrl);
  });

  it('applies custom className correctly', () => {
    render(<TestimonialCard {...defaultProps} className="custom-test-class" />);
    // Note: Our Card component might use 'article' or 'div' depending on props,
    // but TestimonialCard uses Card which defaults to 'div' or 'article'?
    // Actually Card doesn't have a default role unless specified.
    // Let's find it by the quote text and look for the class on the parent.
    const quoteElement = screen.getByText(defaultProps.quote);
    const cardElement = quoteElement.closest('.custom-test-class');
    expect(cardElement).toBeInTheDocument();
  });

  it('handles ratings outside 1-5 range gracefully by capping at 5', () => {
    // Our implementation uses i < rating, so it will just fill all 5 if rating is 10
    const { container } = render(<TestimonialCard {...defaultProps} rating={10} />);
    const filledStars = container.querySelectorAll('.text-accent-500');
    expect(filledStars.length).toBe(5);
  });

  it('is accessible with proper ARIA attributes', () => {
    render(<TestimonialCard {...defaultProps} />);
    expect(screen.getByLabelText(/Rating: 5 out of 5 stars/i)).toBeInTheDocument();
    const quote = screen.getByText(defaultProps.quote);
    expect(quote.closest('blockquote')).toBeInTheDocument();
  });
});
