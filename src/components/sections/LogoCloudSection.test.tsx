/**
 * @vitest-environment jsdom
 */
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LogoCloudSection } from './LogoCloudSection';
import { ThemeProvider } from '@/components/ThemeProvider';

// Mock matchMedia for ThemeProvider
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('LogoCloudSection Component', () => {
  const renderLogoCloudSection = (props = {}) => {
    return render(
      <ThemeProvider>
        <LogoCloudSection {...props} />
      </ThemeProvider>,
    );
  };

  it('renders with default title', () => {
    renderLogoCloudSection();
    expect(screen.getByText(/Trusted by 10,000\+ companies worldwide/i)).toBeDefined();
  });

  it('renders with custom title', () => {
    const customTitle = 'Our Partners';
    renderLogoCloudSection({ title: customTitle });
    expect(screen.getByText(customTitle)).toBeDefined();
  });

  it('renders logos from data', () => {
    renderLogoCloudSection();
    // Check for some known popular integration logos
    // Using getAllByAltText because LogoCloud doubles logos for marquee
    expect(screen.getAllByAltText(/Slack logo/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByAltText(/GitHub logo/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders the section with correct role and label', () => {
    renderLogoCloudSection();
    const section = screen.getByRole('region', { name: /Partner Logos/i });
    expect(section).toBeDefined();
  });

  it('renders with custom id', () => {
    renderLogoCloudSection({ id: 'custom-partners' });
    const section = screen.getByRole('region', { name: /Partner Logos/i });
    expect(section.getAttribute('id')).toBe('custom-partners');
  });
});
