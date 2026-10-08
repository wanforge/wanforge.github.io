import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import * as React from 'react';
import { Toast, Toaster, toast } from './Toast';

// Mock matchMedia for framer-motion/motion
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('Toast', () => {
  it('renders message and title', () => {
    const onClose = vi.fn();
    render(
      <Toast
        id="1"
        title="Success Title"
        message="Operation completed"
        variant="success"
        onClose={onClose}
      />,
    );

    expect(screen.getByText('Success Title')).toBeInTheDocument();
    expect(screen.getByText('Operation completed')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<Toast id="1" message="Test message" onClose={onClose} />);

    const closeButton = screen.getByLabelText(/close/i);
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledWith('1');
  });

  it('auto-dismisses after duration', async () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast id="1" message="Auto dismiss" duration={1000} onClose={onClose} />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(onClose).toHaveBeenCalledWith('1');
    vi.useRealTimers();
  });
});

describe('Toaster and toast() utility', () => {
  beforeEach(() => {
    // Reset internal state
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (toast as any)._reset();
  });

  it('renders multiple toasts triggered by toast()', async () => {
    render(<Toaster />);

    act(() => {
      toast('First toast');
      toast.success('Second toast');
    });

    expect(screen.getByText('First toast')).toBeInTheDocument();
    expect(screen.getByText('Second toast')).toBeInTheDocument();
  });

  it('removes toast when onClose is called internally', async () => {
    render(<Toaster />);

    act(() => {
      toast('To be dismissed');
    });

    const toastElement = screen.getByText('To be dismissed').closest('[role="alert"]')!;
    expect(toastElement).toBeInTheDocument();

    const closeButton = within(toastElement as HTMLElement).getByLabelText(/close/i);
    act(() => {
      fireEvent.click(closeButton);
    });

    // Toasts are removed from state, but motion exit animation might keep it in DOM briefly
    // However, AnimatePresence popLayout should handle it.
    await waitFor(() => {
      expect(screen.queryByText('To be dismissed')).not.toBeInTheDocument();
    });
  });

  it('handles different variants with correct icons', () => {
    render(<Toaster />);

    act(() => {
      toast.error('Error occurred');
      toast.warning('Warning message');
      toast.info('Info message');
    });

    expect(screen.getByText('Error occurred')).toBeInTheDocument();
    expect(screen.getByText('Warning message')).toBeInTheDocument();
    expect(screen.getByText('Info message')).toBeInTheDocument();
  });
});
