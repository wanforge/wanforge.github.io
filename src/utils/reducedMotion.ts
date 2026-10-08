/**
 * Reduced Motion Detection Utility
 *
 * Detects and handles prefers-reduced-motion user preferences.
 * Ensures animations respect accessibility settings.
 *
 * @see docs/research/ANIMATION_STRATEGY.md
 * @see docs/research/THEME_SYSTEM.md
 */

import { useCallback, useEffect, useState } from 'react';
import { ACCESSIBILITY } from '@/config/animation';

// ============================================================================
// Types
// ============================================================================

export interface ReducedMotionState {
  /** Whether reduced motion is preferred */
  prefersReducedMotion: boolean;
  /** Whether the media query is supported */
  isSupported: boolean;
  /** Function to manually toggle reduced motion (for testing) */
  toggle: () => void;
  /** Function to set reduced motion preference */
  setPrefersReducedMotion: (value: boolean) => void;
}

// ============================================================================
// Detection Functions
// ============================================================================

/**
 * Check if reduced motion is preferred
 * Returns false if the API is not supported
 */
export function getPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
}

/**
 * Check if the matchMedia API is supported
 */
export function isReducedMotionSupported(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return (
    'matchMedia' in window &&
    window.matchMedia('(prefers-reduced-motion: reduce)').media !== 'not all'
  );
}

// ============================================================================
// React Hook
// ============================================================================

/**
 * Hook to detect and respond to prefers-reduced-motion changes
 *
 * Usage:
 * ```tsx
 * const { prefersReducedMotion } = useReducedMotion();
 *
 * return (
 *   <motion.div
 *     animate={prefersReducedMotion ? {} : { scale: 1.1 }}
 *   />
 * );
 * ```
 */
export function useReducedMotion(): ReducedMotionState {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // Check support
    const supported = isReducedMotionSupported();
    setIsSupported(supported);

    // Get initial value
    setPrefersReducedMotion(getPrefersReducedMotion());

    // Set up listener for changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggle = useCallback(() => {
    setPrefersReducedMotion((prev) => !prev);
  }, []);

  return {
    prefersReducedMotion,
    isSupported,
    toggle,
    setPrefersReducedMotion,
  };
}

// ============================================================================
// Animation Helpers
// ============================================================================

/**
 * Returns animation configuration based on reduced motion preference
 *
 * @param animation - Normal animation configuration
 * @param prefersReducedMotion - Whether reduced motion is preferred
 * @returns Animation configuration respecting user preferences
 */
export function getAccessibleAnimation<T extends Record<string, unknown>>(
  animation: T,
  prefersReducedMotion: boolean,
): T | Record<string, never> {
  if (!ACCESSIBILITY.respectReducedMotion) {
    return animation;
  }

  if (prefersReducedMotion) {
    // Return empty animation for reduced motion
    return {};
  }

  return animation;
}

/**
 * Gets duration respecting reduced motion preference
 *
 * @param duration - Normal animation duration in seconds
 * @param prefersReducedMotion - Whether reduced motion is preferred
 * @returns Duration respecting user preferences
 */
export function getAccessibleDuration(duration: number, prefersReducedMotion: boolean): number {
  if (prefersReducedMotion) {
    return ACCESSIBILITY.reducedMotionDuration;
  }

  return duration;
}

/**
 * Wraps an animation function to respect reduced motion
 *
 * @param animateFn - Animation function to wrap
 * @param prefersReducedMotion - Whether reduced motion is preferred
 * @returns Wrapped function that respects user preferences
 */
export function withReducedMotion<T extends unknown[], R>(
  animateFn: (...args: T) => R,
  prefersReducedMotion: boolean,
): (...args: T) => R | undefined {
  return (...args: T) => {
    if (prefersReducedMotion) {
      return undefined;
    }
    return animateFn(...args);
  };
}

// ============================================================================
// CSS Helpers
// ============================================================================

/**
 * CSS class to disable animations
 * Use this for container elements when reduced motion is preferred
 */
export const REDUCED_MOTION_CLASS = 'reduce-motion';

/**
 * CSS styles for reduced motion
 * Can be injected into the document or used in styled-components
 */
export const reducedMotionStyles = `
  .${REDUCED_MOTION_CLASS},
  .${REDUCED_MOTION_CLASS} *,
  .${REDUCED_MOTION_CLASS} *::before,
  .${REDUCED_MOTION_CLASS} *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

// ============================================================================
// Default Export
// ============================================================================

export default {
  useReducedMotion,
  getPrefersReducedMotion,
  isReducedMotionSupported,
  getAccessibleAnimation,
  getAccessibleDuration,
  withReducedMotion,
  REDUCED_MOTION_CLASS,
  reducedMotionStyles,
};
