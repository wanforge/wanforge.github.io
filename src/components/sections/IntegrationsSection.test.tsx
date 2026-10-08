import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { IntegrationsSection } from './IntegrationsSection';
import { integrationCategories, integrations } from '@/data/integrations';
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

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe('IntegrationsSection Component', () => {
  const renderIntegrationsSection = (props = {}) => {
    return render(
      <ThemeProvider>
        <IntegrationsSection {...props} />
      </ThemeProvider>,
    );
  };

  it('renders the section heading correctly', () => {
    renderIntegrationsSection();
    const heading = screen.getByRole('heading', {
      name: /Works with your stack/i,
    });
    expect(heading).toBeDefined();
  });

  it('renders all categories as filter buttons', () => {
    renderIntegrationsSection();
    expect(screen.getByRole('tab', { name: /All/i })).toBeDefined();
    integrationCategories.forEach((category) => {
      expect(screen.getByRole('tab', { name: category.label })).toBeDefined();
    });
  });

  it('renders initial integrations up to the limit', () => {
    const limit = 6;
    renderIntegrationsSection({ limit });

    // We expect 'limit' number of integration logos (represented by img alt text)
    const logos = screen.getAllByRole('img');
    expect(logos.length).toBeLessThanOrEqual(limit);
  });

  it('filters integrations when a category tab is clicked', async () => {
    renderIntegrationsSection();

    // Get a category from our data
    const category = integrationCategories[0];
    if (!category) throw new Error('No categories found');
    const categoryIntegrations = integrations.filter((i) => i.category === category.id);

    // Click the category tab
    const tab = screen.getByRole('tab', { name: category.label });

    fireEvent.click(tab);

    // Verify that the filtered integrations are present
    // Note: Use getAllByAltText because even if only one tab is active,
    // there might be multiple logos rendered during transitions
    categoryIntegrations.slice(0, 12).forEach((integration) => {
      const logos = screen.getAllByAltText(`${integration.name} logo`);
      expect(logos.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('renders the section with correct role and label', () => {
    renderIntegrationsSection();
    const section = screen.getByRole('region', { name: /Integrations/i });
    expect(section).toBeDefined();
  });

  it('hides filters when showFilters is false', () => {
    renderIntegrationsSection({ showFilters: false });
    expect(screen.queryByRole('tablist')).toBeNull();
  });
});
