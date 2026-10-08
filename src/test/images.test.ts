/**
 * Image Configuration Tests
 *
 * Comprehensive tests for the image optimization pipeline configuration.
 *
 * @module test/images
 */

import { describe, expect, it } from 'vitest';
import {
  FORMAT_PRIORITY,
  IMAGE_BREAKPOINTS,
  IMAGE_PRESETS,
  IMAGE_QUALITY,
  LAZY_LOADING,
  PLACEHOLDER,
  REMOTE_DOMAINS,
  calculateAspectRatio,
  generateBlurPlaceholder,
  generateSrcSet,
  getOptimalFormat,
  imageConfig,
  isAllowedRemoteUrl,
  validateImageSource,
} from '@/config/images';

describe('Image Configuration', () => {
  describe('IMAGE_BREAKPOINTS', () => {
    it('should have the expected breakpoint values', () => {
      expect(IMAGE_BREAKPOINTS).toEqual([640, 750, 828, 1080, 1200, 1920, 2048, 3840]);
    });

    it('should contain standard responsive breakpoints', () => {
      expect(IMAGE_BREAKPOINTS).toContain(640); // Mobile landscape
      expect(IMAGE_BREAKPOINTS).toContain(750); // Tablet
      expect(IMAGE_BREAKPOINTS).toContain(1080); // Desktop small
      expect(IMAGE_BREAKPOINTS).toContain(1920); // Desktop large
    });
  });

  describe('IMAGE_QUALITY', () => {
    it('should have default quality of 80', () => {
      expect(IMAGE_QUALITY.default).toBe(80);
    });

    it('should have high quality of 90', () => {
      expect(IMAGE_QUALITY.high).toBe(90);
    });

    it('should have medium quality of 70', () => {
      expect(IMAGE_QUALITY.medium).toBe(70);
    });

    it('should have low quality of 40', () => {
      expect(IMAGE_QUALITY.low).toBe(40);
    });
  });

  describe('FORMAT_PRIORITY', () => {
    it('should prioritize AVIF first', () => {
      expect(FORMAT_PRIORITY[0]).toBe('avif');
    });

    it('should prioritize WebP second', () => {
      expect(FORMAT_PRIORITY[1]).toBe('webp');
    });

    it('should fallback to JPEG last', () => {
      expect(FORMAT_PRIORITY[2]).toBe('jpeg');
    });
  });

  describe('LAZY_LOADING', () => {
    it('should default to lazy loading', () => {
      expect(LAZY_LOADING.default).toBe('lazy');
    });

    it('should support eager loading for above-fold images', () => {
      expect(LAZY_LOADING.eager).toBe('eager');
    });

    it('should have a root margin of 200px', () => {
      expect(LAZY_LOADING.rootMargin).toBe('200px');
    });

    it('should have a threshold of 0.01', () => {
      expect(LAZY_LOADING.threshold).toBe(0.01);
    });
  });

  describe('PLACEHOLDER', () => {
    it('should support LQIP placeholder', () => {
      expect(PLACEHOLDER.lqip).toBe('lqip');
    });

    it('should support color placeholder', () => {
      expect(PLACEHOLDER.color).toBe('color');
    });

    it('should support blur placeholder', () => {
      expect(PLACEHOLDER.blur).toBe('blur');
    });

    it('should support no placeholder', () => {
      expect(PLACEHOLDER.none).toBe('none');
    });

    it('should have default blur amount of 20px', () => {
      expect(PLACEHOLDER.blurAmount).toBe(20);
    });
  });

  describe('IMAGE_PRESETS', () => {
    it('should have avatar preset with 64x64 dimensions', () => {
      expect(IMAGE_PRESETS.avatar).toEqual({ width: 64, height: 64 });
    });

    it('should have thumbnail preset with 200x150 dimensions', () => {
      expect(IMAGE_PRESETS.thumbnail).toEqual({ width: 200, height: 150 });
    });

    it('should have card preset with 400x300 dimensions', () => {
      expect(IMAGE_PRESETS.card).toEqual({ width: 400, height: 300 });
    });

    it('should have feature preset with 800x600 dimensions', () => {
      expect(IMAGE_PRESETS.feature).toEqual({ width: 800, height: 600 });
    });

    it('should have hero preset with 1920x1080 dimensions', () => {
      expect(IMAGE_PRESETS.hero).toEqual({ width: 1920, height: 1080 });
    });

    it('should have fullWidth preset with 3840x2160 dimensions', () => {
      expect(IMAGE_PRESETS.fullWidth).toEqual({ width: 3840, height: 2160 });
    });
  });

  describe('REMOTE_DOMAINS', () => {
    it('should include Unsplash domains', () => {
      expect(REMOTE_DOMAINS).toContain('images.unsplash.com');
      expect(REMOTE_DOMAINS).toContain('*.unsplash.com');
    });

    it('should include Pexels domains', () => {
      expect(REMOTE_DOMAINS).toContain('images.pexels.com');
      expect(REMOTE_DOMAINS).toContain('*.pexels.com');
    });
  });

  describe('isAllowedRemoteUrl', () => {
    it('should return true for Unsplash URLs', () => {
      expect(isAllowedRemoteUrl('https://images.unsplash.com/photo-123')).toBe(true);
    });

    it('should return true for Pexels URLs', () => {
      expect(isAllowedRemoteUrl('https://images.pexels.com/photos/123')).toBe(true);
    });

    it('should return false for unknown domains', () => {
      expect(isAllowedRemoteUrl('https://example.com/image.jpg')).toBe(false);
    });

    it('should return false for invalid URLs', () => {
      expect(isAllowedRemoteUrl('not-a-valid-url')).toBe(false);
    });

    it('should handle wildcard subdomains', () => {
      expect(isAllowedRemoteUrl('https://api.unsplash.com/photos')).toBe(true);
    });
  });

  describe('generateSrcSet', () => {
    it('should generate srcset string with widths', () => {
      const src = '/images/photo.jpg';
      const widths = [640, 1024, 1920];
      const srcset = generateSrcSet(src, widths);

      expect(srcset).toContain('640w');
      expect(srcset).toContain('1024w');
      expect(srcset).toContain('1920w');
    });

    it('should include format parameter when specified', () => {
      const src = '/images/photo.jpg';
      const widths = [640];
      const srcset = generateSrcSet(src, widths, 'webp');

      expect(srcset).toContain('format=webp');
    });
  });

  describe('getOptimalFormat', () => {
    it('should return AVIF when supported', () => {
      const acceptHeader = 'image/avif,image/webp,image/jpeg';
      expect(getOptimalFormat(acceptHeader)).toBe('avif');
    });

    it('should return WebP when AVIF is not supported', () => {
      const acceptHeader = 'image/webp,image/jpeg';
      expect(getOptimalFormat(acceptHeader)).toBe('webp');
    });

    it('should fallback to JPEG when no modern formats supported', () => {
      const acceptHeader = 'image/jpeg';
      expect(getOptimalFormat(acceptHeader)).toBe('jpeg');
    });
  });

  describe('calculateAspectRatio', () => {
    it('should calculate correct aspect ratio', () => {
      expect(calculateAspectRatio(1920, 1080)).toBe(16 / 9);
      expect(calculateAspectRatio(800, 600)).toBe(4 / 3);
      expect(calculateAspectRatio(100, 100)).toBe(1);
    });
  });

  describe('generateBlurPlaceholder', () => {
    it('should generate blur CSS with default amount', () => {
      expect(generateBlurPlaceholder()).toBe('blur(20px)');
    });

    it('should generate blur CSS with custom amount', () => {
      expect(generateBlurPlaceholder(10)).toBe('blur(10px)');
    });
  });

  describe('validateImageSource', () => {
    it('should validate local path strings', () => {
      expect(validateImageSource('/images/photo.jpg')).toBe(true);
      expect(validateImageSource('./photo.jpg')).toBe(true);
      expect(validateImageSource('../photo.jpg')).toBe(true);
    });

    it('should validate allowed remote URLs', () => {
      expect(validateImageSource('https://images.unsplash.com/photo-123')).toBe(true);
    });

    it('should reject disallowed remote URLs', () => {
      expect(validateImageSource('https://example.com/image.jpg')).toBe(false);
    });

    it('should validate ImageMetadata objects', () => {
      const mockMetadata = {
        src: '/images/photo.jpg',
        width: 800,
        height: 600,
        format: 'jpg',
      } as ImageMetadata;
      expect(validateImageSource(mockMetadata)).toBe(true);
    });

    it('should reject invalid sources', () => {
      expect(validateImageSource('')).toBe(false);
      expect(validateImageSource(null as unknown as string)).toBe(false);
      expect(validateImageSource(undefined as unknown as string)).toBe(false);
    });
  });

  describe('imageConfig', () => {
    it('should export complete configuration object', () => {
      expect(imageConfig).toHaveProperty('breakpoints');
      expect(imageConfig).toHaveProperty('quality');
      expect(imageConfig).toHaveProperty('formatPriority');
      expect(imageConfig).toHaveProperty('lazyLoading');
      expect(imageConfig).toHaveProperty('placeholder');
      expect(imageConfig).toHaveProperty('presets');
      expect(imageConfig).toHaveProperty('remoteDomains');
      expect(imageConfig).toHaveProperty('limitInputPixels');
    });

    it('should have correct limitInputPixels value', () => {
      expect(imageConfig.limitInputPixels).toBe(268_402_689);
    });
  });
});
