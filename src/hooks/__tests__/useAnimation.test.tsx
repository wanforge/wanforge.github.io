/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import {
  useAnimation,
  useAnimationControls,
  useHoverAnimation,
  useInViewAnimation,
  usePresetAnimation,
  useScrollAnimation,
  useStaggerAnimation,
} from '../useAnimation';
import * as motion from 'motion';
import * as reducedMotion from '@/utils/reducedMotion';

// Mock motion library
vi.mock('motion', () => ({
  animate: vi.fn(),
  inView: vi.fn(),
  scroll: vi.fn(),
}));

// Mock reduced motion utility
vi.mock('@/utils/reducedMotion', () => ({
  useReducedMotion: vi.fn(),
  getAccessibleDuration: vi.fn((d) => d),
  default: {
    useReducedMotion: vi.fn(),
    getAccessibleDuration: vi.fn((d) => d),
  },
}));

describe('useAnimation Hooks', () => {
  const mockAnimate = motion.animate as any;
  const mockInView = motion.inView as any;
  const mockScroll = motion.scroll as any;
  const mockUseReducedMotion = reducedMotion.useReducedMotion as any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReducedMotion.mockReturnValue({ prefersReducedMotion: false });
    mockAnimate.mockReturnValue({
      play: vi.fn(),
      pause: vi.fn(),
      stop: vi.fn(),
      reverse: vi.fn(),
      finished: Promise.resolve(),
    });
    mockInView.mockReturnValue(vi.fn());
    mockScroll.mockReturnValue(vi.fn());

    // Mock IntersectionObserver
    global.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  describe('useAnimation', () => {
    it('should initialize and trigger animation on mount', () => {
      const keyframes = { opacity: [0, 1] };
      const { result, rerender } = renderHook(({ k }) => useAnimation(k), {
        initialProps: { k: keyframes as Record<string, any[]> },
      });

      const element = document.createElement('div');
      (result.current as any).current = element;

      rerender({ k: { ...keyframes } });

      expect(mockAnimate).toHaveBeenCalled();
    });

    it('should respect reduced motion by setting final state immediately', () => {
      mockUseReducedMotion.mockReturnValue({ prefersReducedMotion: true });
      const keyframes = { opacity: [0, 1] };

      const element = document.createElement('div');
      const { result, rerender } = renderHook(({ k }) => useAnimation(k), {
        initialProps: { k: keyframes as Record<string, any[]> },
      });
      (result.current as any).current = element;

      rerender({ k: { ...keyframes } });

      expect(element.style.opacity).toBe('1');
      expect(mockAnimate).not.toHaveBeenCalled();
    });

    it('should cleanup animation on unmount', () => {
      const stopMock = vi.fn();
      mockAnimate.mockReturnValue({ stop: stopMock });

      const { result, rerender, unmount } = renderHook(({ k }) => useAnimation(k), {
        initialProps: { k: { opacity: [0, 1] } as Record<string, any[]> },
      });
      (result.current as any).current = document.createElement('div');
      rerender({ k: { opacity: [0, 1], x: [0, 10] } as Record<string, any[]> });

      unmount();
      expect(stopMock).toHaveBeenCalled();
    });

    it('should use inView when triggerOnView is true', () => {
      let callback: any;
      mockInView.mockImplementation((_el: any, cb: any) => {
        callback = cb;
        return vi.fn();
      });

      const keyframes = { opacity: [0, 1] };
      const { result, rerender } = renderHook(({ k, options }) => useAnimation(k, options), {
        initialProps: {
          k: keyframes as Record<string, any[]>,
          options: { triggerOnView: true } as any,
        },
      });
      (result.current as any).current = document.createElement('div');

      rerender({
        k: keyframes as Record<string, any[]>,
        options: { triggerOnView: true, threshold: 0.2 } as any,
      });

      expect(mockInView).toHaveBeenCalled();
      act(() => {
        if (callback) callback();
      });
      expect(mockAnimate).toHaveBeenCalled();
    });
  });

  describe('useScrollAnimation', () => {
    it('should initialize scroll-linked animation', () => {
      const { result, rerender } = renderHook(({ k }) => useScrollAnimation(k), {
        initialProps: { k: { opacity: [0, 1] } as Record<string, any[]> },
      });
      (result.current as any).current = document.createElement('div');

      rerender({ k: { opacity: [0, 1], x: [0, 10] } as Record<string, any[]> });
      expect(mockScroll).toHaveBeenCalled();
    });

    it('should not initialize if reduced motion is preferred', () => {
      mockUseReducedMotion.mockReturnValue({ prefersReducedMotion: true });
      renderHook(() => useScrollAnimation({ opacity: [0, 1] }));
      expect(mockScroll).not.toHaveBeenCalled();
    });
  });

  describe('useInViewAnimation', () => {
    it('should trigger inView when mounted', () => {
      const { result, rerender } = renderHook(({ t }) => useInViewAnimation({ threshold: t }), {
        initialProps: { t: 0.1 },
      });
      (result.current.ref as any).current = document.createElement('div');

      rerender({ t: 0.2 });
      expect(mockInView).toHaveBeenCalled();
    });

    it('should set isInView to true when inView callback is triggered', () => {
      let callback: any;
      mockInView.mockImplementation((_el: any, cb: any) => {
        callback = cb;
        return vi.fn();
      });

      const { result, rerender } = renderHook(({ t }) => useInViewAnimation({ threshold: t }), {
        initialProps: { t: 0.1 },
      });
      (result.current.ref as any).current = document.createElement('div');

      rerender({ t: 0.2 });

      act(() => {
        if (callback) callback();
      });

      expect(result.current.isInView).toBe(true);
    });

    it('should handle once: false and return cleanup that resets isInView', () => {
      let cleanup: any;
      mockInView.mockImplementation((_el: any, cb: any) => {
        cleanup = cb();
        return vi.fn();
      });

      const { result, rerender } = renderHook(
        ({ t }) => useInViewAnimation({ threshold: t, once: false }),
        {
          initialProps: { t: 0.1 },
        },
      );
      (result.current.ref as any).current = document.createElement('div');

      rerender({ t: 0.2 });

      expect(result.current.isInView).toBe(true);

      act(() => {
        if (cleanup) cleanup();
      });
      expect(result.current.isInView).toBe(false);
    });
  });

  describe('usePresetAnimation', () => {
    it('should use PRESETS and call useAnimation', () => {
      const { result, rerender } = renderHook(({ p }) => usePresetAnimation(p), {
        initialProps: { p: 'fadeIn' as any },
      });
      (result.current as any).current = document.createElement('div');

      rerender({ p: 'fadeInUp' as any });
      expect(mockAnimate).toHaveBeenCalled();
    });

    it('should warn if preset is not found', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      renderHook(() => usePresetAnimation('nonExistent' as any));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('not found'));
      consoleSpy.mockRestore();
    });
  });

  describe('useHoverAnimation', () => {
    it('should toggle isHovered on mouse events', () => {
      const { result } = renderHook(() => useHoverAnimation());

      act(() => {
        result.current.bind.onMouseEnter();
      });
      expect(result.current.isHovered).toBe(true);

      act(() => {
        result.current.bind.onMouseLeave();
      });
      expect(result.current.isHovered).toBe(false);

      act(() => {
        result.current.bind.onFocus();
      });
      expect(result.current.isHovered).toBe(true);

      act(() => {
        result.current.bind.onBlur();
      });
      expect(result.current.isHovered).toBe(false);
    });

    it('should not toggle isHovered if reduced motion is preferred', () => {
      mockUseReducedMotion.mockReturnValue({ prefersReducedMotion: true });
      const { result } = renderHook(() => useHoverAnimation());

      act(() => {
        result.current.bind.onMouseEnter();
      });
      expect(result.current.isHovered).toBe(false);
    });
  });

  describe('useStaggerAnimation', () => {
    it('should initialize and call inView', () => {
      const keyframesList = [{ opacity: [0, 1] }];
      const { result, rerender } = renderHook(
        ({ t }) => useStaggerAnimation(keyframesList, { threshold: t }),
        {
          initialProps: { t: 0.1 },
        },
      );
      (result.current as any).current = document.createElement('div');

      rerender({ t: 0.2 });
      expect(mockInView).toHaveBeenCalled();
    });

    it('should animate children when inView triggers', () => {
      let callback: any;
      mockInView.mockImplementation((_el: any, cb: any) => {
        callback = cb;
        return vi.fn();
      });

      const container = document.createElement('div');
      const child1 = document.createElement('div');
      const child2 = document.createElement('div');
      container.appendChild(child1);
      container.appendChild(child2);

      const keyframesList = [{ opacity: [0, 1] }];
      const { result, rerender } = renderHook(
        ({ t }) => useStaggerAnimation(keyframesList, { threshold: t }),
        {
          initialProps: { t: 0.1 },
        },
      );
      (result.current as any).current = container;

      rerender({ t: 0.2 });

      act(() => {
        if (callback) callback();
      });

      expect(mockAnimate).toHaveBeenCalledTimes(2);
    });

    it('should animate children immediately if triggerOnView is false', () => {
      const container = document.createElement('div');
      container.appendChild(document.createElement('div'));

      const keyframesList = [{ opacity: [0, 1] }];
      const { result, rerender } = renderHook(
        ({ t }) => useStaggerAnimation(keyframesList, { triggerOnView: false, threshold: t }),
        {
          initialProps: { t: 0.1 },
        },
      );
      (result.current as any).current = container;

      rerender({ t: 0.2 });

      expect(mockAnimate).toHaveBeenCalled();
    });

    it('should respect reduced motion by setting final state for children immediately', () => {
      mockUseReducedMotion.mockReturnValue({ prefersReducedMotion: true });
      const container = document.createElement('div');
      const child = document.createElement('div');
      container.appendChild(child);

      const keyframesList = [{ opacity: [0, 1] }];
      const { result, rerender } = renderHook(
        ({ t }) => useStaggerAnimation(keyframesList, { threshold: t }),
        {
          initialProps: { t: 0.1 },
        },
      );
      (result.current as any).current = container;

      rerender({ t: 0.2 });

      expect(child.style.opacity).toBe('1');
      expect(mockAnimate).not.toHaveBeenCalled();
    });
  });

  describe('useAnimationControls', () => {
    it('should provide play, pause, and stop controls', () => {
      const { result } = renderHook(() => useAnimationControls({ opacity: [0, 1] }));
      (result.current.ref as any).current = document.createElement('div');

      const playMock = vi.fn();
      const pauseMock = vi.fn();
      const stopMock = vi.fn();

      mockAnimate.mockReturnValue({
        play: playMock,
        pause: pauseMock,
        stop: stopMock,
      });

      act(() => {
        result.current.controls.play();
      });
      expect(playMock).toHaveBeenCalled();
      expect(result.current.controls.isPlaying).toBe(true);

      act(() => {
        result.current.controls.pause();
      });
      expect(pauseMock).toHaveBeenCalled();
      expect(result.current.controls.isPlaying).toBe(false);

      act(() => {
        result.current.controls.stop();
      });
      expect(stopMock).toHaveBeenCalled();
      expect(result.current.controls.isPlaying).toBe(false);
    });

    it('should warn when reverse is called', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const { result } = renderHook(() => useAnimationControls({ opacity: [0, 1] }));

      act(() => {
        result.current.controls.reverse();
      });

      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('not implemented'));
      consoleSpy.mockRestore();
    });
  });
});
