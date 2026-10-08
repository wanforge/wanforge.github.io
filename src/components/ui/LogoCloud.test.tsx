import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LogoCloud } from './LogoCloud';

describe('LogoCloud', () => {
  const mockLogos = [
    { name: 'Logo 1', logo: '/images/1.svg' },
    { name: 'Logo 2', logo: '/images/2.svg' },
    { name: 'Logo 3', logo: '/images/3.svg' },
  ];

  it('renders nothing if logos array is empty', () => {
    const { container } = render(<LogoCloud logos={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the title if provided', () => {
    render(<LogoCloud logos={mockLogos} title="Trusted by" />);
    expect(screen.getByText('Trusted by')).toBeInTheDocument();
  });

  it('renders all logos in grid mode', () => {
    render(<LogoCloud logos={mockLogos} />);

    mockLogos.forEach((logo) => {
      expect(screen.getByAltText(`${logo.name} logo`)).toBeInTheDocument();
    });
  });

  it('applies grid column classes if provided', () => {
    const { container } = render(<LogoCloud logos={mockLogos} cols={3} />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-2'); // Mobile default for 3
    expect(grid).toHaveClass('sm:grid-cols-3');
  });

  it('renders in marquee mode with doubled logos', () => {
    render(<LogoCloud logos={mockLogos} marquee={true} />);

    // doubled logos + clones = 4x mockLogos length in my implementation
    // Wait, I did marqueeLogos = [...logos, ...logos] and then mapped it twice.
    // So 3 * 2 * 2 = 12 logos total.
    const logos = screen.getAllByAltText(/Logo \d logo/);
    expect(logos).toHaveLength(mockLogos.length * 4);
  });

  it('applies correct marquee animation direction', () => {
    const { container } = render(<LogoCloud logos={mockLogos} marquee={true} direction="right" />);
    const marquee = container.querySelector('.animate-marquee-reverse');
    expect(marquee).toBeInTheDocument();
  });

  it('applies custom duration to marquee', () => {
    render(<LogoCloud logos={mockLogos} marquee={true} duration={50} />);
    const links = screen.getAllByRole('link');
    const marqueeDiv = links[0]?.parentElement;
    expect(marqueeDiv).toHaveStyle({ animationDuration: '50s' });
  });

  it('applies custom className', () => {
    const { container } = render(<LogoCloud logos={mockLogos} className="custom-cloud" />);
    expect(container.querySelector('.custom-cloud')).toBeInTheDocument();
  });
});
