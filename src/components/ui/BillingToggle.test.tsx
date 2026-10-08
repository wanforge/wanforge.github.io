import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BillingToggle } from './BillingToggle';

describe('BillingToggle', () => {
  it('renders monthly and annual labels', () => {
    render(<BillingToggle value="monthly" onChange={() => {}} />);
    expect(screen.getByText('Monthly')).toBeInTheDocument();
    expect(screen.getByText('Annual')).toBeInTheDocument();
  });

  it('displays the discount label', () => {
    render(<BillingToggle value="monthly" onChange={() => {}} discountLabel="Save 50%" />);
    expect(screen.getByText('Save 50%')).toBeInTheDocument();
  });

  it('calls onChange with "annual" when clicking the annual label', () => {
    const onChange = vi.fn();
    render(<BillingToggle value="monthly" onChange={onChange} />);

    fireEvent.click(screen.getByText('Annual'));
    expect(onChange).toHaveBeenCalledWith('annual');
  });

  it('calls onChange with "monthly" when clicking the monthly label', () => {
    const onChange = vi.fn();
    render(<BillingToggle value="annual" onChange={onChange} />);

    fireEvent.click(screen.getByText('Monthly'));
    expect(onChange).toHaveBeenCalledWith('monthly');
  });

  it('calls onChange when clicking the toggle switch', () => {
    const onChange = vi.fn();
    render(<BillingToggle value="monthly" onChange={onChange} />);

    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);
    expect(onChange).toHaveBeenCalledWith('annual');
  });

  it('handles keyboard navigation (Space/Enter on toggle)', () => {
    const onChange = vi.fn();
    render(<BillingToggle value="monthly" onChange={onChange} />);

    const toggle = screen.getByRole('switch');

    fireEvent.keyDown(toggle, { key: ' ' });
    expect(onChange).toHaveBeenCalledWith('annual');

    fireEvent.keyDown(toggle, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('annual');
  });

  it('applies correct accessibility attributes', () => {
    render(<BillingToggle value="annual" onChange={() => {}} />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(toggle).toHaveAttribute('aria-label', 'Toggle annual billing');
  });

  it('applies custom className', () => {
    const { container } = render(
      <BillingToggle value="monthly" onChange={() => {}} className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
