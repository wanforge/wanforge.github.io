import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { ContactInfo } from './ContactInfo';
import { site } from '@/config/site';

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

describe('ContactInfo', () => {
  it('renders with header content', () => {
    render(<ContactInfo />);

    expect(screen.getByText('Other ways to connect')).toBeDefined();
    expect(screen.getByText(/Reach out through any of these channels/)).toBeDefined();
  });

  it('renders all contact methods from site config', () => {
    render(<ContactInfo />);

    // Check titles
    expect(screen.getByText('Email Us')).toBeDefined();
    expect(screen.getByText('Sales Inquiries')).toBeDefined();
    expect(screen.getByText('Phone')).toBeDefined();
    expect(screen.getByText('Office')).toBeDefined();

    // Check values
    expect(screen.getByText(site.contact.email)).toBeDefined();
    expect(screen.getByText(site.contact.salesEmail)).toBeDefined();
    expect(screen.getByText(site.contact.phone)).toBeDefined();
    expect(screen.getAllByText(new RegExp(site.contact.address.city)).length).toBeGreaterThan(0);
  });

  it('renders social media links', () => {
    render(<ContactInfo />);

    expect(screen.getByLabelText('Follow us on Twitter')).toBeDefined();
    expect(screen.getByLabelText('Star us on GitHub')).toBeDefined();
    expect(screen.getByLabelText('Connect on LinkedIn')).toBeDefined();
  });

  it('has accessible cards with demo link triggers', () => {
    render(<ContactInfo />);

    // Verify cards have the correct roles and names (they are wrapped in DemoLink with forceDemo)
    const emailCard = screen.getByRole('button', { name: /Email Us/i });
    expect(emailCard.getAttribute('href')).toBe(`mailto:${site.contact.email}`);

    const phoneCard = screen.getByRole('button', { name: /Phone/i });
    expect(phoneCard.getAttribute('href')).toBe(`tel:${site.contact.phone.replace(/\s/g, '')}`);
  });
});
