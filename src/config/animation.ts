/**
 * Animation Configuration
 *
 * Centralized animation presets and configuration for Motion One.
 * All timing values are in seconds (Motion One standard).
 *
 * @see docs/research/ANIMATION_STRATEGY.md
 */

// ============================================================================
// Duration Constants
// ============================================================================

export const DURATIONS = {
  /** Instant feedback (micro-interactions) */
  instant: 0.1,
  /** Quick transitions (hover states) */
  fast: 0.15,
  /** Standard transitions (most UI animations) */
  normal: 0.3,
  /** Emphasis animations (entrances) */
  slow: 0.5,
  /** Dramatic animations (hero sections) */
  slower: 0.8,
  /** Ambient animations (continuous) */
  ambient: 15,
} as const;

// ============================================================================
// Easing Functions
// ============================================================================

/** Easing definition - either a bezier curve array or a named easing */
export type EasingDefinition = [number, number, number, number];

export const EASINGS: Record<string, EasingDefinition> = {
  /** Default ease - balanced acceleration/deceleration */
  default: [0.4, 0, 0.2, 1],
  /** Ease out - fast start, slow end (entrances) */
  easeOut: [0, 0, 0.2, 1],
  /** Ease in - slow start, fast end (exits) */
  easeIn: [0.4, 0, 1, 1],
  /** Ease in-out - symmetric (smooth transitions) */
  easeInOut: [0.4, 0, 0.2, 1],
  /** Spring - bouncy effect (playful interactions) */
  spring: [0.34, 1.56, 0.64, 1],
  /** Smooth - very gentle (subtle effects) */
  smooth: [0.25, 0.1, 0.25, 1],
};

// ============================================================================
// Animation Presets
// ============================================================================

export interface AnimationPreset {
  initial: Record<string, number | string | number[]>;
  animate: Record<string, number | string | number[]>;
  transition?: {
    duration?: number | undefined;
    ease?: EasingDefinition | undefined;
    delay?: number | undefined;
    staggerChildren?: number | undefined;
    delayChildren?: number | undefined;
  };
}

export const PRESETS: Record<string, AnimationPreset> = {
  /** Fade in - subtle opacity transition */
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOut },
  },

  /** Fade in up - entrance from below */
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOut },
  },

  /** Fade in down - entrance from above */
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOut },
  },

  /** Fade in left - entrance from right */
  fadeInLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOut },
  },

  /** Fade in right - entrance from left */
  fadeInRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOut },
  },

  /** Scale in - grow from small */
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: DURATIONS.normal, ease: EASINGS.spring },
  },

  /** Scale in up - grow and rise */
  scaleInUp: {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: DURATIONS.slow, ease: EASINGS.spring },
  },

  /** Slide up - vertical entrance */
  slideUp: {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: DURATIONS.slow, ease: EASINGS.easeOut },
  },

  /** Stagger children - for lists and grids */
  stagger: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },

  /** Pop - bouncy scale effect */
  pop: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: DURATIONS.slow, ease: EASINGS.spring },
  },

  /** Hero entrance - dramatic reveal */
  heroEntrance: {
    initial: { opacity: 0, y: 40, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: DURATIONS.slower, ease: EASINGS.easeOut },
  },

  /** Mockup entrance - scale and fade */
  mockupEntrance: {
    initial: { opacity: 0, scale: 0.9, x: 20 },
    animate: { opacity: 1, scale: 1, x: 0 },
    transition: { duration: DURATIONS.slower, ease: EASINGS.easeOut },
  },

  /** Card hover - subtle lift */
  cardHover: {
    initial: { y: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
    animate: { y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' },
    transition: { duration: DURATIONS.fast, ease: EASINGS.easeOut },
  },

  /** Button press - tactile feedback */
  buttonPress: {
    initial: { scale: 1 },
    animate: { scale: 0.97 },
    transition: { duration: DURATIONS.instant, ease: EASINGS.easeInOut },
  },

  /** Float - ambient floating effect */
  float: {
    initial: { y: 0 },
    animate: { y: -8 },
    transition: { duration: 3, ease: [0.4, 0, 0.2, 1] },
  },

  /** Pulse - attention drawing */
  pulse: {
    initial: { scale: 1 },
    animate: { scale: 1.05 },
    transition: { duration: 1, ease: [0.4, 0, 0.2, 1] },
  },

  /** Shake - error indication */
  shake: {
    initial: { x: 0 },
    animate: { x: [-5, 5, -5, 5, 0] },
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeInOut },
  },
};

