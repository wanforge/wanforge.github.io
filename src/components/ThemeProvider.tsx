import * as React from 'react';
import { type ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';

/**
 * Theme types supported by the application
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Resolved theme - the actual applied theme (light or dark)
 */
export type ResolvedTheme = 'light' | 'dark';

/**
 * Theme context type definition
 */
interface ThemeContextType {
  /** Current theme setting (light, dark, or system) */
  theme: Theme;
  /** The resolved theme (light or dark) based on system preference if 'system' is selected */
  resolvedTheme: ResolvedTheme;
  /** Function to set a specific theme */
  setTheme: (theme: Theme) => void;
  /** Function to toggle between light and dark themes */
  toggleTheme: () => void;
  /** Whether the theme has been mounted/initialized (to prevent hydration mismatch) */
  mounted: boolean;
}

/**
 * Theme context for providing theme state throughout the application
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Local storage key for persisting theme preference
 */
const STORAGE_KEY = 'theme';

/**
 * Gets the resolved theme based on the current theme setting
 * @param theme - The current theme setting
 * @returns The resolved theme (light or dark)
 */
function getResolvedTheme(theme: Theme): ResolvedTheme {
  if (theme === 'system') {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
}

/**
 * Safely access localStorage with error handling
 * @param key - The localStorage key
 * @returns The stored value or null
 */
function getStorageItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn('Failed to access localStorage:', error);
    return null;
  }
}

/**
 * Safely set a localStorage item with error handling
 * @param key - The localStorage key
 * @param value - The value to store
 */
function setStorageItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn('Failed to write to localStorage:', error);
  }
}

/**
 * Safely remove a localStorage item with error handling
 * @param key - The localStorage key
 */
function removeStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn('Failed to remove from localStorage:', error);
  }
}

/**
 * Props for the ThemeProvider component
 */
interface ThemeProviderProps {
  /** Child components to wrap with the theme provider */
  children: ReactNode;
  /** Default theme to use if no preference is stored */
  defaultTheme?: Theme;
  /** Storage key for persisting theme preference (default: 'theme') */
  storageKey?: string;
  /** Disable transitions when switching themes */
  disableTransitionOnChange?: boolean;
}

/**
 * ThemeProvider component that manages theme state and provides it to the application
 *
 * Features:
 * - System preference detection
 * - localStorage persistence
 * - Theme toggle functionality
 * - Prevents hydration mismatch
 * - Applies theme to document root
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="system">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = STORAGE_KEY,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  // Always initialize with 'light' (or the explicit theme) to match SSR and prevent hydration mismatch.
  // The actual theme will be resolved in useEffect after mounting.
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(
    defaultTheme === 'system' ? 'light' : defaultTheme,
  );
  const [mounted, setMounted] = useState(false);

  // Load stored theme preference on mount
  useEffect(() => {
    const stored = getStorageItem(storageKey) as Theme | null;
    const activeTheme = stored || defaultTheme;

    if (stored) {
      setThemeState(stored);
    }

    // Now we can safely resolve the theme on the client
    const resolved = getResolvedTheme(activeTheme);
    setResolvedTheme(resolved);

    // Apply the theme to the document (though the inline script should have handled it)
    applyTheme(resolved, disableTransitionOnChange);

    setMounted(true);
  }, [storageKey, defaultTheme, disableTransitionOnChange]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (theme === 'system') {
        const newResolved = mediaQuery.matches ? 'dark' : 'light';
        setResolvedTheme(newResolved);
        applyTheme(newResolved, disableTransitionOnChange);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, disableTransitionOnChange]);

  // Apply theme when it changes
  useEffect(() => {
    if (!mounted) return;

    const newResolved = getResolvedTheme(theme);
    setResolvedTheme(newResolved);
    applyTheme(newResolved, disableTransitionOnChange);

    // Persist preference (only if not 'system')
    if (theme === 'system') {
      removeStorageItem(storageKey);
    } else {
      setStorageItem(storageKey, theme);
    }
  }, [theme, mounted, storageKey, disableTransitionOnChange]);

  /**
   * Applies the theme to the document root
   * @param resolved - The resolved theme to apply
   * @param disableTransition - Whether to disable transitions
   */
  const applyTheme = useCallback((resolved: ResolvedTheme, disableTransition: boolean) => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;

    // Disable transitions temporarily if requested
    if (disableTransition) {
      const css = document.createElement('style');
      css.appendChild(
        document.createTextNode(
          `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
        ),
      );
      document.head.appendChild(css);

      requestAnimationFrame(() => {
        document.head.removeChild(css);
      });
    }

    // Apply theme attributes
    root.setAttribute('data-theme', resolved);
    root.style.colorScheme = resolved;

    // Also add/remove class for Tailwind dark mode support
    if (resolved === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  /**
   * Sets the theme to a specific value
   * @param newTheme - The theme to set
   */
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  /**
   * Toggles between light and dark themes
   * If currently system, it will toggle based on the resolved theme
   */
  const toggleTheme = useCallback(() => {
    setThemeState((currentTheme) => {
      const currentResolved = getResolvedTheme(currentTheme);
      return currentResolved === 'light' ? 'dark' : 'light';
    });
  }, []);

  // Provide theme context to children
  const value: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    mounted,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Hook to access the theme context
 *
 * @returns The theme context value
 * @throws Error if used outside of ThemeProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, resolvedTheme, toggleTheme } = useTheme();
 *   return (
 *     <button onClick={toggleTheme}>
 *       Current theme: {resolvedTheme}
 *     </button>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Inline script to prevent flash of wrong theme
 * This should be injected in the <head> of the document before any styles
 *
 * @param defaultTheme - The default theme to use
 * @returns The inline script content
 */
export function getThemeScript(defaultTheme: Theme = 'system'): string {
  return `
    (function() {
      function getTheme() {
        try {
          const stored = localStorage.getItem('${STORAGE_KEY}');
          if (stored === 'light' || stored === 'dark') return stored;
        } catch (e) {}
        
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark';
        }
        return '${defaultTheme === 'system' ? 'light' : defaultTheme}';
      }
      
      const theme = getTheme();
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.style.colorScheme = theme;
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    })();
  `;
}

export default ThemeProvider;
