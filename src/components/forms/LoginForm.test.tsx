import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import * as React from 'react';

// Mock the toast utility
vi.mock('../ui/Toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

import { toast } from '../ui/Toast';

describe('LoginForm', () => {
  it('renders all form fields', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /forgot password/i })).toBeInTheDocument();
  });

  describe('Validation', () => {
    it('shows error messages for required fields on empty submit', async () => {
      render(<LoginForm />);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.click(submitButton);

      expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      expect(toast.error).toHaveBeenCalledWith('Please fix the errors in the form.');
    });

    it('shows error for invalid email', async () => {
      render(<LoginForm />);
      const emailInput = screen.getByLabelText(/email address/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.click(submitButton);

      expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
    });

    it('shows error for short password', async () => {
      render(<LoginForm />);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(passwordInput, { target: { value: 'short' } });
      fireEvent.click(submitButton);

      expect(
        await screen.findByText(/password must be at least 8 characters/i),
      ).toBeInTheDocument();
    });
  });

  describe('Submission', () => {
    it('shows loading state and success message on valid submission', async () => {
      render(<LoginForm />);

      fireEvent.change(screen.getByLabelText(/email address/i), {
        target: { value: 'john@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'password123' },
      });

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(submitButton);

      // Should show loading state
      expect(submitButton).toBeDisabled();

      // Should show success message after "API call"
      await waitFor(
        () => {
          expect(toast.success).toHaveBeenCalledWith(expect.stringContaining('successful'));
        },
        { timeout: 3000 },
      );
    });
  });
});
