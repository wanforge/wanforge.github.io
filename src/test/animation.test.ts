import { describe, expect, it } from 'vitest';
import {
  ACCESSIBILITY,
  DURATIONS,
  EASINGS,
  PERFORMANCE,
  PRESETS,
  STAGGER,
  VARIANTS,
} from '@/config/animation';
import { REDUCED_MOTION_CLASS, getAccessibleDuration } from '@/utils/reducedMotion';
import { useAnimation, useHoverAnimation, useInViewAnimation } from '@/hooks/useAnimation';

describe('Animation Library Setup', () => {
  describe('Animation Configuration', () => {
    it('should export duration constants', () => {
      expect(DURATIONS.instant).toBe(0.1);
      expect(DURATIONS.fast).toBe(0.15);
      expect(DURATIONS.normal).toBe(0.3);
      expect(DURATIONS.slow).toBe(0.5);
      expect(DURATIONS.slower).toBe(0.8);
      expect(DURATIONS.ambient).toBe(15);
    });

    it('should export easing functions as bezier arrays', () => {
      expect(EASINGS.default).toEqual([0.4, 0, 0.2, 1]);
      expect(EASINGS.easeOut).toEqual([0, 0, 0.2, 1]);
      expect(EASINGS.easeIn).toEqual([0.4, 0, 1, 1]);
      expect(EASINGS.spring).toEqual([0.34, 1.56, 0.64, 1]);
    });

    it('should export animation presets', () => {
      expect(PRESETS.fadeIn).toBeDefined();
      expect(PRESETS.fadeInUp).toBeDefined();
      expect(PRESETS.scaleIn).toBeDefined();
      expect(PRESETS.heroEntrance).toBeDefined();
      expect(PRESETS.mockupEntrance).toBeDefined();
      expect(PRESETS.cardHover).toBeDefined();
    });

    it('should have valid preset structure', () => {
      const preset = PRESETS.fadeInUp!;
      expect(preset.initial).toHaveProperty('opacity');
      expect(preset.initial).toHaveProperty('y');
      expect(preset.animate).toHaveProperty('opacity');
      expect(preset.animate).toHaveProperty('y');
      expect(preset.transition).toHaveProperty('duration');
      expect(preset.transition).toHaveProperty('ease');
    });

    it('mockupEntrance should have scale and x position', () => {
      const preset = PRESETS.mockupEntrance!;
      expect(preset.initial).toHaveProperty('scale');
      expect(preset.initial).toHaveProperty('x');
      expect(preset.animate).toHaveProperty('scale');
      expect(preset.animate).toHaveProperty('x');
    });

    it('should export stagger configurations', () => {
      expect(STAGGER.fast!.staggerChildren).toBe(0.05);
      expect(STAGGER.normal!.staggerChildren).toBe(0.1);
      expect(STAGGER.slow!.staggerChildren).toBe(0.15);
      expect(STAGGER.hero!.staggerChildren).toBe(0.2);
    });

    it('should export performance configuration', () => {
      expect(PERFORMANCE.gpuAccelerated).toContain('transform');
      expect(PERFORMANCE.gpuAccelerated).toContain('opacity');
      expect(PERFORMANCE.frameBudget).toBe(16.67);
    });

    it('should export accessibility configuration', () => {
      expect(ACCESSIBILITY.respectReducedMotion).toBe(true);
      expect(ACCESSIBILITY.reducedMotionDuration).toBe(0.01);
    });

    it('should export framer-motion compatible variants', () => {
      expect(VARIANTS.hidden).toEqual({ opacity: 0 });
      expect(VARIANTS.visible).toEqual({ opacity: 1 });
      expect(VARIANTS.fadeInUp.hidden).toEqual({ opacity: 0, y: 20 });
      expect(VARIANTS.fadeInUp.visible).toEqual({ opacity: 1, y: 0 });
    });
  });

  describe('Reduced Motion Utilities', () => {
    it('should return reduced motion duration when preferred', () => {
      const duration = getAccessibleDuration(0.5, true);
      expect(duration).toBe(0.01);
    });

    it('should return normal duration when not preferred', () => {
      const duration = getAccessibleDuration(0.5, false);
      expect(duration).toBe(0.5);
    });

    it('should export reduced motion CSS class', () => {
      expect(REDUCED_MOTION_CLASS).toBe('reduce-motion');
    });
  });

  describe('Animation Hooks', () => {
    it('should export useAnimation hook', () => {
      expect(useAnimation).toBeDefined();
      expect(typeof useAnimation).toBe('function');
    });

    it('should export useInViewAnimation hook', () => {
      expect(useInViewAnimation).toBeDefined();
      expect(typeof useInViewAnimation).toBe('function');
    });

    it('should export useHoverAnimation hook', () => {
      expect(useHoverAnimation).toBeDefined();
      expect(typeof useHoverAnimation).toBe('function');
    });
  });

  describe('Motion One Integration', () => {
    it('should have motion installed', async () => {
      // Verify motion is importable by checking the module exists
      const motion = await import('motion');
      expect(motion).toBeDefined();
    });

    it('should export animate function from motion', async () => {
      const motion = await import('motion');
      expect(motion.animate).toBeDefined();
      expect(typeof motion.animate).toBe('function');
    });

    it('should export inView function from motion', async () => {
      const motion = await import('motion');
      expect(motion.inView).toBeDefined();
      expect(typeof motion.inView).toBe('function');
    });

    it('should export scroll function from motion', async () => {
      const motion = await import('motion');
      expect(motion.scroll).toBeDefined();
      expect(typeof motion.scroll).toBe('function');
    });
  });

  describe('Animation Presets Functionality', () => {
    it('fadeIn preset should transition opacity from 0 to 1', () => {
      expect(PRESETS.fadeIn!.initial.opacity).toBe(0);
      expect(PRESETS.fadeIn!.animate.opacity).toBe(1);
    });

    it('fadeInUp preset should transition opacity and y position', () => {
      expect(PRESETS.fadeInUp!.initial.opacity).toBe(0);
      expect(PRESETS.fadeInUp!.initial.y).toBe(20);
      expect(PRESETS.fadeInUp!.animate.opacity).toBe(1);
      expect(PRESETS.fadeInUp!.animate.y).toBe(0);
    });

    it('scaleIn preset should use spring easing', () => {
      expect(PRESETS.scaleIn!.transition?.ease).toEqual(EASINGS.spring);
    });

    it('heroEntrance preset should have longer duration', () => {
      expect(PRESETS.heroEntrance!.transition?.duration).toBe(DURATIONS.slower);
    });

    it('cardHover preset should have fast duration', () => {
      expect(PRESETS.cardHover!.transition?.duration).toBe(DURATIONS.fast);
    });
  });
});
