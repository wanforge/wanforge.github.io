import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ContactForm } from './ContactForm';
import * as React from 'react';

// Mock the toast utility
vi.mock('../ui/Toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

import { toast } from '../ui/Toast';

describe('ContactForm', () => {
  it('renders all form fields', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company \(optional\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/inquiry type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  describe('Validation', () => {
    it('shows error messages for required fields on empty submit', async () => {
      render(<ContactForm />);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.click(submitButton);

      expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/please select an inquiry type/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
      expect(toast.error).toHaveBeenCalledWith('Please fix the errors in the form.');
    });

    it('shows error for invalid email', async () => {
      render(<ContactForm />);
      const emailInput = screen.getByLabelText(/email address/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.click(submitButton);

      expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
    });

    it('shows error for short message', async () => {
      render(<ContactForm />);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(messageInput, { target: { value: 'short' } });
      fireEvent.click(submitButton);

      expect(
        await screen.findByText(/message must be at least 10 characters/i),
      ).toBeInTheDocument();
    });
  });

  describe('Submission', () => {
    it('shows loading state and success message on valid submission', async () => {
      render(<ContactForm />);

      fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email address/i), {
        target: { value: 'john@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/inquiry type/i), { target: { value: 'sales' } });
      fireEvent.change(screen.getByLabelText(/message/i), {
        target: { value: 'I am interested in your product.' },
      });

      const submitButton = screen.getByRole('button', { name: /send message/i });
      fireEvent.click(submitButton);

      // Should show loading state
      expect(submitButton).toBeDisabled();

      // Should show success message after "API call"
      await waitFor(
        () => {
          expect(screen.getByText(/thank you/i)).toBeInTheDocument();
          expect(screen.getByText(/your message has been sent successfully/i)).toBeInTheDocument();
        },
        { timeout: 3000 },
      );

      expect(toast.success).toHaveBeenCalledWith(expect.stringContaining('successfully'));
    });

    it('can reset the form from success state', async () => {
      render(<ContactForm />);

      // Get to success state
      fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email address/i), {
        target: { value: 'john@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/inquiry type/i), { target: { value: 'sales' } });
      fireEvent.change(screen.getByLabelText(/message/i), {
        target: { value: 'I am interested in your product.' },
      });
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));

      const resetButton = await screen.findByRole(
        'button',
        { name: /send another message/i },
        { timeout: 3000 },
      );
      fireEvent.click(resetButton);

      expect(screen.getByLabelText(/full name/i)).toHaveValue('');
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });
  });
});
