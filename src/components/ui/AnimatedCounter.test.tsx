import * as React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AnimatedCounter } from './AnimatedCounter';

// Mock motion functions
vi.mock('motion', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animate: vi.fn((_from: number, to: number, options?: any) => {
    // Simulate immediate completion for tests
    if (options?.onUpdate) {
      options.onUpdate(to);
    }
    return {
      stop: vi.fn(),
      play: vi.fn(),
      pause: vi.fn(),
    };
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inView: vi.fn((_element: HTMLElement, callback: () => any) => {
    // Immediately trigger callback for testing
    callback();
    return vi.fn(); // cleanup
  }),
}));

describe('AnimatedCounter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with initial value', () => {
    render(<AnimatedCounter value={100} from={0} />);
    // Since our mock triggers immediately, it will show the final value
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('renders with prefix and suffix', () => {
    render(<AnimatedCounter value={100} prefix="$" suffix="k" />);
    expect(screen.getByText('$100k')).toBeInTheDocument();
  });

  it('renders with decimal places', () => {
    render(<AnimatedCounter value={99.9} decimals={1} />);
    expect(screen.getByText('99.9')).toBeInTheDocument();
  });

  it('renders with thousands separator', () => {
    render(<AnimatedCounter value={1000000} />);
    // Note: toLocaleString format depends on locale, but usually includes commas or spaces
    const text = screen.getByText(/1[.,\s]000[.,\s]000/);
    expect(text).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<AnimatedCounter value={100} className="custom-class" />);
    expect(screen.getByText('100')).toHaveClass('custom-class');
  });

  it('respects reduced motion', async () => {
    // Mock reduced motion
    vi.mock('@/utils/reducedMotion', () => ({
      useReducedMotion: () => ({ prefersReducedMotion: true }),
    }));

    render(<AnimatedCounter value={500} />);
    expect(screen.getByText('500')).toBeInTheDocument();
  });
});
