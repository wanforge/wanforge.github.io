import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '@/test/utils';
import PricingComparison from './PricingComparison';

describe('PricingComparison', () => {
  it('renders the section with title and subtitle', () => {
    renderWithTheme(<PricingComparison />);

    expect(screen.getByText(/Compare Our Plans/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Find the perfect plan for your needs with our detailed feature breakdown./i,
      ),
    ).toBeInTheDocument();
  });

  it('renders all pricing tiers in the header', () => {
    renderWithTheme(<PricingComparison />);

    expect(screen.getByRole('columnheader', { name: /Starter/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Pro/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Enterprise/i })).toBeInTheDocument();
  });

  it('renders feature categories', () => {
    renderWithTheme(<PricingComparison />);

    expect(screen.getAllByText(/Features/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Support/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Security/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Integrations/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders feature names', () => {
    renderWithTheme(<PricingComparison />);

    expect(screen.getByText(/Team members/i)).toBeInTheDocument();
    expect(screen.getByText(/Storage/i)).toBeInTheDocument();
    expect(screen.getByText(/Email support/i)).toBeInTheDocument();
    expect(screen.getByText(/SSO \/ SAML/i)).toBeInTheDocument();
  });

  it('has responsive overflow container', () => {
    const { container } = renderWithTheme(<PricingComparison />);
    const scrollContainer = container.querySelector('.overflow-x-auto');
    expect(scrollContainer).toBeInTheDocument();
  });
});
