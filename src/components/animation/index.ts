/**
 * Animation Components & Hooks
 *
 * Centralized exports for animation system based on Motion One.
 *
 * @example
 * ```tsx
 * import { AnimatedElement, FadeInUp, useReducedMotion } from '@/components/animation';
 *
 * function MyComponent() {
 *   const { prefersReducedMotion } = useReducedMotion();
 *
 *   return (
 *     <FadeInUp triggerOnView>
 *       <h1>Hello World</h1>
 *     </FadeInUp>
 *   );
 * }
 * ```
 */

// Components
export {
  AnimatedElement,
  FadeIn,
  FadeInUp,
  ScaleIn,
  SlideUp,
  StaggerContainer,
  type AnimatedElementProps,
  type StaggerContainerProps,
} from './AnimatedElement';

export {
  ScrollReveal,
  RevealGrid,
  type ScrollRevealProps,
  type RevealGridProps,
} from './ScrollReveal';

// Hooks (re-exported from hooks directory)

export {
  useAnimation,
  useScrollAnimation,
  useInViewAnimation,
  usePresetAnimation,
  useHoverAnimation,
  useStaggerAnimation,
  useAnimationControls,
  type UseAnimationOptions,
  type AnimationControls,
} from '@/hooks/useAnimation';

// Utilities (re-exported from utils directory)
export {
  useReducedMotion,
  getPrefersReducedMotion,
  isReducedMotionSupported,
  getAccessibleAnimation,
  getAccessibleDuration,
  withReducedMotion,
  REDUCED_MOTION_CLASS,
  reducedMotionStyles,
  type ReducedMotionState,
} from '@/utils/reducedMotion';

// Configuration (re-exported from config directory)
export {
  DURATIONS,
  EASINGS,
  PRESETS,
  STAGGER,
  PERFORMANCE,
  ACCESSIBILITY,
  VARIANTS,
  type AnimationPreset,
  type StaggerConfig,
  type EasingDefinition,
} from '@/config/animation';
