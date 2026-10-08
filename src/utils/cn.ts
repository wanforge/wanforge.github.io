import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes with proper precedence.
 * Combines clsx for conditional classes and tailwind-merge for deduplication.
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 *
 * @example
 * ```ts
 * cn('px-4 py-2', 'px-6') // 'py-2 px-6'
 * cn('bg-red-500', isActive && 'bg-blue-500') // 'bg-blue-500' (when isActive is true)
 * cn('text-sm', { 'font-bold': true, 'italic': false }) // 'text-sm font-bold'
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export default cn;
