/**
 * Animation Hooks
 *
 * React hooks for Motion One animations with reduced motion support.
 * Provides declarative API for scroll-triggered and interaction animations.
 *
 * @see docs/research/ANIMATION_STRATEGY.md
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { type AnimationPlaybackControls, type Easing, animate, inView, scroll } from 'motion';
import { getAccessibleDuration, useReducedMotion } from '@/utils/reducedMotion';
import { DURATIONS, EASINGS, type EasingDefinition, PRESETS } from '@/config/animation';

// ============================================================================
// Types
// ============================================================================

export interface UseAnimationOptions {
  /** Whether to play animation only once */
  once?: boolean | undefined;
  /** Delay before animation starts (in seconds) */
  delay?: number | undefined;
  /** Trigger animation when element comes into view */
  triggerOnView?: boolean | undefined;
  /** Root margin for intersection observer (px) */
  rootMargin?: string | undefined;
  /** Threshold for intersection observer (0-1) */
  threshold?: number | undefined;
  /** Animation duration in seconds */
  duration?: number | undefined;
  /** Easing function */
  ease?: EasingDefinition | undefined;
}

export interface AnimationControls {
  /** Play the animation */
  play: () => void;
  /** Pause the animation */
  pause: () => void;
  /** Stop and reset the animation */
  stop: () => void;
  /** Reverse the animation */
  reverse: () => void;
  /** Whether the animation is currently playing */
  isPlaying: boolean;
}

// ============================================================================
// Basic Animation Hook
// ============================================================================

/**
 * Hook for declarative Motion One animations
 *
 * Usage:
 * ```tsx
 * const ref = useAnimation(
 *   { opacity: [0, 1], y: [20, 0] },
 *   { duration: 0.5 }
 * );
 *
 * return <div ref={ref}>Animated content</div>;
 * ```
 */
export function useAnimation(
  keyframes: Record<string, unknown[]>,
  options: UseAnimationOptions = {},
): React.RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement>(null);
  const { prefersReducedMotion } = useReducedMotion();
  const animationRef = useRef<AnimationPlaybackControls | null>(null);

  const {
    once = false,
    delay = 0,
    triggerOnView = false,
    threshold = 0.1,
    duration = DURATIONS.normal,
    ease = EASINGS.easeOut,
  } = options;

  useEffect(() => {
    if (!ref.current) return undefined;

    const element = ref.current;

    // Respect reduced motion
    if (prefersReducedMotion) {
      // Set final state immediately
      Object.entries(keyframes).forEach(([key, values]) => {
        const lastValue = values[values.length - 1];
        if (typeof lastValue === 'number' || typeof lastValue === 'string') {
          (element.style as unknown as Record<string, string>)[key] = String(lastValue);
        }
      });
      return undefined;
    }

    const finalDuration = getAccessibleDuration(duration, prefersReducedMotion);

    // Helper to apply final keyframe values for visibility preservation
    const applyFinalState = () => {
      Object.entries(keyframes).forEach(([key, values]) => {
        const lastValue = values[values.length - 1];
        if (typeof lastValue === 'number' || typeof lastValue === 'string') {
          (element.style as unknown as Record<string, string>)[key] = String(lastValue);
        }
      });
      // Ensure visibility is preserved
      element.style.visibility = 'visible';
    };

    const runAnimation = () => {
      animationRef.current = animate(element, keyframes, {
        duration: finalDuration,
        ease: ease as Easing,
        delay,
      });
    };

    if (triggerOnView) {
      // Use Motion One's inView for scroll triggering
      const cleanup = inView(
        element,
        () => {
          runAnimation();
          // Return cleanup if once is false - preserve final state, don't reset
          return once
            ? undefined
            : () => {
                // Preserve final animated state instead of stopping/reverting
                applyFinalState();
              };
        },
        {
          amount: threshold,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          margin: options.rootMargin as any,
        },
      );

      return () => cleanup();
    } else {
      runAnimation();
    }

    return () => {
      // Preserve final state on unmount instead of stopping
      applyFinalState();
    };
  }, [
    keyframes,
    options,
    prefersReducedMotion,
    duration,
    ease,
    delay,
    once,
    threshold,
    triggerOnView,
  ]);

  return ref;
}

// ============================================================================
// Scroll Animation Hook
// ============================================================================

