import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Textarea } from './Textarea';
import * as React from 'react';

describe('Textarea', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Textarea placeholder="Test placeholder" />);
      const textarea = screen.getByPlaceholderText('Test placeholder');
      expect(textarea).toBeInTheDocument();
      expect(textarea.tagName).toBe('TEXTAREA');
    });

    it('renders with label', () => {
      render(<Textarea label="My Label" id="test-textarea" />);
      expect(screen.getByLabelText('My Label')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Textarea helperText="My helper text" />);
      expect(screen.getByText('My helper text')).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(<Textarea error="Error message" />);
      const errorMsg = screen.getByText('Error message');
      expect(errorMsg).toBeInTheDocument();
      expect(errorMsg).toHaveAttribute('role', 'alert');
    });

    it('prioritizes error over helper text', () => {
      render(<Textarea helperText="Helper" error="Error" />);
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    });
  });

  describe('Character Count', () => {
    it('does not show character count by default', () => {
      render(<Textarea maxLength={100} defaultValue="Hello" />);
      expect(screen.queryByText(/5 \/ 100/)).not.toBeInTheDocument();
    });

    it('shows character count when showCharacterCount is true', () => {
      render(<Textarea showCharacterCount maxLength={100} defaultValue="Hello" />);
      expect(screen.getByText('5 / 100')).toBeInTheDocument();
    });

    it('updates character count on change', () => {
      render(<Textarea showCharacterCount maxLength={100} />);
      const textarea = screen.getByRole('textbox');

      fireEvent.change(textarea, { target: { value: 'Test' } });
      expect(screen.getByText('4 / 100')).toBeInTheDocument();
    });

    it('highlights character count when over maxLength', () => {
      // Note: maxLength on textarea prevents manual typing over limit,
      // but we can test the visual state if the value is set programmatically
      // or if we somehow bypass it (though our component uses maxLength prop on textarea)
      const { rerender } = render(
        <Textarea showCharacterCount maxLength={5} value="abc" readOnly />,
      );
      expect(screen.getByText('3 / 5')).not.toHaveClass('text-error-600');

      rerender(<Textarea showCharacterCount maxLength={5} value="abcdef" readOnly />);
      expect(screen.getByText('6 / 5')).toHaveClass('text-error-600');
    });
  });

  describe('Full Width', () => {
    it('applies full width class when fullWidth is true', () => {
      const { container } = render(<Textarea fullWidth />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('w-full');
    });

    it('defaults to w-auto wrapper', () => {
      const { container } = render(<Textarea />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('w-auto');
    });
  });

  describe('States', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Textarea disabled placeholder="Disabled" />);
      const textarea = screen.getByPlaceholderText('Disabled');
      expect(textarea).toBeDisabled();
    });

    it('applies error styles when error prop is present', () => {
      render(<Textarea error="Error" placeholder="Error Textarea" />);
      const textarea = screen.getByPlaceholderText('Error Textarea');
      expect(textarea).toHaveClass('border-error-500');
    });
  });

  describe('Accessibility', () => {
    it('associates label with textarea via id', () => {
      render(<Textarea label="Bio" id="bio-field" />);
      const textarea = screen.getByLabelText('Bio');
      expect(textarea).toHaveAttribute('id', 'bio-field');
    });

    it('associates helper text via aria-describedby', () => {
      render(<Textarea id="test" helperText="Helpful info" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-describedby', expect.stringContaining('test-helper'));
    });

    it('associates error message via aria-describedby', () => {
      render(<Textarea id="test" error="Required field" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-describedby', expect.stringContaining('test-error'));
      expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Events', () => {
    it('handles onChange event', () => {
      const handleChange = vi.fn();
      render(<Textarea onChange={handleChange} placeholder="Type here" />);
      const textarea = screen.getByPlaceholderText('Type here');

      fireEvent.change(textarea, { target: { value: 'Hello' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLTextAreaElement>();
      render(<Textarea ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });
  });

  describe('Custom Classes', () => {
    it('applies custom className to textarea', () => {
      render(<Textarea className="custom-textarea-class" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('custom-textarea-class');
    });

    it('applies containerClassName to wrapper', () => {
      const { container } = render(<Textarea containerClassName="custom-wrapper" />);
      expect(container.firstChild).toHaveClass('custom-wrapper');
    });
  });
});
