import React, { useEffect, useRef, useState } from 'react';
import { animate, inView } from 'motion';
import { useReducedMotion } from '@/utils/reducedMotion';
import { DURATIONS, EASINGS } from '@/config/animation';

/**
 * Props for the AnimatedCounter component
 */
export interface AnimatedCounterProps {
  /** The value to count up to */
  value: number;
  /** Initial value to start from (default: 0) */
  from?: number;
  /** Duration of the animation in seconds (default: DURATIONS.slow) */
  duration?: number;
  /** Easing function (default: EASINGS.easeOut) */
  ease?: string | number[];
  /** Number of decimal places to display (default: 0) */
  decimals?: number;
  /** Text to display before the number (e.g., "$") */
  prefix?: string;
  /** Text to display after the number (e.g., "%", "+") */
  suffix?: string;
  /** Whether to trigger the animation only once (default: true) */
  once?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * AnimatedCounter Component
 *
 * An accessible count-up animation component that triggers when scrolled into view.
 * Supports integers, decimals, prefixes, and suffixes.
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  from = 0,
  duration = DURATIONS.slow,
  ease = EASINGS.easeOut,
  decimals = 0,
  prefix = '',
  suffix = '',
  once = true,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState(from);
  const elementRef = useRef<HTMLSpanElement>(null);
  const { prefersReducedMotion } = useReducedMotion();

  useEffect(() => {
    if (!elementRef.current) return;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const element = elementRef.current;

    const runAnimation = () => {
      animate(from, value, {
        duration,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ease: Array.isArray(ease) ? (ease as any) : ease,
        onUpdate: (latest) => {
          setDisplayValue(latest);
        },
      });
    };

    const cleanup = inView(
      element,
      () => {
        runAnimation();
        return once ? undefined : () => setDisplayValue(from);
      },
      { amount: 0.1 },
    );

    return () => cleanup();
  }, [value, from, duration, ease, once, prefersReducedMotion]);

  // Format the number with specified decimal places
  const formattedValue = displayValue.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={elementRef} className={className} aria-live="polite" data-testid="animated-counter">
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
