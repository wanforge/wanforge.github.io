import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CareersCTA } from './CareersCTA';
import { ThemeProvider } from '@/components/ThemeProvider';

describe('CareersCTA Component', () => {
  const renderCareersCTA = () => {
    return render(
      <ThemeProvider>
        <CareersCTA />
      </ThemeProvider>,
    );
  };

  it('renders the main heading', () => {
    renderCareersCTA();
    expect(screen.getByText(/Join Our Team/i)).toBeDefined();
  });

  it('renders the description text', () => {
    renderCareersCTA();
    expect(screen.getByText(/always looking for passionate people/i)).toBeDefined();
  });

  it('renders the benefit items', () => {
    renderCareersCTA();
    expect(screen.getByText(/Remote First/i)).toBeDefined();
    expect(screen.getByText(/Competitive Equity/i)).toBeDefined();
    expect(screen.getByText(/Growth Opportunities/i)).toBeDefined();
  });

  it('renders the CTA button', () => {
    renderCareersCTA();
    expect(screen.getByText(/View Open Positions/i)).toBeDefined();
  });

  it('renders the hiring badge', () => {
    renderCareersCTA();
    expect(screen.getByText(/We're Hiring!/i)).toBeDefined();
  });
});
