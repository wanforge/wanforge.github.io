// Test utility functions for component testing
// Provides render helpers, theme testing utilities, and accessibility testing helpers

import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { expect, vi } from 'vitest';
import * as React from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';

/**
 * Custom render function that wraps components with necessary providers
 * Can be extended to include ThemeProvider, Router, etc.
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  withTheme?: boolean;
  theme?: 'light' | 'dark' | 'system';
}

/**
 * Creates a mock theme context provider for testing
 * Returns a wrapper component as a React component
 */
const createThemeWrapper = (theme: 'light' | 'dark' | 'system' = 'light') => {
  return function ThemeWrapper({ children }: { children: ReactNode }) {
    return React.createElement(ThemeProvider, { defaultTheme: theme, children });
  };
};

/**
 * Custom render with theme support
 */
export function renderWithTheme(ui: ReactElement, options: CustomRenderOptions = {}) {
  const { withTheme = true, theme = 'light', ...renderOptions } = options;

  const Wrapper = withTheme ? createThemeWrapper(theme) : undefined;

  return render(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  });
}

/**
 * Renders a component for testing
 * Alias for renderWithTheme for simpler usage
 */
export function renderComponent(ui: ReactElement, options: CustomRenderOptions = {}) {
  return renderWithTheme(ui, options);
}

// Re-export testing library utilities
export { render, screen, waitFor, within } from '@testing-library/react';
export { userEvent } from '@testing-library/user-event';

/**
 * Checks if window is defined (for SSR compatibility)
 */
const isWindowDefined = (): boolean => {
  return typeof window !== 'undefined';
};

/**
 * Mock theme utilities for testing
 */
export const mockTheme = {
  /**
   * Sets up localStorage mock for theme preference
   */
  setupLocalStorage: (theme: 'light' | 'dark' | null = null) => {
    const localStorageMock = {
      getItem: vi.fn((key: string) => {
        if (key === 'theme' && theme) {
          return theme;
        }
        return null;
      }),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: theme ? 1 : 0,
      key: vi.fn(),
    };

    if (isWindowDefined()) {
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true,
      });
    }

    return localStorageMock;
  },

  /**
   * Sets up matchMedia mock for system preference
   */
  setupSystemPreference: (prefersDark: boolean = false) => {
    if (isWindowDefined()) {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches:
            query === '(prefers-color-scheme: dark)'
              ? prefersDark
              : query === '(prefers-reduced-motion: reduce)'
                ? false
                : false,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });
    }
  },
};

/**
 * Responsive testing utilities
 */
export const responsiveTesting = {
  /**
   * Viewport sizes for testing
   */
  viewports: {
    mobileSmall: { width: 320, height: 568 },
    mobile: { width: 375, height: 667 },
    mobileLarge: { width: 425, height: 812 },
    tablet: { width: 768, height: 1024 },
    desktopSmall: { width: 1024, height: 768 },
    desktop: { width: 1280, height: 720 },
    desktopLarge: { width: 1440, height: 900 },
    desktopExtraLarge: { width: 1920, height: 1080 },
  } as const,

  /**
   * Sets viewport size for responsive testing
   */
  setViewport: (width: number, height: number) => {
    if (isWindowDefined()) {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: height,
      });
      window.dispatchEvent(new Event('resize'));
    }
  },

  /**
   * Mocks matchMedia for responsive breakpoints
   */
  mockBreakpoint: (breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => {
    if (!isWindowDefined()) return;

    const breakpoints = {
      sm: '(min-width: 640px)',
      md: '(min-width: 768px)',
      lg: '(min-width: 1024px)',
      xl: '(min-width: 1280px)',
      '2xl': '(min-width: 1536px)',
    };

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === breakpoints[breakpoint],
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  },
};

/**
 * Accessibility testing helpers
 */
export const a11yTesting = {
  /**
   * Checks if element has proper ARIA attributes
   */
  expectAccessible: (element: HTMLElement) => {
    return {
      toHaveAriaLabel: (label: string) => {
        expect(element).toHaveAttribute('aria-label', label);
      },
      toHaveRole: (role: string) => {
        expect(element).toHaveAttribute('role', role);
      },
      toBeFocusable: () => {
        expect(element).not.toHaveAttribute('tabindex', '-1');
      },
    };
  },

  /**
   * Mock for prefers-reduced-motion media query
   */
  mockReducedMotion: (reduced: boolean = true) => {
    if (!isWindowDefined()) return;

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)' ? reduced : false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  },
};

/**
 * Mock data factories for testing
 */
export const mockFactories = {
  /**
   * Creates mock feature data
   */
  createFeature: (overrides = {}) => ({
    id: 'feature-1',
    title: 'Test Feature',
    description: 'This is a test feature description',
    icon: 'star',
    ...overrides,
  }),

  /**
   * Creates mock pricing tier data
   */
  createPricingTier: (overrides = {}) => ({
    id: 'tier-1',
    name: 'Test Tier',
    description: 'Test tier description',
    price: { monthly: 10, annual: 100 },
    features: ['Feature 1', 'Feature 2'],
    popular: false,
    ...overrides,
  }),

  /**
   * Creates mock testimonial data
   */
  createTestimonial: (overrides = {}) => ({
    id: 'testimonial-1',
    quote: 'This is a great product!',
    author: {
      name: 'John Doe',
      role: 'CEO',
      company: 'Test Company',
      avatar: '/images/avatar.jpg',
    },
    rating: 5,
    ...overrides,
  }),

  /**
   * Creates mock team member data
   */
  createTeamMember: (overrides = {}) => ({
    id: 'team-1',
    name: 'Jane Smith',
    role: 'Developer',
    bio: 'Passionate about building great products',
    photo: '/images/team/jane.jpg',
    social: {
      twitter: 'https://twitter.com/jane',
      linkedin: 'https://linkedin.com/in/jane',
    },
    ...overrides,
  }),

  /**
   * Creates mock integration data
   */
  createIntegration: (overrides = {}) => ({
    id: 'integration-1',
    name: 'Test Integration',
    logo: '/images/integrations/test.svg',
    category: 'productivity',
    url: 'https://example.com',
    ...overrides,
  }),

  /**
   * Creates mock blog post data
   */
  createBlogPost: (overrides = {}) => ({
    id: 'post-1',
    title: 'Test Blog Post',
    excerpt: 'This is a test blog post excerpt',
    content: 'This is the full content of the blog post.',
    author: {
      name: 'Author Name',
      avatar: '/images/author.jpg',
    },
    date: '2026-02-09',
    readingTime: 5,
    category: 'product',
    ...overrides,
  }),

  /**
   * Creates mock FAQ data
   */
  createFAQ: (overrides = {}) => ({
    id: 'faq-1',
    question: 'What is this?',
    answer: 'This is a test FAQ answer.',
    category: 'general',
    ...overrides,
  }),
};
