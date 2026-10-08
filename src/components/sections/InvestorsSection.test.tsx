/**
 * @vitest-environment jsdom
 */
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { InvestorsSection } from './InvestorsSection';
import { investors } from '@/data/team';
import { renderWithTheme } from '@/test/utils';

describe('InvestorsSection', () => {
  it('renders the investors section with title', () => {
    renderWithTheme(<InvestorsSection title="Our Backers" />);

    expect(screen.getByText(/our backers/i)).toBeInTheDocument();
  });

  it('renders all investor logos from data', () => {
    renderWithTheme(<InvestorsSection />);

    investors.forEach((investor) => {
      // IntegrationLogo uses name for alt text: alt={`${name} logo`}
      expect(screen.getByAltText(new RegExp(`${investor.name} logo`, 'i'))).toBeInTheDocument();
    });
  });

  it('has correct accessibility attributes', () => {
    renderWithTheme(<InvestorsSection />);
    expect(screen.getByLabelText(/our investors/i)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderWithTheme(<InvestorsSection className="custom-class" />);
    // Section uses padding="lg" by default which adds py-16 or similar
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
