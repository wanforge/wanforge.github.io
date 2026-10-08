/**
 * AnimatedElement Component
 *
 * A declarative wrapper around Motion One for React components.
 * Supports presets, custom animations, scroll triggers, and reduced motion.
 *
 * @see docs/research/ANIMATION_STRATEGY.md
 */

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { type AnimationOptions, type Easing, animate, inView } from 'motion';
import { getAccessibleDuration, useReducedMotion } from '@/utils/reducedMotion';
import { DURATIONS, EASINGS, type EasingDefinition, PRESETS } from '@/config/animation';
import { cn } from '@/utils/cn';

// ============================================================================
// Types
// ============================================================================

type HTMLIntrinsicElements = keyof React.JSX.IntrinsicElements;

export interface AnimatedElementProps extends React.HTMLAttributes<HTMLElement> {
  /** HTML element to render */
  as?: HTMLIntrinsicElements;
  /** Animation preset name */
  preset?: keyof typeof PRESETS;
  /** Custom keyframes for animation */
  keyframes?: Record<string, unknown[]>;
  /** Animation duration in seconds */
  duration?: number;
  /** Animation easing (bezier array) */
  ease?: EasingDefinition;
  /** Delay before animation starts */
  delay?: number;
  /** Trigger animation when element comes into view */
  triggerOnView?: boolean;
  /** Only animate once (vs every time element enters view) */
  once?: boolean;
  /** Threshold for intersection observer (0-1) */
  threshold?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Transform origin for scale/rotate animations */
  transformOrigin?: string;
  /** Children to render inside */
  children?: React.ReactNode;
  /** CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

// ============================================================================
// Component
// ============================================================================

export const AnimatedElement = forwardRef<HTMLElement, AnimatedElementProps>(
  (
    {
      as: Component = 'div',
      preset,
      keyframes,
      duration = DURATIONS.normal,
      ease = EASINGS.easeOut,
      delay = 0,
      triggerOnView = false,
      once = true,
      threshold = 0.1,
      rootMargin,
      transformOrigin = 'center',
      children,
      className,
      style,
      ...props
    },
    forwardedRef,
  ) => {
    const internalRef = useRef<HTMLElement>(null);
    const elementRef = (forwardedRef || internalRef) as React.RefObject<HTMLElement>;
    const { prefersReducedMotion } = useReducedMotion();
    const [hasAnimated, setHasAnimated] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Handle reduced motion
      if (prefersReducedMotion) {
        // Set final state immediately
        if (preset && PRESETS[preset]) {
          const presetConfig = PRESETS[preset];
          Object.entries(presetConfig.animate).forEach(([key, value]) => {
            if (typeof value === 'number' || typeof value === 'string') {
              (element.style as unknown as Record<string, string>)[key] = String(value);
            }
          });
        } else if (keyframes) {
          Object.entries(keyframes).forEach(([key, values]) => {
            const lastValue = values[values.length - 1];
            if (typeof lastValue === 'number' || typeof lastValue === 'string') {
              (element.style as unknown as Record<string, string>)[key] = String(lastValue);
            }
          });
        }
        return undefined;
      }

      // Set transform origin
      element.style.transformOrigin = transformOrigin;

      // Build animation configuration
      const animationOptions: AnimationOptions = {
        duration: getAccessibleDuration(duration, prefersReducedMotion),
        ease: ease as Easing,
        delay,
      };

      // Determine keyframes to use
      let finalKeyframes: Record<string, unknown[]>;

      if (preset && PRESETS[preset]) {
        const presetConfig = PRESETS[preset];
        finalKeyframes = {};
        Object.entries(presetConfig.initial).forEach(([key]) => {
          finalKeyframes[key] = [presetConfig.initial[key], presetConfig.animate[key]];
        });
        // Use preset duration/ease if not overridden
        if (duration === DURATIONS.normal && presetConfig.transition?.duration) {
          animationOptions.duration = presetConfig.transition.duration;
        }
        if (ease === EASINGS.easeOut && presetConfig.transition?.ease) {
          animationOptions.ease = presetConfig.transition.ease as Easing;
        }
      } else if (keyframes) {
        finalKeyframes = keyframes;
      } else {
        // Default fade in
        finalKeyframes = { opacity: [0, 1] };
      }

      // Helper to apply final keyframe values for visibility preservation
      const applyFinalState = () => {
        Object.entries(finalKeyframes).forEach(([key, values]) => {
          const lastValue = values[values.length - 1];
          if (typeof lastValue === 'number' || typeof lastValue === 'string') {
            (element.style as unknown as Record<string, string>)[key] = String(lastValue);
          }
        });
        // Ensure visibility is preserved
        element.style.visibility = 'visible';
      };

      // Run animation
      const runAnimation = () => {
        setIsAnimating(true);
        const animation = animate(element, finalKeyframes, animationOptions);

        // Listen for animation completion
        if (animation && typeof animation.finished !== 'undefined') {
          animation.finished
            .then(() => {
              setIsAnimating(false);
              setHasAnimated(true);
            })
            .catch(() => {
              // Animation was cancelled or interrupted
              setIsAnimating(false);
            });
        } else {
          // Fallback for browsers that don't support animation.finished
          setTimeout(
            () => {
              setIsAnimating(false);
              setHasAnimated(true);
            },
            (animationOptions.duration as number) * 1000 + 100,
          );
        }

        return animation;
      };

      if (triggerOnView) {
        const cleanup = inView(
          element,
          () => {
            runAnimation();
            // Return cleanup that preserves final state, not resets it
            return once
              ? undefined
              : () => {
                  applyFinalState();
                };
          },
          {
            // Adjust threshold for better trigger points
            amount: Math.max(0.05, threshold),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            margin: rootMargin as any,
          },
        );

        return () => cleanup();
      } else {
        runAnimation();
      }

      return () => {
        // Preserve final state on unmount
        applyFinalState();
      };
    }, [
      preset,
      keyframes,
      duration,
      ease,
      delay,
      triggerOnView,
      once,
      threshold,
      rootMargin,
      transformOrigin,
      prefersReducedMotion,
      elementRef,
    ]);

    const initialStyles = React.useMemo(() => {
      if (!preset || !PRESETS[preset]) return {};
      const presetConfig = PRESETS[preset];
      const styles: Record<string, string | number> = {};
      const transforms: string[] = [];

      Object.entries(presetConfig.initial).forEach(([key, value]) => {
        if (key === 'x')
          transforms.push(`translateX(${typeof value === 'number' ? value + 'px' : value})`);
        else if (key === 'y')
          transforms.push(`translateY(${typeof value === 'number' ? value + 'px' : value})`);
        else if (key === 'scale') transforms.push(`scale(${value})`);
        else if (key === 'rotate')
          transforms.push(`rotate(${typeof value === 'number' ? value + 'deg' : value})`);
        else if (typeof value === 'number' || typeof value === 'string') {
          styles[key] = value;
        }
      });

      if (transforms.length > 0) {
        styles.transform = transforms.join(' ');
      }

      return styles;
    }, [preset]);

    // Determine if content should be hidden from screen readers during animation
    // Only hide if element hasn't animated yet and reduced motion is not preferred
    const ariaHidden = isAnimating && !hasAnimated && !prefersReducedMotion ? undefined : undefined;

    // Build animation safeguard classes
    const animationClasses = cn(
      // Apply will-change during animation for performance
      isAnimating && 'animate-will-change',
      // Apply visibility safeguard after animation completes
      (hasAnimated || prefersReducedMotion) && 'animate-visible-safeguard',
      // Apply reduced motion visibility
      prefersReducedMotion && 'animate-reduced-motion-visible',
      className,
    );

    return React.createElement(
      Component,
      {
        ref: elementRef,
        className: animationClasses,
        style: { ...initialStyles, ...style },
        'aria-hidden': ariaHidden,
        ...props,
      },
      children,
    );
  },
);

AnimatedElement.displayName = 'AnimatedElement';

// ============================================================================
// Convenience Components
// ============================================================================

/** Fade in animation wrapper */
export const FadeIn = forwardRef<HTMLElement, Omit<AnimatedElementProps, 'preset'>>(
  (props, ref) => <AnimatedElement ref={ref} preset="fadeIn" {...props} />,
);
FadeIn.displayName = 'FadeIn';

/** Fade in from bottom */
export const FadeInUp = forwardRef<HTMLElement, Omit<AnimatedElementProps, 'preset'>>(
  (props, ref) => <AnimatedElement ref={ref} preset="fadeInUp" {...props} />,
);
FadeInUp.displayName = 'FadeInUp';

/** Scale in animation wrapper */
export const ScaleIn = forwardRef<HTMLElement, Omit<AnimatedElementProps, 'preset'>>(
  (props, ref) => <AnimatedElement ref={ref} preset="scaleIn" {...props} />,
);
ScaleIn.displayName = 'ScaleIn';

/** Slide up animation wrapper */
export const SlideUp = forwardRef<HTMLElement, Omit<AnimatedElementProps, 'preset'>>(
  (props, ref) => <AnimatedElement ref={ref} preset="slideUp" {...props} />,
);
SlideUp.displayName = 'SlideUp';

/** Stagger container for child animations */
export interface StaggerContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Delay between each child animation */
  staggerDelay?: number;
  /** Initial delay before first child */
  initialDelay?: number;
  /** Animation preset for children */
  childPreset?: keyof typeof PRESETS;
  /** Custom keyframes for children */
  childKeyframes?: Record<string, unknown[]>;
  /** Trigger when container comes into view */
  triggerOnView?: boolean;
  /** Only animate once */
  once?: boolean;
  /** Threshold for intersection observer (0-1) */
  threshold?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
  children: React.ReactNode;
}

