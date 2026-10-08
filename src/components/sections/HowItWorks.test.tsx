import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HowItWorks } from './HowItWorks';
import { howItWorksSteps } from '@/data/how-it-works';
import { ThemeProvider } from '@/components/ThemeProvider';

describe('HowItWorks Section', () => {
  const renderWithTheme = (ui: React.ReactNode) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  it('renders section heading and subheading', () => {
    renderWithTheme(<HowItWorks />);

    expect(screen.getByRole('heading', { name: /Get started in minutes/i })).toBeInTheDocument();
    expect(
      screen.getByText(/designed our process to be as simple as possible/i),
    ).toBeInTheDocument();
  });

  it('renders all steps from data', () => {
    renderWithTheme(<HowItWorks />);

    howItWorksSteps.forEach((step) => {
      expect(screen.getByText(step.title)).toBeInTheDocument();
      expect(screen.getByText(step.description)).toBeInTheDocument();
      expect(screen.getByText(step.number)).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    const { container } = renderWithTheme(<HowItWorks className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('has correct ARIA label', () => {
    renderWithTheme(<HowItWorks />);
    expect(screen.getByLabelText(/How It Works/i)).toBeInTheDocument();
  });

  it('has correct section ID for navigation', () => {
    const { container } = renderWithTheme(<HowItWorks />);
    expect(container.querySelector('#how-it-works')).toBeInTheDocument();
  });
});
