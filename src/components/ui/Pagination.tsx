import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from './Button';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Pagination Props Interface
 */
export interface PaginationProps {
  /** The current active page (1-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Maximum number of page buttons to show (excluding ellipsis and ends) */
  maxVisiblePages?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Pagination Component
 *
 * A responsive, accessible pagination component with support for:
 * - Previous/Next buttons
 * - Page number indicators
 * - Ellipsis for large page counts
 * - Theme-aware styling
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={(page) => console.log(page)}
 * />
 * ```
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  className,
}) => {
  // Don't render anything if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  /**
   * Generates the page numbers to display, including ellipsis
   */
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      const start = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
      const end = Math.min(totalPages - 1, start + maxVisiblePages - 3);

      // Adjusted start if end is at totalPages - 1
      const adjustedStart = Math.max(2, end - (maxVisiblePages - 3));

      if (adjustedStart > 2) {
        pages.push('ellipsis');
      }

      for (let i = adjustedStart; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('ellipsis');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      aria-label="Pagination Navigation"
      data-testid="pagination"
      className={twMerge('flex items-center justify-center gap-2 py-4', className)}
    >
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className="px-2 sm:px-3"
        leftIcon={<ChevronLeft size={16} />}
      >
        <span className="hidden sm:inline">Previous</span>
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 sm:gap-2">
        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="flex h-8 w-8 items-center justify-center text-text-tertiary"
                aria-hidden="true"
              >
                <MoreHorizontal size={16} />
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <Button
              key={page}
              variant={isActive ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={isActive ? 'page' : undefined}
              className={clsx(
                'h-8 w-8 min-w-0 p-0',
                !isActive && 'text-text-secondary hover:text-text-primary',
              )}
            >
              {page}
            </Button>
          );
        })}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className="px-2 sm:px-3"
        rightIcon={<ChevronRight size={16} />}
      >
        <span className="hidden sm:inline">Next</span>
      </Button>
    </nav>
  );
};

export default Pagination;
