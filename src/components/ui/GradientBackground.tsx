import * as React from 'react';
import { useRef } from 'react';
import { useReducedMotion } from '@/utils/reducedMotion';

/**
 * Props for the GradientBackground component
 */
export interface GradientBackgroundProps {
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  /**
   * Variant of gradient pattern
   * @default 'default'
   */
  variant?: 'default' | 'minimal' | 'soft' | 'deep';
  /**
   * Enable subtle ambient animation
   * @default true
   */
  animated?: boolean;
  /**
   * Intensity of the gradient effect (0-1)
   * @default 0.4
   */
  intensity?: number;
  /**
   * Whether to apply a vignette for depth
   * @default true
   */
  vignette?: boolean;
  /**
   * Custom aria-label for accessibility
   */
  'aria-label'?: string;
  /**
   * Optional ID for deterministic animation keys (useful for snapshots)
   */
  id?: string;
}

/**
 * GradientBackground Component
 *
 * A refined, elegant gradient background component with a sophisticated aesthetic.
 * Features soft ambient glows, minimal animations, and a clean, professional look
 * perfect for modern SaaS applications.
 *
 * Design Philosophy:
 * - Less is more: Fewer, larger gradient elements for visual breathing room
 * - Soft transitions: Subtle color bleeding instead of harsh blob shapes
 * - Performance: Minimal DOM elements and efficient CSS animations
 * - Elegance: Deep, rich colors in dark mode; soft, airy tones in light mode
 *
 * Features:
 * - Four distinct variants: default, minimal, soft, and deep
 * - Theme-aware gradients optimized for light and dark modes
 * - Subtle breathing animation with reduced motion support
 * - Optional vignette overlay for depth and focus
 * - GPU-accelerated animations for smooth performance
 * - Optimized for View Transitions - no style injection, uses CSS transforms
 *
 * @example
 * ```tsx
 * // Default elegant glow
 * <GradientBackground />
 *
 * // Minimal for content sections
 * <GradientBackground variant="minimal" intensity={0.2} />
 *
 * // Soft pastel glow
 * <GradientBackground variant="soft" intensity={0.5} />
 *
 * // Deep rich tones for dark hero sections
 * <GradientBackground variant="deep" intensity={0.6} />
 *
 * // Static background
 * <GradientBackground animated={false} />
 * ```
 */
