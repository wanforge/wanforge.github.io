import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContactHero, ContactInfo, FAQSection } from '../components/sections';
import { ContactForm } from '../components/forms/ContactForm';
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

describe('Contact Page Components', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
  );

  it('renders ContactHero correctly', () => {
    render(<ContactHero />, { wrapper });
    expect(screen.getByRole('heading', { name: /Get in touch/i })).toBeDefined();
  });

  it('renders ContactForm correctly', () => {
    render(<ContactForm />, { wrapper });
    expect(screen.getByLabelText(/Full Name/i)).toBeDefined();
    expect(screen.getByLabelText(/Email Address/i)).toBeDefined();
    expect(screen.getByLabelText(/Message/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeDefined();
  });

  it('shows validation errors for empty fields on submit', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ContactForm />, { wrapper });

    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    await user.click(submitButton);

    expect(await screen.findByText(/Name is required/i)).toBeDefined();
    expect(await screen.findByText(/Email is required/i)).toBeDefined();
    expect(await screen.findByText(/Please select an inquiry type/i)).toBeDefined();
    expect(await screen.findByText(/Message is required/i)).toBeDefined();
  });

  it('shows error for invalid email format', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ContactForm />, { wrapper });

    const emailInput = screen.getByLabelText(/Email Address/i);
    await user.type(emailInput, 'invalid-email');

    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    await user.click(submitButton);

    expect(await screen.findByText(/Please enter a valid email address/i)).toBeDefined();
  });

  it('shows success state after successful submission', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ContactForm />, { wrapper });

    await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
    await user.type(screen.getByLabelText(/Email Address/i), 'john@example.com');
    await user.selectOptions(screen.getByLabelText(/Inquiry Type/i), 'general');
    await user.type(
      screen.getByLabelText(/Message/i),
      'Hello, this is a test message of sufficient length.',
    );

    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    await user.click(submitButton);

    // Should show loading state initially
    expect(screen.getByRole('button', { name: /Send Message/i })).toHaveAttribute(
      'aria-busy',
      'true',
    );

    // After 1.5s delay (mocked implicitly by findByText)
    expect(await screen.findByText(/Thank you!/i, {}, { timeout: 2000 })).toBeDefined();
    expect(screen.getByText(/Your message has been sent successfully/i)).toBeDefined();
  });

  it('can reset form from success state', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ContactForm />, { wrapper });

    // Fill and submit
    await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
    await user.type(screen.getByLabelText(/Email Address/i), 'john@example.com');
    await user.selectOptions(screen.getByLabelText(/Inquiry Type/i), 'general');
    await user.type(
      screen.getByLabelText(/Message/i),
      'Hello, this is a test message of sufficient length.',
    );
    await user.click(screen.getByRole('button', { name: /Send Message/i }));

    // Wait for success
    const resetButton = await screen.findByRole(
      'button',
      { name: /Send another message/i },
      { timeout: 2000 },
    );
    await user.click(resetButton);

    // Should be back to initial state
    expect(screen.getByLabelText(/Full Name/i)).toHaveValue('');
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeDefined();
  });

  it('renders ContactInfo correctly', () => {
    render(<ContactInfo />, { wrapper });
    expect(screen.getByText(/Other ways to connect/i)).toBeDefined();
    expect(screen.getByText(/Email Us/i)).toBeDefined();
    expect(screen.getByText(/Sales Inquiries/i)).toBeDefined();
    expect(screen.getByText(/Office/i)).toBeDefined();
  });

  it('renders FAQSection with custom data on contact page', () => {
    const customFaqs = [
      { question: 'Test Question', answer: 'Test Answer', category: 'plans' as const },
    ];
    render(<FAQSection heading="Support FAQ" subheading="Custom Subheading" faqs={customFaqs} />, {
      wrapper,
    });
    expect(screen.getByText(/Support FAQ/i)).toBeDefined();
    expect(screen.getByText(/Custom Subheading/i)).toBeDefined();
    expect(screen.getByText(/Test Question/i)).toBeDefined();
  });
});
