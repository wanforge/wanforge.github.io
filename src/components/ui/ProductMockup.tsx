import * as React from 'react';
import { type HTMLMotionProps, type Variants, motion } from 'motion/react';
import { cn } from '@/utils/cn';
import { getAssetPath } from '@/config/paths';
import { useReducedMotion } from '@/utils/reducedMotion';

/**
 * Props for the ProductMockup component
 */
export interface ProductMockupProps extends HTMLMotionProps<'div'> {
  /**
   * The image source for the mockup
   */
  src?: string;
  /**
   * The image alt text
   */
  alt: string;
  /**
   * The mockup variant
   * @default 'laptop'
   */
  variant?: 'laptop' | 'phone';
  /**
   * Whether the mockup should have a floating animation
   * @default true
   */
  floating?: boolean;
  /**
   * The loading strategy for the image
   * @default 'lazy'
   */
  loading?: 'lazy' | 'eager';
  /**
   * The fetch priority for the image
   */
  fetchPriority?: 'high' | 'low' | 'auto';
  /**
   * Animation variants for the container
   */
  variants?: Variants;
}

/**
 * ProductMockup Component
 *
 * Displays a product screenshot within a realistic device frame (laptop or phone).
 * Features smooth floating animations and theme-aware styling.
 */
export const ProductMockup: React.FC<ProductMockupProps> = ({
  src,
  alt,
  variant = 'laptop',
  floating = true,
  loading = 'lazy',
  fetchPriority,
  className,
  variants,
  ...props
}) => {
  const { prefersReducedMotion } = useReducedMotion();
  const resolvedSrc = src ? (src.startsWith('http') ? src : getAssetPath(src)) : null;

  // Frame styles based on variant
  const frameClasses = cn(
    'relative z-10 w-full shadow-2xl overflow-hidden bg-bg-primary border-border-default',
    variant === 'laptop'
      ? 'aspect-[16/10] rounded-t-xl border-x-[6px] border-t-[6px] md:border-x-[12px] md:border-t-[12px]'
      : 'aspect-[9/19] rounded-[2.5rem] border-[8px] md:border-[12px] max-w-[280px] md:max-w-[320px] w-full mx-auto',
  );

  const screenClasses = 'absolute inset-0 bg-bg-secondary/30 flex flex-col overflow-hidden';

  return (
    <motion.div
      {...(variants ? { variants } : {})}
      className={cn('relative perspective-1000', className)}
      {...props}
    >
      <motion.div
        animate={
          floating && !prefersReducedMotion
            ? {
                y: [0, -8, 0],
              }
            : {}
        }
        transition={
          floating && !prefersReducedMotion
            ? {
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : {}
        }
        style={{ willChange: floating && !prefersReducedMotion ? 'transform' : 'auto' }}
        className={frameClasses}
      >
        <div className={screenClasses}>
          {resolvedSrc ? (
            <img
              src={resolvedSrc}
              alt={alt}
              className="w-full h-full object-cover object-top"
              loading={loading}
              decoding={loading === 'eager' ? 'sync' : 'async'}
              {...(fetchPriority ? { fetchPriority } : {})}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500/10 to-secondary-500/10 p-8">
              <div className="text-center space-y-4 max-w-md">
                <div className="w-16 h-16 bg-primary-500/20 rounded-2xl mx-auto flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-primary-500 border-dashed rounded-lg animate-spin-slow" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-48 bg-text-muted/20 rounded-full mx-auto" />
                  <div className="h-3 w-32 bg-text-muted/10 rounded-full mx-auto" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Glossy overlay effect */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-white/20 dark:from-white/0 dark:to-white/5" />
      </motion.div>

      {/* Laptop base (only for laptop variant) */}
      {variant === 'laptop' && (
        <div className="relative z-0 h-3 md:h-4 bg-bg-secondary w-[105%] -left-[2.5%] rounded-b-xl shadow-2xl border-t border-white/10" />
      )}

      {/* Device specific details (camera, etc) */}
      {variant === 'phone' && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-bg-secondary rounded-b-2xl z-20 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-800" />
          <div className="w-12 h-1 rounded-full bg-slate-800/50" />
        </div>
      )}

      {/* Reflections and shadows */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-10 bg-black/20 blur-[40px] rounded-full -z-10" />
    </motion.div>
  );
};

ProductMockup.displayName = 'ProductMockup';
