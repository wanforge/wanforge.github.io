import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  FAQSection,
  SupportArticles,
  SupportCTA,
  SupportCategories,
  SupportHero,
} from '../components/sections';
import { ThemeProvider } from '../components/ThemeProvider';
import * as React from 'react';

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

describe('Support Page Components', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
  );

  it('renders SupportHero correctly with search input', () => {
    render(<SupportHero />, { wrapper });
    expect(screen.getByRole('heading', { name: /How can we help you\?/i })).toBeDefined();
    expect(screen.getByPlaceholderText(/Search for articles/i)).toBeDefined();
  });

  it('allows typing in search input', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<SupportHero />, { wrapper });

    const searchInput = screen.getByPlaceholderText(/Search for articles/i);
    await user.type(searchInput, 'billing');
    expect(searchInput).toHaveValue('billing');
  });

  it('renders SupportCategories correctly', () => {
    render(<SupportCategories />, { wrapper });
    expect(screen.getByText(/Getting Started/i)).toBeDefined();
    expect(screen.getByText(/Account & Billing/i)).toBeDefined();
    expect(screen.getByText(/Features & Tools/i)).toBeDefined();
    expect(screen.getByText(/Integrations/i)).toBeDefined();
    expect(screen.getByText(/Security & Privacy/i)).toBeDefined();
    expect(screen.getByText(/Troubleshooting/i)).toBeDefined();
  });

  it('renders SupportArticles correctly', () => {
    render(<SupportArticles />, { wrapper });
    expect(screen.getByRole('heading', { name: /Popular Articles/i })).toBeDefined();
    expect(screen.getByText(/How to set up your first automation/i)).toBeDefined();
    expect(screen.getByText(/Connecting with Slack and Discord/i)).toBeDefined();
  });

  it('renders FAQSection on support page', () => {
    const supportFAQs = [
      {
        question: 'How do I reset my password?',
        answer: 'Test answer',
        category: 'technical' as const,
      },
    ];
    render(
      <FAQSection
        heading="Frequently Asked Support Questions"
        subheading="Common technical and account questions"
        faqs={supportFAQs}
      />,
      { wrapper },
    );
    expect(screen.getByText(/Frequently Asked Support Questions/i)).toBeDefined();
    expect(screen.getByText(/How do I reset my password\?/i)).toBeDefined();
  });

  it('renders SupportCTA correctly', () => {
    render(<SupportCTA />, { wrapper });
    expect(screen.getByText(/Still need help\?/i)).toBeDefined();
    expect(screen.getByText(/Live Chat/i)).toBeDefined();
    expect(screen.getByText(/Email Us/i)).toBeDefined();
    expect(screen.getByText(/Call Us/i)).toBeDefined();
  });
});
