import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BentoGrid, BentoGridItem } from './BentoGrid';

describe('BentoGrid', () => {
  describe('BentoGrid Container', () => {
    it('renders children correctly', () => {
      render(
        <BentoGrid data-testid="bento-grid">
          <div>Item 1</div>
          <div>Item 2</div>
        </BentoGrid>,
      );

      expect(screen.getByTestId('bento-grid')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('applies default grid classes', () => {
      render(
        <BentoGrid data-testid="bento-grid">
          <div>Item</div>
        </BentoGrid>,
      );

      const grid = screen.getByTestId('bento-grid');
      expect(grid).toHaveClass('grid');
      expect(grid).toHaveClass('md:grid-cols-3');
      expect(grid).toHaveClass('gap-4');
    });

    it('supports custom column counts', () => {
      render(
        <BentoGrid cols={2} data-testid="bento-grid">
          <div>Item</div>
        </BentoGrid>,
      );

      expect(screen.getByTestId('bento-grid')).toHaveClass('md:grid-cols-2');
    });

    it('supports custom gap sizes', () => {
      render(
        <BentoGrid gap={6} data-testid="bento-grid">
          <div>Item</div>
        </BentoGrid>,
      );

      expect(screen.getByTestId('bento-grid')).toHaveClass('gap-6');
    });

    it('applies custom className', () => {
      render(
        <BentoGrid className="custom-grid-class" data-testid="bento-grid">
          <div>Item</div>
        </BentoGrid>,
      );

      expect(screen.getByTestId('bento-grid')).toHaveClass('custom-grid-class');
    });
  });

  describe('BentoGridItem', () => {
    it('renders basic content correctly', () => {
      render(
        <BentoGridItem
          title="Item Title"
          description="Item Description"
          data-testid="bento-item"
        />,
      );

      expect(screen.getByText('Item Title')).toBeInTheDocument();
      expect(screen.getByText('Item Description')).toBeInTheDocument();
    });

    it('renders with icon and header', () => {
      render(
        <BentoGridItem
          title="Title"
          icon={<span data-testid="item-icon">Icon</span>}
          header={<div data-testid="item-header">Header Content</div>}
          data-testid="bento-item"
        />,
      );

      expect(screen.getByTestId('item-icon')).toBeInTheDocument();
      expect(screen.getByTestId('item-header')).toBeInTheDocument();
    });

    it('applies default span classes', () => {
      render(<BentoGridItem data-testid="bento-item" />);

      const item = screen.getByTestId('bento-item');
      expect(item).toHaveClass('md:col-span-1');
      expect(item).toHaveClass('md:row-span-1');
    });

    it('supports custom column spans', () => {
      render(<BentoGridItem colSpan={2} data-testid="bento-item" />);
      expect(screen.getByTestId('bento-item')).toHaveClass('md:col-span-2');
    });

    it('supports custom row spans', () => {
      render(<BentoGridItem rowSpan={2} data-testid="bento-item" />);
      expect(screen.getByTestId('bento-item')).toHaveClass('md:row-span-2');
    });

    it('applies hover effects classes', () => {
      render(<BentoGridItem data-testid="bento-item" />);

      const item = screen.getByTestId('bento-item');
      expect(item).toHaveClass('transition-all');
      expect(item).toHaveClass('hover:shadow-xl');
    });

    it('applies theme-aware base styles', () => {
      render(<BentoGridItem data-testid="bento-item" />);

      const item = screen.getByTestId('bento-item');
      expect(item).toHaveClass('bg-bg-primary');
      expect(item).toHaveClass('border-border-default');
    });
  });
});
