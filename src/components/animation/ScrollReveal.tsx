/**
 * ScrollReveal Component
 *
 * Specialized wrappers for revealing content as it enters the viewport.
 * Optimized for SaaS landing page patterns like section reveals and staggered grids.
 *
 * @see docs/research/ANIMATION_STRATEGY.md
 */

import React from 'react';
import {
  AnimatedElement,
  type AnimatedElementProps,
  StaggerContainer,
  type StaggerContainerProps,
} from './AnimatedElement';

export type ScrollRevealProps = Omit<AnimatedElementProps, 'triggerOnView'>;

/**
 * ScrollReveal Component
 *
 * A high-level component to reveal a section or element as it enters the viewport.
 * Defaults to fadeInUp with standard section thresholds.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  preset = 'fadeInUp',
  threshold = 0.1,
  once = true,
  children,
  ...props
}) => {
  return (
    <AnimatedElement
      preset={preset}
      triggerOnView={true}
      threshold={threshold}
      once={once}
      {...props}
    >
      {children}
    </AnimatedElement>
  );
};

export type RevealGridProps = Omit<StaggerContainerProps, 'triggerOnView'>;

/**
 * RevealGrid Component
 *
 * A specialized component for staggered reveals of grid items (cards, logos, etc.)
 * as the container enters the viewport.
 */
export const RevealGrid: React.FC<RevealGridProps> = ({
  childPreset = 'fadeInUp',
  staggerDelay = 0.1,
  once = true,
  threshold = 0.1,
  children,
  ...props
}) => {
  return (
    <StaggerContainer
      childPreset={childPreset}
      staggerDelay={staggerDelay}
      triggerOnView={true}
      once={once}
      threshold={threshold}
      {...props}
    >
      {children}
    </StaggerContainer>
  );
};

export default ScrollReveal;
