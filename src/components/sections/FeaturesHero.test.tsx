import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FeaturesHero } from './FeaturesHero';

describe('FeaturesHero', () => {
  it('renders correctly with default props', () => {
    render(<FeaturesHero />);

    expect(screen.getByRole('region', { name: /features hero section/i })).toBeDefined();
    expect(screen.getByText(/everything you need to/i)).toBeDefined();
    expect(screen.getByText(/scale with confidence/i)).toBeDefined();
    expect(screen.getByText(/discover powerful automation tools/i)).toBeDefined();
  });

  it('applies custom className', () => {
    const customClass = 'custom-test-class';
    render(<FeaturesHero className={customClass} />);

    const section = screen.getByRole('region', { name: /features hero section/i });
    expect(section.className).toContain(customClass);
  });
});
