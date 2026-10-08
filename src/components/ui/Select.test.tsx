import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Select } from './Select';
import * as React from 'react';

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3', disabled: true },
];

describe('Select', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Select options={options} />);
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Select label="My Label" id="test-select" options={options} />);
      expect(screen.getByLabelText('My Label')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Select helperText="My helper text" options={options} />);
      expect(screen.getByText('My helper text')).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(<Select error="Error message" options={options} />);
      const errorMsg = screen.getByText('Error message');
      expect(errorMsg).toBeInTheDocument();
      expect(errorMsg).toHaveAttribute('role', 'alert');
    });

    it('prioritizes error over helper text', () => {
      render(<Select helperText="Helper" error="Error" options={options} />);
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    });

    it('renders children if options prop is not provided', () => {
      render(
        <Select>
          <option value="1">Child 1</option>
          <option value="2">Child 2</option>
        </Select>,
      );
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });
  });

  describe('Full Width', () => {
    it('applies full width class when fullWidth is true', () => {
      const { container } = render(<Select fullWidth options={options} />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('w-full');
    });

    it('defaults to w-auto wrapper', () => {
      const { container } = render(<Select options={options} />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('w-auto');
    });
  });

  describe('States', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Select disabled options={options} />);
      const select = screen.getByRole('combobox');
      expect(select).toBeDisabled();
    });

    it('applies error styles when error prop is present', () => {
      render(<Select error="Error" options={options} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('border-error-500');
    });

    it('renders disabled options correctly', () => {
      render(<Select options={options} />);
      const disabledOption = screen.getByText('Option 3');
      expect(disabledOption).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('associates label with select via id', () => {
      render(<Select label="Select Item" id="item-field" options={options} />);
      const select = screen.getByLabelText('Select Item');
      expect(select).toHaveAttribute('id', 'item-field');
    });

    it('associates helper text via aria-describedby', () => {
      render(<Select id="test" helperText="Helpful info" options={options} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-describedby', expect.stringContaining('test-helper'));
    });

    it('associates error message via aria-describedby', () => {
      render(<Select id="test" error="Required field" options={options} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-describedby', expect.stringContaining('test-error'));
      expect(select).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Events', () => {
    it('handles onChange event', () => {
      const handleChange = vi.fn();
      render(<Select onChange={handleChange} options={options} />);
      const select = screen.getByRole('combobox');

      fireEvent.change(select, { target: { value: '2' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect((select as HTMLSelectElement).value).toBe('2');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLSelectElement>();
      render(<Select ref={ref} options={options} />);
      expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    });
  });

  describe('Custom Classes', () => {
    it('applies custom className to select', () => {
      render(<Select className="custom-select-class" options={options} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('custom-select-class');
    });

    it('applies containerClassName to wrapper', () => {
      const { container } = render(
        <Select containerClassName="custom-wrapper" options={options} />,
      );
      expect(container.firstChild).toHaveClass('custom-wrapper');
    });
  });

  describe('Floating Label with Placeholder', () => {
    const placeholderOptions = [
      { label: 'Select an option', value: '' },
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ];

    // Note: The component also handles undefined values for placeholders,
    // but SelectOption type requires string | number, so we test with empty string

    it('floating label should be in floating position when placeholder option is present with empty string value', () => {
      render(
        <Select
          label="Test Label"
          floatingLabel
          options={placeholderOptions}
          data-testid="select"
        />,
      );
      const label = screen.getByText('Test Label');
      // The label should be floated immediately due to the placeholder option
      // Check that the label has the floating animation state (via aria-label or styling)
      expect(label).toBeInTheDocument();
      // The label should have the motion label classes indicating it's floating
      expect(label).toHaveClass('absolute');
    });

    it('floating label should be in floating position when using different placeholder label', () => {
      const customPlaceholderOptions = [
        { label: 'Please choose...', value: '' },
        { label: 'Option A', value: 'a' },
        { label: 'Option B', value: 'b' },
      ];
      render(
        <Select
          label="Test Label"
          floatingLabel
          options={customPlaceholderOptions}
          data-testid="select"
        />,
      );
      const label = screen.getByText('Test Label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass('absolute');
    });

    it('floating label should not overlap with placeholder text', () => {
      render(
        <Select
          label="Inquiry Type"
          floatingLabel
          options={[
            { label: 'Select an inquiry type', value: '' },
            { label: 'General', value: 'general' },
            { label: 'Support', value: 'support' },
          ]}
        />,
      );
      const label = screen.getByText('Inquiry Type');
      const select = screen.getByRole('combobox');

      // Verify both elements are in the document
      expect(label).toBeInTheDocument();
      expect(select).toBeInTheDocument();

      // The label should be absolutely positioned (floating)
      expect(label).toHaveClass('absolute');

      // The select should have the placeholder option
      expect(screen.getByText('Select an inquiry type')).toBeInTheDocument();
    });

    it('floating label stays floated when user selects a value', () => {
      render(<Select label="Test Label" floatingLabel options={placeholderOptions} />);
      const select = screen.getByRole('combobox');
      const label = screen.getByText('Test Label');

      // Initially label should be floating due to placeholder
      expect(label).toHaveClass('absolute');

      // Change to a real value
      fireEvent.change(select, { target: { value: '1' } });

      // Label should still be floating
      expect(label).toHaveClass('absolute');
      expect((select as HTMLSelectElement).value).toBe('1');
    });

    it('floating label stays floated when user clears selection back to placeholder', () => {
      render(
        <Select label="Test Label" floatingLabel options={placeholderOptions} defaultValue="1" />,
      );
      const select = screen.getByRole('combobox');
      const label = screen.getByText('Test Label');

      // Initially has a value, so label should be floating
      expect(label).toHaveClass('absolute');

      // Clear back to placeholder
      fireEvent.change(select, { target: { value: '' } });

      // Label should still be floating because placeholder is present
      expect(label).toHaveClass('absolute');
    });
  });
});
