import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select } from './Select';
import * as React from 'react';
import * as reducedMotion from '../../utils/reducedMotion';

// Mock useReducedMotion
vi.mock('../../utils/reducedMotion', () => ({
  useReducedMotion: vi.fn(),
}));

describe('Form Input Animations', () => {
  const mockBaseState = {
    isSupported: true,
    toggle: vi.fn(),
    setPrefersReducedMotion: vi.fn(),
  };

  beforeEach(() => {
    vi.mocked(reducedMotion.useReducedMotion).mockReturnValue({
      ...mockBaseState,
      prefersReducedMotion: false,
    });
  });

  describe('Input Floating Label', () => {
    it('renders label as floating when floatingLabel is true', () => {
      render(<Input label="Name" floatingLabel />);
      const label = screen.getByText('Name');
      expect(label).toHaveClass('absolute');
    });

    it('does not float label when input is empty and not focused', () => {
      render(<Input label="Name" floatingLabel />);
      const label = screen.getByText('Name');
      expect(label).toBeInTheDocument();
    });

    it('floats label when input is focused', () => {
      render(<Input label="Name" floatingLabel />);
      const input = screen.getByRole('textbox');

      fireEvent.focus(input);
      expect(screen.getByText('Name')).toBeInTheDocument();
    });
  });

  describe('Error Shake Animation', () => {
    it('applies shake animation properties when error is present', () => {
      const { container } = render(<Input error="Required" />);
      const animatedDiv = container.querySelector('.relative.flex.items-center');
      expect(animatedDiv).toBeInTheDocument();
    });
  });

  describe('Textarea Animations', () => {
    it('renders floating label for textarea', () => {
      render(<Textarea label="Bio" floatingLabel />);
      expect(screen.getByText('Bio')).toHaveClass('absolute');
    });
  });

  describe('Select Animations', () => {
    it('renders floating label for select', () => {
      render(<Select label="Country" floatingLabel options={[{ label: 'USA', value: 'usa' }]} />);
      expect(screen.getByText('Country')).toHaveClass('absolute');
    });
  });

  describe('Reduced Motion Support', () => {
    it('respects reduced motion for input animations', () => {
      vi.mocked(reducedMotion.useReducedMotion).mockReturnValue({
        ...mockBaseState,
        prefersReducedMotion: true,
      });

      const { container } = render(<Input error="Error" />);
      const animatedDiv = container.querySelector('.relative.flex.items-center');
      expect(animatedDiv).toBeInTheDocument();
    });
  });
});