export function GradientBackground({
  className = '',
  variant = 'default',
  animated = true,
  intensity = 0.4,
  vignette = true,
  'aria-label': ariaLabel = 'Decorative gradient background',
  id: _id,
}: GradientBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useReducedMotion();

  // Normalize intensity to 0.1 - 0.8 range
  const baseOpacity = Math.max(0.1, Math.min(0.8, intensity));
  const shouldAnimate = animated && !prefersReducedMotion;

  // Variant-specific gradient configurations
  const getVariantStyles = () => {
    const variants = {
      default: {
        light: {
          primary: 'from-primary-200/60 via-primary-100/40 to-transparent',
          secondary: 'from-secondary-200/50 via-secondary-100/30 to-transparent',
          accent: 'from-accent-200/40 via-accent-100/20 to-transparent',
        },
        dark: {
          primary: 'from-primary-900/40 via-primary-800/20 to-transparent',
          secondary: 'from-secondary-900/35 via-secondary-800/15 to-transparent',
          accent: 'from-accent-900/30 via-accent-800/10 to-transparent',
        },
      },
      minimal: {
        light: {
          primary: 'from-primary-100/40 via-primary-50/20 to-transparent',
          secondary: 'from-secondary-100/30 via-secondary-50/15 to-transparent',
          accent: 'transparent',
        },
        dark: {
          primary: 'from-primary-950/30 via-primary-900/10 to-transparent',
          secondary: 'from-secondary-950/25 via-secondary-900/8 to-transparent',
          accent: 'transparent',
        },
      },
      soft: {
        light: {
          primary: 'from-primary-100/70 via-secondary-50/50 to-accent-50/30',
          secondary: 'from-secondary-100/60 via-accent-50/40 to-primary-50/20',
          accent: 'from-accent-100/50 via-primary-50/30 to-secondary-50/20',
        },
        dark: {
          primary: 'from-primary-900/50 via-secondary-900/30 to-accent-900/20',
          secondary: 'from-secondary-900/45 via-accent-900/25 to-primary-900/15',
          accent: 'from-accent-900/35 via-primary-900/20 to-secondary-900/10',
        },
      },
      deep: {
        light: {
          primary: 'from-primary-300/50 via-primary-200/30 to-primary-100/20',
          secondary: 'from-secondary-300/45 via-secondary-200/25 to-secondary-100/15',
          accent: 'from-accent-300/35 via-accent-200/20 to-accent-100/10',
        },
        dark: {
          primary: 'from-primary-800/60 via-primary-700/35 to-primary-900/20',
          secondary: 'from-secondary-800/55 via-secondary-700/30 to-secondary-900/15',
          accent: 'from-accent-800/45 via-accent-700/25 to-accent-900/10',
        },
      },
    };
    return variants[variant] ?? variants.default;
  };

  const variantStyles = getVariantStyles();

  // Get animation styles using CSS custom properties - no style injection!
  const getAnimationStyle = (
    animationType: 'primary' | 'secondary' | 'accent',
  ): React.CSSProperties => {
    if (!shouldAnimate) return {};

    const durations = {
      primary: '20s',
      secondary: '25s',
      accent: '18s',
    };

    const delays = {
      primary: '0s',
      secondary: '-8s',
      accent: '-4s',
    };

    // Use pre-defined animation classes with CSS variables for timing
    return {
      animationName: `gradient-breathe-${animationType}`,
      animationDuration: durations[animationType],
      animationDelay: delays[animationType],
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
    };
  };

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-label={ariaLabel}
      role="img"
    >
      {/* Global animation styles - injected once via CSS, not JS */}
      {shouldAnimate && (
        <style>{`
          @keyframes gradient-breathe-primary {
            0%, 100% { transform: scale(1) translate(0, 0); opacity: 1; }
            33% { transform: scale(1.05) translate(2%, -1%); opacity: 0.95; }
            66% { transform: scale(0.98) translate(-1%, 2%); opacity: 1.02; }
          }
          @keyframes gradient-breathe-secondary {
            0%, 100% { transform: scale(1) translate(0, 0); }
            50% { transform: scale(1.08) translate(-3%, 3%); }
          }
          @keyframes gradient-breathe-accent {
            0%, 100% { transform: scale(1) translate(0, 0); opacity: 1; }
            50% { transform: scale(0.95) translate(2%, -2%); opacity: 0.9; }
          }
        `}</style>
      )}

      {/* Light Mode - Soft Elegant Glows */}
      <div
        className="absolute inset-0 opacity-100 transition-opacity duration-700 dark:opacity-0"
        style={{ opacity: baseOpacity }}
      >
        {/* Primary glow - top right */}
        <div
          className={`absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-bl ${variantStyles.light.primary} blur-[80px]`}
          style={getAnimationStyle('primary')}
        />
        {/* Secondary glow - bottom left */}
        <div
          className={`absolute -bottom-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr ${variantStyles.light.secondary} blur-[60px]`}
          style={getAnimationStyle('secondary')}
        />
        {/* Accent glow - center */}
        {variant !== 'minimal' && (
          <div
            className={`absolute top-[30%] left-[30%] w-[50%] h-[50%] rounded-full bg-gradient-to-br ${variantStyles.light.accent} blur-[40px]`}
            style={getAnimationStyle('accent')}
          />
        )}
        {/* Soft radial overlay for cohesion */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 80% at 50% 50%, transparent 0%, rgba(255,255,255,0.4) 100%)`,
          }}
        />
      </div>

      {/* Dark Mode - Deep Rich Tones */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-700 dark:opacity-100"
        style={{ opacity: baseOpacity }}
      >
        {/* Primary deep glow - top */}
        <div
          className={`absolute -top-[30%] left-[10%] w-[80%] h-[80%] rounded-full bg-gradient-to-b ${variantStyles.dark.primary} blur-[100px]`}
          style={getAnimationStyle('primary')}
        />
        {/* Secondary deep glow - bottom right */}
        <div
          className={`absolute -bottom-[20%] -right-[20%] w-[70%] h-[70%] rounded-full bg-gradient-to-tl ${variantStyles.dark.secondary} blur-[80px]`}
          style={getAnimationStyle('secondary')}
        />
        {/* Accent deep glow - left side */}
        {variant !== 'minimal' && (
          <div
            className={`absolute top-[20%] -left-[15%] w-[50%] h-[60%] rounded-full bg-gradient-to-r ${variantStyles.dark.accent} blur-[60px]`}
            style={getAnimationStyle('accent')}
          />
        )}
        {/* Subtle noise texture for depth - only in dark mode */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Vignette overlay for depth and focus */}
      {vignette && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: `
              radial-gradient(ellipse 120% 100% at 50% 0%, transparent 0%, var(--color-bg-primary) 85%),
              radial-gradient(ellipse 120% 100% at 50% 100%, transparent 0%, var(--color-bg-primary) 85%)
            `,
            opacity: 0.6 + baseOpacity * 0.2,
          }}
        />
      )}

      {/* Bottom fade for seamless section blending */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{
          background: `linear-gradient(to top, var(--color-bg-primary) 0%, transparent 100%)`,
        }}
      />
    </div>
  );
}

/**
 * Static Gradient Background
 *
 * Pre-configured static background without animation.
 * Use for performance-critical sections or when reduced motion is preferred.
 */
export function StaticGradientBackground({
  className = '',
  variant = 'default',
  intensity = 0.4,
  vignette = true,
  'aria-label': ariaLabel = 'Decorative gradient background',
}: Omit<GradientBackgroundProps, 'animated' | 'id'>) {
  return (
    <GradientBackground
      className={className}
      variant={variant}
      animated={false}
      intensity={intensity}
      vignette={vignette}
      aria-label={ariaLabel}
    />
  );
}

/**
 * Minimal Gradient Background
 *
 * Ultra-subtle background for content sections.
 * Very low intensity, minimal presence.
 */
export function MinimalGradientBackground({
  className = '',
  vignette = false,
  'aria-label': ariaLabel = 'Decorative gradient background',
}: Omit<GradientBackgroundProps, 'variant' | 'intensity' | 'animated' | 'id'>) {
  return (
    <GradientBackground
      className={className}
      variant="minimal"
      intensity={0.25}
      animated={true}
      vignette={vignette}
      aria-label={ariaLabel}
    />
  );
}

/**
 * Soft Gradient Background
 *
 * Gentle pastel glow for a friendly, approachable feel.
 * Medium intensity with soft color transitions.
 */
export function SoftGradientBackground({
  className = '',
  vignette = true,
  'aria-label': ariaLabel = 'Decorative gradient background',
}: Omit<GradientBackgroundProps, 'variant' | 'intensity' | 'animated' | 'id'>) {
  return (
    <GradientBackground
      className={className}
      variant="soft"
      intensity={0.5}
      animated={true}
      vignette={vignette}
      aria-label={ariaLabel}
    />
  );
}

/**
 * Deep Gradient Background
 *
 * Rich, immersive background for hero sections.
 * Higher intensity with deep, saturated tones.
 */
export function DeepGradientBackground({
  className = '',
  vignette = true,
  'aria-label': ariaLabel = 'Decorative gradient background',
}: Omit<GradientBackgroundProps, 'variant' | 'intensity' | 'animated' | 'id'>) {
  return (
    <GradientBackground
      className={className}
      variant="deep"
      intensity={0.6}
      animated={true}
      vignette={vignette}
      aria-label={ariaLabel}
    />
  );
}

export default GradientBackground;
