import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button, ButtonGroup, IconButton } from './Button';
import { ArrowRight } from 'lucide-react';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button', { name: 'Click me' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'button');
    });

    it('renders children correctly', () => {
      render(<Button>Test Button</Button>);
      expect(screen.getByText('Test Button')).toBeInTheDocument();
    });

    it('renders with submit type', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('renders with reset type', () => {
      render(<Button type="reset">Reset</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'reset');
    });
  });

  describe('Variants', () => {
    it('renders primary variant by default', () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-primary-600');
    });

    it('renders secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-secondary-600');
    });

    it('renders outline variant', () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-transparent');
      expect(button.className).toContain('border');
    });

    it('renders ghost variant', () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-transparent');
      expect(button.className).toContain('border-transparent');
    });
  });

  describe('Sizes', () => {
    it('renders medium size by default', () => {
      render(<Button>Default</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('h-10');
      expect(button.className).toContain('px-4');
    });

    it('renders small size', () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('h-8');
      expect(button.className).toContain('px-3');
      expect(button.className).toContain('text-sm');
    });

    it('renders large size', () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('h-12');
      expect(button.className).toContain('px-6');
      expect(button.className).toContain('text-lg');
    });
  });

  describe('States', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('is disabled when loading is true', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('displays loading spinner when loading', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');
      const spinner = button.querySelector('svg');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('animate-spin');
    });

    it('shows cursor-wait class when loading', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('cursor-wait');
    });
  });

  describe('Icons', () => {
    it('renders left icon', () => {
      render(<Button leftIcon={<ArrowRight data-testid="left-icon" />}>Button</Button>);
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders right icon', () => {
      render(<Button rightIcon={<ArrowRight data-testid="right-icon" />}>Button</Button>);
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('renders both left and right icons', () => {
      render(
        <Button
          leftIcon={<span data-testid="left">L</span>}
          rightIcon={<span data-testid="right">R</span>}
        >
          Button
        </Button>,
      );
      expect(screen.getByTestId('left')).toBeInTheDocument();
      expect(screen.getByTestId('right')).toBeInTheDocument();
    });

    it('hides icons when loading', () => {
      render(
        <Button loading leftIcon={<span data-testid="icon">Icon</span>}>
          Loading
        </Button>,
      );
      expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    });
  });

  describe('Full Width', () => {
    it('applies full width class when fullWidth is true', () => {
      render(<Button fullWidth>Full Width</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('w-full');
    });

    it('does not apply full width by default', () => {
      render(<Button>Default</Button>);
      const button = screen.getByRole('button');
      expect(button.className).not.toContain('w-full');
    });
  });

  describe('Accessibility', () => {
    it('has correct button role', () => {
      render(<Button>Accessible</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('supports keyboard interaction', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Clickable</Button>);
      const button = screen.getByRole('button');

      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('prevents click when disabled', () => {
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>,
      );
      const button = screen.getByRole('button');

      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('prevents click when loading', () => {
      const handleClick = vi.fn();
      render(
        <Button loading onClick={handleClick}>
          Loading
        </Button>,
      );
      const button = screen.getByRole('button');

      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('has focus visible styles', () => {
      render(<Button>Focusable</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('focus-visible:ring-2');
    });

    it('icons have aria-hidden', () => {
      render(<Button leftIcon={<span>Icon</span>}>Button</Button>);
      const iconContainer = screen.getByText('Icon').parentElement;
      expect(iconContainer).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Micro-interactions', () => {
    it('renders ripple elements on mouse down when ripple is true', () => {
      render(<Button ripple>Ripple Me</Button>);
      const button = screen.getByRole('button');

      fireEvent.mouseDown(button);

      // Ripple is rendered as a motion.span
      const ripple = button.querySelector('span[style*="border-radius: 50%"]');
      expect(ripple).toBeInTheDocument();
    });

    it('does not render ripple when ripple prop is false', () => {
      render(<Button ripple={false}>No Ripple</Button>);
      const button = screen.getByRole('button');

      fireEvent.mouseDown(button);

      const ripple = button.querySelector('span[style*="border-radius: 50%"]');
      expect(ripple).not.toBeInTheDocument();
    });

    it('applies relative and overflow-hidden classes for ripple containment', () => {
      render(<Button ripple>Container</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('relative');
      expect(button.className).toContain('overflow-hidden');
    });
  });

  describe('Custom Classes', () => {
    it('applies custom className', () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('custom-class');
    });

    it('combines custom class with default classes', () => {
      render(<Button className="my-custom-class">Custom</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('my-custom-class');
      expect(button.className).toContain('bg-primary-600');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null as HTMLButtonElement | null };
      render(<Button ref={ref}>With Ref</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName).toBe('BUTTON');
    });
  });
});

describe('IconButton', () => {
  it('renders with icon only', () => {
    render(<IconButton icon={<ArrowRight data-testid="icon" />} aria-label="Next" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('requires aria-label', () => {
    render(<IconButton icon={<ArrowRight />} aria-label="Close dialog" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Close dialog');
  });

  it('applies square sizing', () => {
    render(<IconButton icon={<ArrowRight />} aria-label="Next" size="md" />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('h-10');
    expect(button.className).toContain('w-10');
  });

  it('passes through variant prop', () => {
    render(<IconButton icon={<ArrowRight />} aria-label="Next" variant="outline" />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-transparent');
    expect(button.className).toContain('border');
  });
});

describe('ButtonGroup', () => {
  it('renders children in a group', () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>,
    );

    const group = screen.getByRole('group');
    expect(group).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('applies flex layout with gap', () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    );

    const group = screen.getByRole('group');
    expect(group.className).toContain('flex');
    expect(group.className).toContain('gap-3');
  });

  it('supports stackOnMobile prop', () => {
    render(
      <ButtonGroup stackOnMobile>
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    );

    const group = screen.getByRole('group');
    expect(group.className).toContain('flex-col');
    expect(group.className).toContain('sm:flex-row');
  });

  it('supports fullWidthMobile prop', () => {
    render(
      <ButtonGroup fullWidthMobile>
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    );

    const group = screen.getByRole('group');
    expect(group.className).toContain('[&>*]:w-full');
    expect(group.className).toContain('sm:[&>*]:w-auto');
  });

  it('applies custom className', () => {
    render(
      <ButtonGroup className="custom-group">
        <Button>One</Button>
      </ButtonGroup>,
    );

    const group = screen.getByRole('group');
    expect(group.className).toContain('custom-group');
  });
});

describe('Button Integration', () => {
  it('works with form submission', () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());
    render(
      <form onSubmit={handleSubmit}>
        <Button type="submit">Submit Form</Button>
      </form>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('maintains styling with all variants and sizes', () => {
    const { rerender } = render(
      <Button variant="primary" size="sm">
        Test
      </Button>,
    );
    let button = screen.getByRole('button');
    expect(button.className).toContain('bg-primary-600');
    expect(button.className).toContain('h-8');

    rerender(
      <Button variant="secondary" size="lg">
        Test
      </Button>,
    );
    button = screen.getByRole('button');
    expect(button.className).toContain('bg-secondary-600');
    expect(button.className).toContain('h-12');

    rerender(
      <Button variant="outline" size="md">
        Test
      </Button>,
    );
    button = screen.getByRole('button');
    expect(button.className).toContain('bg-transparent');
    expect(button.className).toContain('border');
    expect(button.className).toContain('h-10');
  });

  it('handles rapid clicks correctly', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Fast</Button>);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(3);
  });
});
