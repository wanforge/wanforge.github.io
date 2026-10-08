import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CategoryFilter } from './CategoryFilter';
import { blogCategories } from '@/data/blog';

describe('CategoryFilter', () => {
  const onCategoryChange = vi.fn();

  it('renders all categories and the "All" option', () => {
    render(<CategoryFilter activeCategory="all" onCategoryChange={onCategoryChange} />);

    expect(screen.getByText('All Categories')).toBeInTheDocument();
    blogCategories.forEach((category) => {
      expect(screen.getByText(category.label)).toBeInTheDocument();
    });
  });

  it('calls onCategoryChange when a category is clicked', () => {
    render(<CategoryFilter activeCategory="all" onCategoryChange={onCategoryChange} />);

    const firstCategory = screen.getByText(blogCategories[0]!.label);
    fireEvent.click(firstCategory);

    expect(onCategoryChange).toHaveBeenCalledWith(blogCategories[0]!.id);
  });

  it('indicates the active category', () => {
    const activeCategory = blogCategories[1]!.id;
    render(<CategoryFilter activeCategory={activeCategory} onCategoryChange={onCategoryChange} />);

    const activeTrigger = screen.getByRole('tab', { selected: true });
    expect(activeTrigger).toHaveTextContent(blogCategories[1]!.label);
  });

  it('applies custom className', () => {
    const { container } = render(
      <CategoryFilter
        activeCategory="all"
        onCategoryChange={onCategoryChange}
        className="custom-class"
      />,
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