// ============================================================================
// Visibility-First Animation Presets
// ============================================================================

/**
 * VISIBLE_PRESETS - Animation presets that start with visible elements.
 *
 * These presets are designed for scroll-triggered animations (whileInView) where
 * elements should remain visible by default to prevent the "disappearing on scroll" bug.
 *
 * Key differences from PRESETS:
 * - All initial states use `opacity: 1` instead of `opacity: 0`
 * - Elements start visible but still animate on scroll
 * - Use with `initial={false}` on motion components for best results
 *
 * @see AGENTS.md - Animation System - Scroll Animation Visibility Bug
 */
export const VISIBLE_PRESETS: Record<string, AnimationPreset> = {
  /** Fade in - subtle opacity transition (starts visible) */
  fadeIn: {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOut },
  },

  /** Fade in up - entrance from below (starts visible) */
  fadeInUp: {
    initial: { opacity: 1, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOut },
  },

  /** Fade in down - entrance from above (starts visible) */
  fadeInDown: {
    initial: { opacity: 1, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOut },
  },

  /** Fade in left - entrance from right (starts visible) */
  fadeInLeft: {
    initial: { opacity: 1, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOut },
  },

  /** Fade in right - entrance from left (starts visible) */
  fadeInRight: {
    initial: { opacity: 1, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOut },
  },

  /** Scale in - grow from small (starts visible) */
  scaleIn: {
    initial: { opacity: 1, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: DURATIONS.normal, ease: EASINGS.spring },
  },

  /** Scale in up - grow and rise (starts visible) */
  scaleInUp: {
    initial: { opacity: 1, scale: 0.95, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: DURATIONS.slow, ease: EASINGS.spring },
  },

  /** Slide up - vertical entrance (starts visible) */
  slideUp: {
    initial: { y: 30, opacity: 1 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: DURATIONS.slow, ease: EASINGS.easeOut },
  },

  /** Stagger children - for lists and grids (starts visible) */
  stagger: {
    initial: { opacity: 1, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },

  /** Pop - bouncy scale effect (starts visible) */
  pop: {
    initial: { scale: 0.8, opacity: 1 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: DURATIONS.slow, ease: EASINGS.spring },
  },

  /** Hero entrance - dramatic reveal (starts visible) */
  heroEntrance: {
    initial: { opacity: 1, y: 40, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: DURATIONS.slower, ease: EASINGS.easeOut },
  },

  /** Mockup entrance - scale and fade (starts visible) */
  mockupEntrance: {
    initial: { opacity: 1, scale: 0.9, x: 20 },
    animate: { opacity: 1, scale: 1, x: 0 },
    transition: { duration: DURATIONS.slower, ease: EASINGS.easeOut },
  },
};

// ============================================================================
// Stagger Configuration
// ============================================================================

export interface StaggerConfig {
  staggerChildren: number;
  delayChildren: number;
}

export const STAGGER: Record<string, StaggerConfig> = {
  /** Fast stagger - quick succession */
  fast: { staggerChildren: 0.05, delayChildren: 0 },
  /** Normal stagger - balanced timing */
  normal: { staggerChildren: 0.1, delayChildren: 0.1 },
  /** Slow stagger - dramatic reveal */
  slow: { staggerChildren: 0.15, delayChildren: 0.2 },
  /** Hero stagger - dramatic entrance */
  hero: { staggerChildren: 0.2, delayChildren: 0.3 },
};

// ============================================================================
// Performance Configuration
// ============================================================================

export const PERFORMANCE = {
  /** Use GPU acceleration for these properties */
  gpuAccelerated: ['transform', 'opacity'],
  /** Will-change properties for optimization */
  willChange: ['transform', 'opacity'],
  /** Maximum animation budget (ms) per frame */
  frameBudget: 16.67, // 60fps
} as const;

// ============================================================================
// Accessibility Configuration
// ============================================================================

export const ACCESSIBILITY = {
  /** Respect prefers-reduced-motion */
  respectReducedMotion: true,
  /** Minimum animation duration when reduced motion is on */
  reducedMotionDuration: 0.01,
  /** Instant transitions for reduced motion */
  instantTransition: { duration: 0.01 },
} as const;

// ============================================================================
// Animation Variants for Framer Motion Compatibility
// ============================================================================

export const VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
} as const;

// ============================================================================
// Default Export
// ============================================================================

export default {
  DURATIONS,
  EASINGS,
  PRESETS,
  VISIBLE_PRESETS,
  STAGGER,
  PERFORMANCE,
  ACCESSIBILITY,
  VARIANTS,
};
