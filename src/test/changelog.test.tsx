import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChangelogFeed, ChangelogHero } from '../components/sections';
import { ThemeProvider } from '../components/ThemeProvider';
import * as React from 'react';
import { changelogEntries } from '../data/changelog';

// Mock matchMedia
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

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe('Changelog Page Components', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
  );

  it('renders ChangelogHero correctly', () => {
    render(<ChangelogHero />, { wrapper });
    expect(screen.getByRole('heading', { name: /Changelog/i })).toBeDefined();
    expect(screen.getByText(/Stay up to date with the latest features/i)).toBeDefined();
  });

  it('renders ChangelogFeed with entries', () => {
    render(<ChangelogFeed entries={changelogEntries} />, { wrapper });

    // Check for version numbers
    expect(screen.getByText(/v1.2.0/i)).toBeDefined();
    expect(screen.getByText(/v1.1.5/i)).toBeDefined();
    expect(screen.getByText(/v1.1.0/i)).toBeDefined();
    expect(screen.getByText(/v1.0.0/i)).toBeDefined();

    // Check for entry titles
    expect(screen.getByText(/Advanced Analytics & Team Collaboration/i)).toBeDefined();
    expect(screen.getByText(/The Automation Update/i)).toBeDefined();
    expect(screen.getByText(/Public Launch/i)).toBeDefined();

    // Check for item descriptions
    expect(screen.getByText(/New Real-time Analytics Dashboard/i)).toBeDefined();
    expect(screen.getByText(/Multi-player editing/i)).toBeDefined();

    // Check for badges
    expect(screen.getAllByText(/Feature/i)).toBeDefined();
    expect(screen.getAllByText(/Improvement/i)).toBeDefined();
    expect(screen.getAllByText(/Fix/i)).toBeDefined();
  });

  it('renders type-specific badges correctly', () => {
    render(<ChangelogFeed entries={changelogEntries} />, { wrapper });

    // v1.2.0 has 2 features, 1 improvement, 1 fix
    const features = screen.getAllByText(/Feature/i);
    const improvements = screen.getAllByText(/Improvement/i);
    const fixes = screen.getAllByText(/Fix/i);

    expect(features.length).toBeGreaterThanOrEqual(2);
    expect(improvements.length).toBeGreaterThanOrEqual(1);
    expect(fixes.length).toBeGreaterThanOrEqual(1);
  });
});
