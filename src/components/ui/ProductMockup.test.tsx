import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductMockup } from './ProductMockup';

describe('ProductMockup', () => {
  it('renders without an image (placeholder state)', () => {
    const { container } = render(<ProductMockup alt="Placeholder" />);
    expect(container.querySelector('.animate-spin-slow')).toBeDefined();
  });

  it('renders with an image', () => {
    const src = 'https://example.com/mockup.png';
    const alt = 'Test Mockup';
    render(<ProductMockup src={src} alt={alt} />);
    const img = screen.getByAltText(alt) as HTMLImageElement;
    expect(img).toBeDefined();
    expect(img.src).toBe(src);
  });

  it('renders the laptop variant by default', () => {
    const { container } = render(<ProductMockup alt="Laptop" />);
    // Laptop base is only in laptop variant
    expect(container.querySelector('.rounded-b-xl.shadow-2xl')).toBeDefined();
  });

  it('renders the phone variant', () => {
    const { container } = render(<ProductMockup variant="phone" alt="Phone" />);
    // Phone specific details (camera/notch)
    expect(container.querySelector('.w-32.h-6')).toBeDefined();
  });

  it('applies custom className', () => {
    const { container } = render(<ProductMockup className="custom-mockup" alt="Custom" />);
    expect(container.firstChild).toHaveClass('custom-mockup');
  });
});
