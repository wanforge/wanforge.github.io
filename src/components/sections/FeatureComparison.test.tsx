import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { FeatureComparison } from './FeatureComparison';
import { renderWithTheme } from '@/test/utils';
import { featureComparison } from '@/data/features';

describe('FeatureComparison', () => {
  it('renders correctly with default props', () => {
    renderWithTheme(<FeatureComparison />);

    expect(screen.getByText('Compare Our Features')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders with custom title and subtitle', () => {
    renderWithTheme(<FeatureComparison title="Custom Title" subtitle="Custom Subtitle" />);

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Subtitle')).toBeInTheDocument();
  });

  it('renders all comparison categories', () => {
    renderWithTheme(<FeatureComparison />);

    featureComparison.forEach((category) => {
      expect(screen.getByText(category.category)).toBeInTheDocument();
    });
  });

  it('renders all feature names', () => {
    renderWithTheme(<FeatureComparison />);

    featureComparison.forEach((category) => {
      category.features.forEach((feature) => {
        expect(screen.getAllByText(feature.name).length).toBeGreaterThan(0);
      });
    });
  });

  it('renders "Our Product" and "Typical Competitor" headers', () => {
    renderWithTheme(<FeatureComparison />);

    expect(screen.getByText('Our Product')).toBeInTheDocument();
    expect(screen.getByText('Typical Competitor')).toBeInTheDocument();
  });

  it('has accessible labels for icons', () => {
    renderWithTheme(<FeatureComparison />);

    // Check for "Included" and "Not included" screen reader text
    expect(screen.getAllByText('Included').length).toBeGreaterThan(0);
    // Based on featureComparison data, there should be at least one "Not included" if any competitorValue is false
    const hasFalseValue = featureComparison.some((c) =>
      c.features.some((f) => f.competitorValue === false),
    );
    if (hasFalseValue) {
      expect(screen.getAllByText('Not included').length).toBeGreaterThan(0);
    }
  });

  it('applies custom className', () => {
    const { container } = renderWithTheme(<FeatureComparison className="custom-class" />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('custom-class');
  });
});