/**
 * Hook for scroll-linked animations
 *
 * Usage:
 * ```tsx
 * const ref = useScrollAnimation(
 *   { opacity: [0.5, 1], scale: [0.9, 1] },
 * );
 *
 * return <div ref={ref}>Scroll animated content</div>;
 * ```
 */
export function useScrollAnimation(
  keyframes: Record<string, unknown[]>,
): React.RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement>(null);
  const { prefersReducedMotion } = useReducedMotion();

  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return undefined;

    const element = ref.current;

    const cleanup = scroll(animate(element, keyframes), {
      target: element,
      offset: ['start end', 'end start'] as const,
    });

    return () => cleanup();
  }, [keyframes, prefersReducedMotion]);

  return ref;
}

// ============================================================================
// In View Animation Hook
// ============================================================================

/**
 * Hook for triggering animations when element enters viewport
 *
 * Usage:
 * ```tsx
 * const { ref, isInView } = useInViewAnimation({ threshold: 0.3 });
 *
 * return (
 *   <div ref={ref}>
 *     {isInView && <motion.div animate={{ opacity: 1 }} />}
 *   </div>
 * );
 * ```
 */
export function useInViewAnimation(
  options: {
    threshold?: number;
    once?: boolean;
    rootMargin?: string;
  } = {},
) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const { threshold = 0.1, once = true } = options;

  useEffect(() => {
    if (!ref.current) return undefined;

    const element = ref.current;

    const cleanup = inView(
      element,
      () => {
        setIsInView(true);
        if (!once) {
          return () => setIsInView(false);
        }
        return undefined;
      },
      {
        amount: threshold,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        margin: options.rootMargin as any,
      },
    );

    return () => cleanup();
  }, [threshold, once]);

  return { ref, isInView };
}

// ============================================================================
// Preset Animation Hook
// ============================================================================

/**
 * Hook for using preset animations
 *
 * Usage:
 * ```tsx
 * const ref = usePresetAnimation('fadeInUp', { delay: 0.2 });
 * return <div ref={ref}>Fades in from below</div>;
 * ```
 */
export function usePresetAnimation(
  presetName: keyof typeof PRESETS,
  options: UseAnimationOptions = {},
): React.RefObject<HTMLElement | null> {
  const preset = PRESETS[presetName];

  if (!preset) {
    console.warn(`Animation preset "${presetName}" not found`);
    return useRef<HTMLElement>(null);
  }

  const keyframes: Record<string, unknown[]> = {};

  // Convert preset to keyframes format
  Object.entries(preset.initial).forEach(([key]) => {
    keyframes[key] = [preset.initial[key], preset.animate[key]];
  });

  return useAnimation(keyframes, {
    ...options,
    duration: options.duration ?? preset.transition?.duration,
    ease: options.ease ?? preset.transition?.ease,
  });
}

// ============================================================================
// Hover Animation Hook
// ============================================================================

/**
 * Hook for hover-triggered animations
 *
 * Usage:
 * ```tsx
 * const { ref, isHovered, bind } = useHoverAnimation();
 *
 * return (
 *   <div ref={ref} {...bind}>
 *     <motion.div animate={{ scale: isHovered ? 1.05 : 1 }} />
 *   </div>
 * );
 * ```
 */
export function useHoverAnimation() {
  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { prefersReducedMotion } = useReducedMotion();

  const bind = {
    onMouseEnter: () => !prefersReducedMotion && setIsHovered(true),
    onMouseLeave: () => !prefersReducedMotion && setIsHovered(false),
    onFocus: () => !prefersReducedMotion && setIsHovered(true),
    onBlur: () => !prefersReducedMotion && setIsHovered(false),
  };

  return { ref, isHovered, bind };
}

// ============================================================================
// Stagger Animation Hook
// ============================================================================

/**
 * Hook for staggered children animations
 *
 * Usage:
 * ```tsx
 * const containerRef = useStaggerAnimation([
 *   { y: [20, 0], opacity: [0, 1] },
 *   { y: [20, 0], opacity: [0, 1] },
 * ], { staggerDelay: 0.1 });
 *
 * return (
 *   <div ref={containerRef}>
 *     <div>Child 1</div>
 *     <div>Child 2</div>
 *   </div>
 * );
 * ```
 */
