import * as React from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { Moon, Sun } from 'lucide-react';

/**
 * Props for the ThemeToggle component
 */
interface ThemeToggleProps {
  /**
   * Accessible label for the toggle button
   * @default "Toggle theme"
   */
  'aria-label'?: string;
  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

/**
 * ThemeToggle component - A button that toggles between light and dark themes
 *
 * Features:
 * - Sun and moon icons with smooth rotation animation
 * - Accessible with proper aria-label
 * - Keyboard accessible (Enter/Space to toggle)
 * - Styled for both light and dark modes
 * - Uses the useTheme hook for state management
 *
 * @example
 * ```tsx
 * <ThemeToggle />
 * <ThemeToggle className="custom-class" />
 * <ThemeToggle aria-label="Switch color theme" />
 * ```
 */
export function ThemeToggle({
  'aria-label': ariaLabel = 'Toggle theme',
  className = '',
}: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`
        relative inline-flex h-10 w-10 items-center justify-center rounded-lg
        border border-[var(--color-border-default)]
        bg-[var(--color-bg-primary)]
        text-[var(--color-text-secondary)]
        transition-all duration-200 ease-in-out
        hover:bg-[var(--color-bg-secondary)]
        hover:text-[var(--color-text-primary)]
        hover:shadow-[var(--shadow-sm)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--color-focus-ring)]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[var(--color-bg-primary)]
        active:scale-95
        ${className}
      `}
      aria-label={ariaLabel}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      data-testid="theme-toggle"
    >
      <span className="sr-only">{isDark ? 'Switch to light mode' : 'Switch to dark mode'}</span>

      {/* Sun Icon - Visible in light mode, hidden in dark mode */}
      <Sun
        className={`
          absolute h-5 w-5
          transition-all duration-300 ease-in-out
          ${isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}
        `}
        aria-hidden="true"
        focusable="false"
      />

      {/* Moon Icon - Visible in dark mode, hidden in light mode */}
      <Moon
        className={`
          absolute h-5 w-5
          transition-all duration-300 ease-in-out
          ${isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}
        `}
        aria-hidden="true"
        focusable="false"
      />
    </button>
  );
}

export default ThemeToggle;
