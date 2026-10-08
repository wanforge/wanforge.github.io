import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FinalCTA } from './FinalCTA';
import { ThemeProvider } from '@/components/ThemeProvider';

describe('FinalCTA Component', () => {
  const renderFinalCTA = () => {
    return render(
      <ThemeProvider>
        <FinalCTA />
      </ThemeProvider>,
    );
  };

  it('renders the main heading', () => {
    renderFinalCTA();
    expect(screen.getByText(/Stop settling for slow/i)).toBeDefined();
    expect(screen.getByText(/Start building with/i)).toBeDefined();
  });

  it('renders the description text', () => {
    renderFinalCTA();
    expect(screen.getByText(/Join 5,000\+ teams/i)).toBeDefined();
  });

  it('renders the primary CTA button', () => {
    renderFinalCTA();
    expect(screen.getByText(/Get Started for Free/i)).toBeDefined();
  });

  it('renders the secondary CTA button', () => {
    renderFinalCTA();
    expect(screen.getByText(/Contact Sales/i)).toBeDefined();
  });

  it('renders the trial information text', () => {
    renderFinalCTA();
    expect(screen.getByText(/No credit card required/i)).toBeDefined();
  });

  it('renders the rocket icon and top badge', () => {
    renderFinalCTA();
    expect(screen.getByText(/Ready to transform your workflow/i)).toBeDefined();
  });
});
