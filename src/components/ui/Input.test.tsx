import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Input } from './Input';
import * as React from 'react';

describe('Input', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Input placeholder="Test placeholder" />);
      const input = screen.getByPlaceholderText('Test placeholder');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');
    });

    it('renders with specific type', () => {
      render(<Input type="email" placeholder="Email" />);
      const input = screen.getByPlaceholderText('Email');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('renders with label', () => {
      render(<Input label="My Label" id="test-input" />);
      expect(screen.getByLabelText('My Label')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Input helperText="My helper text" />);
      expect(screen.getByText('My helper text')).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(<Input error="Error message" />);
      const errorMsg = screen.getByText('Error message');
      expect(errorMsg).toBeInTheDocument();
      expect(errorMsg).toHaveAttribute('role', 'alert');
    });

    it('prioritizes error over helper text', () => {
      render(<Input helperText="Helper" error="Error" />);
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    });
  });

  describe('Full Width', () => {
    it('applies full width class when fullWidth is true', () => {
      const { container } = render(<Input fullWidth />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('w-full');
    });

    it('defaults to w-auto wrapper', () => {
      const { container } = render(<Input />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('w-auto');
    });
  });

  describe('States', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Input disabled placeholder="Disabled" />);
      const input = screen.getByPlaceholderText('Disabled');
      expect(input).toBeDisabled();
    });

    it('applies error styles when error prop is present', () => {
      render(<Input error="Error" placeholder="Error Input" />);
      const input = screen.getByPlaceholderText('Error Input');
      expect(input).toHaveClass('border-error-500');
    });
  });

  describe('Accessibility', () => {
    it('associates label with input via id', () => {
      render(<Input label="Name" id="name-field" />);
      const input = screen.getByLabelText('Name');
      expect(input).toHaveAttribute('id', 'name-field');
    });

    it('associates helper text via aria-describedby', () => {
      render(<Input id="test" helperText="Helpful info" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('test-helper'));
    });

    it('associates error message via aria-describedby', () => {
      render(<Input id="test" error="Required field" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('test-error'));
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Events', () => {
    it('handles onChange event', () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} placeholder="Type here" />);
      const input = screen.getByPlaceholderText('Type here');

      fireEvent.change(input, { target: { value: 'Hello' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('Custom Classes', () => {
    it('applies custom className to input', () => {
      render(<Input className="custom-input-class" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-input-class');
    });

    it('applies containerClassName to wrapper', () => {
      const { container } = render(<Input containerClassName="custom-wrapper" />);
      expect(container.firstChild).toHaveClass('custom-wrapper');
    });
  });
});
