import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SignupForm } from './SignupForm';
import * as React from 'react';

// Mock the toast utility
vi.mock('../ui/Toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

import { toast } from '../ui/Toast';

describe('SignupForm', () => {
  it('renders all form fields', () => {
    render(<SignupForm />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/i agree to the/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument();
  });

  describe('Validation', () => {
    it('shows error messages for required fields on empty submit', async () => {
      render(<SignupForm />);
      const submitButton = screen.getByRole('button', { name: /create account/i });

      fireEvent.click(submitButton);

      expect(await screen.findByText(/full name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      expect(screen.getByText(/you must accept the terms and conditions/i)).toBeInTheDocument();
      expect(toast.error).toHaveBeenCalledWith('Please fix the errors in the form.');
    });

    it('shows error for invalid email', async () => {
      render(<SignupForm />);
      const emailInput = screen.getByLabelText(/email address/i);
      const submitButton = screen.getByRole('button', { name: /create account/i });

      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.click(submitButton);

      expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
    });

    it('shows error for short password', async () => {
      render(<SignupForm />);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /create account/i });

      fireEvent.change(passwordInput, { target: { value: 'short' } });
      fireEvent.click(submitButton);

      expect(
        await screen.findByText(/password must be at least 8 characters/i),
      ).toBeInTheDocument();
    });
  });

  describe('Submission', () => {
    it('shows loading state and success message on valid submission', async () => {
      render(<SignupForm />);

      fireEvent.change(screen.getByLabelText(/full name/i), {
        target: { value: 'John Doe' },
      });
      fireEvent.change(screen.getByLabelText(/email address/i), {
        target: { value: 'john@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'password123' },
      });
      fireEvent.click(screen.getByLabelText(/i agree to the/i));

      const submitButton = screen.getByRole('button', { name: /create account/i });
      fireEvent.click(submitButton);

      // Should show loading state
      expect(submitButton).toBeDisabled();

      // Should show success message after "API call"
      await waitFor(
        () => {
          expect(toast.success).toHaveBeenCalledWith(expect.stringContaining('successfully'));
        },
        { timeout: 3000 },
      );
    });
  });
});
