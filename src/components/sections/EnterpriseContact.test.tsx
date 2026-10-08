import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { EnterpriseContact } from './EnterpriseContact';
import { enterpriseFeatures } from '@/data/pricing';

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
      <div {...props}>{children}</div>
    ),
    h2: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
      <h2 {...props}>{children}</h2>
    ),
    p: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
      <p {...props}>{children}</p>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock Lucide icons
vi.mock('lucide-react', async () => {
  const actual = (await vi.importActual('lucide-react')) as Record<string, unknown>;
  const mocks: Record<string, React.FC<Record<string, unknown>>> = {};

  Object.keys(actual).forEach((key) => {
    const item = actual[key];
    if (typeof item === 'function' || (item && typeof item === 'object' && '$$typeof' in item)) {
      mocks[key] = (props: Record<string, unknown>) => (
        <div data-testid={`icon-${key.toLowerCase()}`} {...props} />
      );
    }
  });

  return {
    ...actual,
    ...mocks,
  };
});

describe('EnterpriseContact', () => {
  it('renders with default title and description', () => {
    render(<EnterpriseContact />);

    expect(screen.getByText('Need something more?')).toBeDefined();
    expect(screen.getByText(/Our enterprise-ready features/)).toBeDefined();
  });

  it('renders custom title and description', () => {
    render(<EnterpriseContact title="Custom Title" description="Custom Description" />);

    expect(screen.getByText('Custom Title')).toBeDefined();
    expect(screen.getByText('Custom Description')).toBeDefined();
  });

  it('renders all enterprise features from data', () => {
    render(<EnterpriseContact />);

    enterpriseFeatures.forEach((feature) => {
      expect(screen.getByText(feature.title)).toBeDefined();
      expect(screen.getByText(feature.description)).toBeDefined();
    });
  });

  it('renders CTAs', () => {
    render(<EnterpriseContact />);

    // We use getAllByRole because DemoLink adds role="button" to the wrapper anchor
    // and it contains a button element, creating two "buttons" in the accessibility tree
    expect(screen.getAllByRole('button', { name: /Contact Sales/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: /Schedule a Demo/i }).length).toBeGreaterThan(0);
  });

  it('has accessible section and heading', () => {
    render(<EnterpriseContact />);

    const section = screen.getByLabelText(/Need something more\?/i);
    expect(section).toBeDefined();
    expect(section.tagName).toBe('SECTION');
  });
});
