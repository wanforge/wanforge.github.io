import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  const onPageChange = vi.fn();

  it('renders nothing when totalPages is 1', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={onPageChange} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders correctly with few pages', () => {
    render(<Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />);

    expect(screen.getByLabelText('Page 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Page 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Page 3')).toBeInTheDocument();
    expect(screen.queryByLabelText('Page 4')).not.toBeInTheDocument();
  });

  it('highlights current page', () => {
    render(<Pagination currentPage={2} totalPages={3} onPageChange={onPageChange} />);

    const activePage = screen.getByLabelText('Page 2');
    expect(activePage).toHaveAttribute('aria-current', 'page');
    expect(activePage).toHaveClass('bg-primary-700'); // Based on Button component's primary variant
  });

  it('calls onPageChange when a page number is clicked', () => {
    render(<Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByLabelText('Page 3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('disables previous button on first page', () => {
    render(<Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />);

    const prevButton = screen.getByLabelText(/previous/i);
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination currentPage={3} totalPages={3} onPageChange={onPageChange} />);

    const nextButton = screen.getByLabelText(/next/i);
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange with correct values for prev/next buttons', () => {
    render(<Pagination currentPage={2} totalPages={3} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByLabelText(/previous/i));
    expect(onPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByLabelText(/next/i));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('renders ellipsis for many pages', () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={onPageChange} />);

    expect(screen.getByLabelText('Page 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Page 10')).toBeInTheDocument();
    // With 10 pages and current=5, it should show 1, ..., 3, 4, 5, ..., 10
    // Previous, Next, and 5 page numbers = 7 buttons
    expect(screen.getAllByRole('button', { name: /page/i })).toHaveLength(7);
  });

  it('is accessible', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);

    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Pagination Navigation');
  });
});