export function useStaggerAnimation(
  keyframesList: Record<string, unknown[]>[],
  options: {
    staggerDelay?: number;
    initialDelay?: number;
    triggerOnView?: boolean;
    threshold?: number;
    rootMargin?: string;
  } = {},
): React.RefObject<HTMLDivElement | null> {
  const containerRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useReducedMotion();
  const {
    staggerDelay = 0.1,
    initialDelay = 0,
    triggerOnView = true,
    threshold = 0.1,
    rootMargin,
  } = options;

  useEffect(() => {
    if (!containerRef.current) return undefined;

    const container = containerRef.current;
    const children = Array.from(container.children) as HTMLElement[];

    if (prefersReducedMotion) {
      // Set final state immediately for all children
      children.forEach((child, index) => {
        const keyframes = keyframesList[index] ?? keyframesList[0];
        if (!keyframes) return;
        Object.entries(keyframes).forEach(([key, values]) => {
          const lastValue = values[values.length - 1];
          if (typeof lastValue === 'number' || typeof lastValue === 'string') {
            (child.style as unknown as Record<string, string>)[key] = String(lastValue);
          }
        });
      });
      return undefined;
    }

    const runAnimations = () => {
      children.forEach((child, index) => {
        const keyframes = keyframesList[index] ?? keyframesList[0];
        if (!keyframes) return;
        const delay = initialDelay + index * staggerDelay;

        animate(child, keyframes, {
          duration: DURATIONS.normal,
          ease: EASINGS.easeOut as Easing,
          delay,
        });
      });
    };

    if (triggerOnView) {
      const cleanup = inView(container, runAnimations, {
        amount: threshold,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        margin: rootMargin as any,
      });
      return () => cleanup();
    } else {
      runAnimations();
    }

    return undefined;
  }, [
    keyframesList,
    staggerDelay,
    initialDelay,
    triggerOnView,
    threshold,
    rootMargin,
    prefersReducedMotion,
  ]);

  return containerRef;
}

// ============================================================================
// Animation Controls Hook
// ============================================================================

/**
 * Hook for manual animation control
 *
 * Usage:
 * ```tsx
 * const { ref, controls } = useAnimationControls(
 *   { opacity: [0, 1] },
 *   { duration: 0.5 }
 * );
 *
 * return (
 *   <>
 *     <button onClick={controls.play}>Play</button>
 *     <div ref={ref}>Animated content</div>
 *   </>
 * );
 * ```
 */
export function useAnimationControls(
  keyframes: Record<string, unknown[]>,
  options: { duration?: number; ease?: EasingDefinition; delay?: number } = {},
): {
  ref: React.RefObject<HTMLElement | null>;
  controls: AnimationControls;
} {
  const ref = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef<AnimationPlaybackControls | null>(null);
  const { prefersReducedMotion } = useReducedMotion();
  const { duration = DURATIONS.normal, ease = EASINGS.easeOut, delay = 0 } = options;

  const createAnimation = useCallback(() => {
    if (!ref.current || prefersReducedMotion) return null;

    const finalDuration = getAccessibleDuration(duration, prefersReducedMotion);

    return animate(ref.current, keyframes, {
      duration: finalDuration,
      ease: ease as Easing,
      delay,
    });
  }, [keyframes, duration, ease, delay, prefersReducedMotion]);

  const controls: AnimationControls = {
    play: () => {
      if (!animationRef.current) {
        animationRef.current = createAnimation();
      }
      animationRef.current?.play();
      setIsPlaying(true);
    },
    pause: () => {
      animationRef.current?.pause();
      setIsPlaying(false);
    },
    stop: () => {
      animationRef.current?.stop();
      setIsPlaying(false);
    },
    reverse: () => {
      // Note: AnimationPlaybackControls doesn't have a reverse method in Motion One
      // This would need to be implemented by reversing the keyframes manually
      console.warn('reverse() not implemented in Motion One AnimationPlaybackControls');
    },
    isPlaying,
  };

  useEffect(() => {
    return () => {
      animationRef.current?.stop();
    };
  }, []);

  return { ref, controls };
}

// ============================================================================
// Default Export
// ============================================================================

export default {
  useAnimation,
  useScrollAnimation,
  useInViewAnimation,
  usePresetAnimation,
  useHoverAnimation,
  useStaggerAnimation,
  useAnimationControls,
};
