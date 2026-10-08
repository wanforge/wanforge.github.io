import * as React from 'react';
import { Tabs, TabsList, TabsTrigger } from './Tabs';
import { type BlogCategory, blogCategories } from '@/data/blog';
import { cn } from '@/utils/cn';

export interface CategoryFilterProps {
  /** The currently active category */
  activeCategory: BlogCategory | 'all';
  /** Callback fired when the category changes */
  onCategoryChange: (category: BlogCategory | 'all') => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * CategoryFilter Component
 *
 * Provides an interactive set of filters for blog categories.
 * Uses the Tabs component for consistent interaction and accessibility.
 * Supports horizontal scrolling on mobile devices.
 */
export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onCategoryChange,
  className,
}) => {
  return (
    <div
      className={cn('w-full overflow-x-auto pb-2 scrollbar-hide touch-pan-x', className)}
      data-testid="category-filter"
    >
      <Tabs
        value={activeCategory}
        onValueChange={(value) => onCategoryChange(value as BlogCategory | 'all')}
        className="w-fit min-w-full flex justify-center"
        hasPanels={false}
      >
        <TabsList className="bg-bg-secondary/50 backdrop-blur-sm border border-border-muted p-1 rounded-full h-auto flex-nowrap whitespace-nowrap overflow-x-visible">
          <TabsTrigger
            value="all"
            className={cn(
              'px-6 py-2 rounded-full text-sm font-medium transition-all',
              activeCategory === 'all'
                ? 'text-text-primary'
                : 'text-text-muted hover:text-text-primary',
            )}
          >
            All Categories
          </TabsTrigger>
          {blogCategories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className={cn(
                'px-6 py-2 rounded-full text-sm font-medium transition-all',
                activeCategory === category.id
                  ? 'text-text-primary'
                  : 'text-text-muted hover:text-text-primary',
              )}
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CategoryFilter;
