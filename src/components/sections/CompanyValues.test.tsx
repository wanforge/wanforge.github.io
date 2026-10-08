/**
 * @vitest-environment jsdom
 */
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { CompanyValues } from './CompanyValues';
import { companyValues } from '@/data/team';
import { renderWithTheme } from '@/test/utils';

describe('CompanyValues', () => {
  it('renders the company values section with heading and subheading', () => {
    renderWithTheme(<CompanyValues title="Our Values" subtitle="Guide everything we do" />);

    expect(screen.getByText(/our values/i)).toBeInTheDocument();
    expect(screen.getByText(/guide everything we do/i)).toBeInTheDocument();
  });

  it('renders all company values from data', () => {
    renderWithTheme(<CompanyValues />);

    companyValues.forEach((value) => {
      expect(screen.getByText(value.title)).toBeInTheDocument();
      expect(screen.getByText(value.description)).toBeInTheDocument();
    });
  });

  it('has correct accessibility attributes', () => {
    renderWithTheme(<CompanyValues />);
    // Section component uses aria-label="Our Core Values"
    expect(screen.getByLabelText(/our core values/i)).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const { container } = renderWithTheme(<CompanyValues className="custom-class" />);
    // The Section component adds className to its outer div
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders with custom id', () => {
    renderWithTheme(<CompanyValues id="custom-id" />);
    expect(screen.getByLabelText(/our core values/i)).toHaveAttribute('id', 'custom-id');
  });
});
