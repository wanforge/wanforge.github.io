import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SocialProofBadge } from './SocialProofBadge';

describe('SocialProofBadge', () => {
  it('renders correctly with default rated variant', () => {
    render(<SocialProofBadge animate={false} />);
    expect(screen.getByText('4.9/5')).toBeDefined();
    expect(screen.getByText('rating')).toBeDefined();
  });

  it('renders with custom rating and count', () => {
    render(<SocialProofBadge variant="rated" rating={4.8} count="1,200+" animate={false} />);
    expect(screen.getByText('4.8/5')).toBeDefined();
    expect(screen.getByText('by 1,200+ teams')).toBeDefined();
  });

  it('renders trusted variant', () => {
    render(<SocialProofBadge variant="trusted" count="800+" animate={false} />);
    expect(screen.getByText(/Trusted by/i)).toBeDefined();
    expect(screen.getByText('800+')).toBeDefined();
    expect(screen.getByText(/startups/i)).toBeDefined();
  });

  it('renders avatar stack when avatars are provided', () => {
    const avatars = ['/avatar1.jpg', '/avatar2.jpg'];
    render(<SocialProofBadge avatars={avatars} animate={false} />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', '/avatar1.jpg');
    expect(images[1]).toHaveAttribute('src', '/avatar2.jpg');
  });

  it('renders fallback avatars when avatar URLs are empty strings', () => {
    const avatars = ['', ''];
    render(<SocialProofBadge avatars={avatars} animate={false} />);

    expect(screen.getByText('A')).toBeDefined();
    expect(screen.getByText('B')).toBeDefined();
  });

  it('applies custom className', () => {
    const { container } = render(<SocialProofBadge className="custom-class" animate={false} />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