export const StaggerContainer = forwardRef<HTMLDivElement, StaggerContainerProps>(
  (
    {
      staggerDelay = 0.1,
      initialDelay = 0,
      childPreset = 'fadeInUp',
      childKeyframes,
      triggerOnView = true,
      once = true,
      threshold = 0.1,
      rootMargin,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const resolvedRef = (ref || containerRef) as React.RefObject<HTMLDivElement>;
    const { prefersReducedMotion } = useReducedMotion();
    const [hasAnimated, setHasAnimated] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
      const container = resolvedRef.current;
      if (!container) return undefined;

      const childElements = Array.from(container.children) as HTMLElement[];

      // Helper to apply final keyframe values to all children
      const applyFinalStateToChildren = () => {
        childElements.forEach((child) => {
          let finalKeyframes: Record<string, unknown[]>;

          if (childKeyframes) {
            finalKeyframes = childKeyframes;
          } else {
            const preset = PRESETS[childPreset];
            if (!preset) return;
            finalKeyframes = {};
            Object.entries(preset.initial).forEach(([key]) => {
              finalKeyframes[key] = [preset.initial[key], preset.animate[key]];
            });
          }

          Object.entries(finalKeyframes).forEach(([key, values]) => {
            const lastValue = values[values.length - 1];
            if (typeof lastValue === 'number' || typeof lastValue === 'string') {
              (child.style as unknown as Record<string, string>)[key] = String(lastValue);
            }
          });
          // Ensure visibility is preserved
          child.style.visibility = 'visible';
        });
      };

      if (prefersReducedMotion) {
        // Set final state immediately
        applyFinalStateToChildren();
        return undefined;
      }

      const runAnimations = () => {
        setIsAnimating(true);
        const totalDuration =
          DURATIONS.normal + (childElements.length - 1) * staggerDelay + initialDelay;

        childElements.forEach((child, index) => {
          let finalKeyframes: Record<string, unknown[]>;

          if (childKeyframes) {
            finalKeyframes = childKeyframes;
          } else {
            const preset = PRESETS[childPreset];
            if (!preset) return;
            finalKeyframes = {};
            Object.entries(preset.initial).forEach(([key]) => {
              finalKeyframes[key] = [preset.initial[key], preset.animate[key]];
            });
          }

          const delay = initialDelay + index * staggerDelay;

          animate(child, finalKeyframes, {
            duration: DURATIONS.normal,
            ease: EASINGS.easeOut as Easing,
            delay,
          });
        });

        // Set animation complete after all children have animated
        setTimeout(
          () => {
            setIsAnimating(false);
            setHasAnimated(true);
          },
          totalDuration * 1000 + 100,
        );
      };

      if (triggerOnView) {
        const cleanup = inView(
          container,
          () => {
            runAnimations();
            // Return cleanup that preserves final state
            return once
              ? undefined
              : () => {
                  applyFinalStateToChildren();
                };
          },
          {
            // Adjust threshold for better trigger points
            amount: Math.max(0.05, threshold),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            margin: rootMargin as any,
          },
        );
        return () => cleanup();
      } else {
        runAnimations();
      }

      return () => {
        // Preserve final state on unmount
        applyFinalStateToChildren();
      };
    }, [
      childPreset,
      childKeyframes,
      staggerDelay,
      initialDelay,
      triggerOnView,
      once,
      prefersReducedMotion,
      resolvedRef,
    ]);

    // Build animation safeguard classes
    const animationClasses = cn(
      // Apply will-change during animation for performance
      isAnimating && 'animate-will-change',
      // Apply visibility safeguard after animation completes
      (hasAnimated || prefersReducedMotion) && 'animate-visible-safeguard',
      // Apply reduced motion visibility
      prefersReducedMotion && 'animate-reduced-motion-visible',
      className,
    );

    return (
      <div ref={resolvedRef} className={animationClasses} {...props}>
        {children}
      </div>
    );
  },
);

StaggerContainer.displayName = 'StaggerContainer';

// ============================================================================
// Default Export
// ============================================================================

export default AnimatedElement;
