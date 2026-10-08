import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NewsletterForm } from './NewsletterForm';
import * as React from 'react';

describe('NewsletterForm', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<NewsletterForm />);
      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
    });

    it('renders with title and description', () => {
      render(<NewsletterForm title="Join Us" description="Stay updated with our latest news." />);
      expect(screen.getByText('Join Us')).toBeInTheDocument();
      expect(screen.getByText('Stay updated with our latest news.')).toBeInTheDocument();
    });

    it('renders with custom placeholder and button text', () => {
      render(<NewsletterForm placeholder="your@email.com" buttonText="Join Now" />);
      expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /join now/i })).toBeInTheDocument();
    });
  });

  describe('Validation', () => {
    it('shows error message if email is empty', async () => {
      render(<NewsletterForm />);
      const button = screen.getByRole('button', { name: /subscribe/i });

      fireEvent.click(button);

      expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    });

    it('shows error message if email is invalid', async () => {
      render(<NewsletterForm />);
      const input = screen.getByPlaceholderText('Enter your email');
      const button = screen.getByRole('button', { name: /subscribe/i });

      fireEvent.change(input, { target: { value: 'invalid-email' } });
      fireEvent.click(button);

      expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
    });

    it('clears error when user starts typing', async () => {
      render(<NewsletterForm />);
      const input = screen.getByPlaceholderText('Enter your email');
      const button = screen.getByRole('button', { name: /subscribe/i });

      fireEvent.click(button);
      expect(await screen.findByText(/email is required/i)).toBeInTheDocument();

      fireEvent.change(input, { target: { value: 't' } });
      // Use waitFor because error message uses AnimatePresence and might still be in DOM during exit animation
      await waitFor(() => {
        expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Submission', () => {
    it('shows loading state during submission', async () => {
      render(<NewsletterForm />);
      const input = screen.getByPlaceholderText('Enter your email');
      const button = screen.getByRole('button', { name: /subscribe/i });

      fireEvent.change(input, { target: { value: 'test@example.com' } });
      fireEvent.click(button);

      // Button should show loading state (which disables it)
      expect(button).toBeDisabled();
      // Button component shows a spinner when loading
      expect(button.querySelector('.animate-spin')).toBeInTheDocument();
    });

    it('shows success message on successful submission', async () => {
      const onSuccess = vi.fn();
      render(<NewsletterForm onSuccess={onSuccess} />);
      const input = screen.getByPlaceholderText('Enter your email');
      const button = screen.getByRole('button', { name: /subscribe/i });

      fireEvent.change(input, { target: { value: 'test@example.com' } });
      fireEvent.click(button);

      await waitFor(
        () => {
          expect(screen.getByText(/thanks for subscribing/i)).toBeInTheDocument();
        },
        { timeout: 3000 },
      );

      expect(onSuccess).toHaveBeenCalledWith('test@example.com');
    });

    it('can reset form after success', async () => {
      render(<NewsletterForm />);
      const input = screen.getByPlaceholderText('Enter your email');
      const button = screen.getByRole('button', { name: /subscribe/i });

      fireEvent.change(input, { target: { value: 'test@example.com' } });
      fireEvent.click(button);

      const resetButton = await screen.findByRole(
        'button',
        { name: /send another/i },
        { timeout: 3000 },
      );
      fireEvent.click(resetButton);

      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    });
  });
});
